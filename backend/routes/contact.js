/**
 * routes/contact.js - 联系表单 API 路由
 *
 * 功能说明：处理联系表单的 POST 提交请求
 * 设计思路：
 * - 验证输入数据（邮箱格式、长度限制）
 * - 使用参数化查询防止 SQL 注入
 * - 存入 SQLite 数据库
 * - 发送邮件通知
 * - 返回统一的 JSON 响应格式
 *
 * 关键决策：
 * - 存储客户端 IP：用于安全审计
 * - 邮件发送失败不影响表单提交：提高用户体验
 * - 使用 try-catch 捕获所有错误：防止服务崩溃
 *
 * 安全措施：
 * - 参数化查询：防止 SQL 注入
 * - 输入验证：防止数据灌入和 XSS
 * - 速率限制：在 server.js 中配置
 *
 * 依赖关系：
 * - 依赖 middleware/validator.js 进行数据验证
 * - 依赖 database/db.js 进行数据存储
 * - 依赖 utils/email.js 发送邮件通知
 */

const express = require('express');
const router = express.Router();
const db = require('../database/db');
const { validateInput, sanitizeString } = require('../middleware/validator');
const sendEmail = require('../utils/email');

/**
 * POST /api/contact
 *
 * 功能：处理联系表单提交
 * 请求体：
 *   - email: 邮箱地址（必填）
 *   - name: 称呼（必填）
 *   - message: 备注内容（可选）
 *
 * 响应：
 *   - success: true/false
 *   - message: 成功/错误信息
 *   - errors: 验证错误列表（仅在验证失败时）
 */
router.post('/', async (req, res) => {
    // ================================
    // 1. 提取请求数据
    // ================================
    const { email, name, message } = req.body;

    // ================================
    // 2. 数据验证
    // ================================
    const errors = validateInput({ email, name, message });

    if (errors.length > 0) {
        // 验证失败，返回 400 错误
        return res.status(400).json({
            success: false,
            error: '数据验证失败',
            errors: errors
        });
    }

    // ================================
    // 3. 清理数据（额外安全层）
    // ================================
    const cleanEmail = sanitizeString(email);
    const cleanName = sanitizeString(name);
    const cleanMessage = message ? sanitizeString(message) : null;

    try {
        // ================================
        // 4. 存入数据库（使用参数化查询防止 SQL 注入）
        // ================================
        const stmt = db.prepare(`
            INSERT INTO contacts (email, name, message, ip_address)
            VALUES (?, ?, ?, ?)
        `);

        const result = stmt.run(
            cleanEmail,
            cleanName,
            cleanMessage,
            req.ip || req.connection.remoteAddress || 'unknown'
        );

        console.log(`Contact form submitted: ID ${result.lastInsertRowid}, Email: ${cleanEmail}`);

        // ================================
        // 5. 发送邮件通知（异步，不阻塞响应）
        // ================================
        // 邮件发送失败不影响表单提交结果
        sendEmail({ email: cleanEmail, name: cleanName, message: cleanMessage })
            .catch(err => console.error('Email error (non-blocking):', err.message));

        // ================================
        // 6. 返回成功响应
        // ================================
        res.json({
            success: true,
            message: '提交成功，感谢您的留言！'
        });

    } catch (error) {
        // ================================
        // 7. 错误处理
        // ================================
        console.error('Contact form error:', error);

        // 判断错误类型
        if (error.code === 'SQLITE_CONSTRAINT') {
            return res.status(400).json({
                success: false,
                error: '数据格式错误'
            });
        }

        // 其他未知错误
        res.status(500).json({
            success: false,
            error: '服务器错误，请稍后重试'
        });
    }
});

module.exports = router;
