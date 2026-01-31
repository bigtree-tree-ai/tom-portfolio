/**
 * server.js - Express API 服务器
 *
 * 功能说明：提供联系表单提交 API
 * 设计思路：
 * - 使用 helmet 增强安全性（设置安全相关的 HTTP 头）
 * - 使用 rate-limit 防止暴力提交（每个 IP 每小时最多 5 次）
 * - 限制请求体大小防止数据灌入攻击
 * - 提供健康检查端点用于监控
 *
 * 关键决策：
 * - 端口 5002：与前端（8081）和 Webhook（5001）隔离
 * - 速率限制：每小时 5 次，平衡用户体验和安全
 * - 请求体限制：1kb，足以容纳表单数据
 *
 * 依赖关系：依赖 routes/contact.js 处理表单提交
 */

const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5002;

// ================================
// 安全中间件
// ================================

// Helmet：设置安全相关的 HTTP 头，防止常见 Web 漏洞
app.use(helmet({
    contentSecurityPolicy: false, // API 不需要 CSP
    crossOriginEmbedderPolicy: false
}));

// 解析 JSON 请求体，限制大小为 1kb（防止数据灌入）
app.use(express.json({ limit: '1kb' }));

// ================================
// 速率限制（防止暴力提交）
// ================================
const limiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 小时
    max: 5, // 每个 IP 最多 5 次请求
    message: { success: false, error: '提交过于频繁，请稍后再试' },
    standardHeaders: true,
    legacyHeaders: false,
});

// 对联系表单接口应用速率限制
app.use('/api/contact', limiter);

// ================================
// 路由
// ================================

// 联系表单 API
app.use('/api/contact', contactRoutes);

// 健康检查端点（用于监控服务状态）
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', service: 'tom-portfolio-backend' });
});

// ================================
// 启动服务器
// ================================
app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/health`);
    console.log(`Contact API: http://localhost:${PORT}/api/contact`);
});

module.exports = app;
