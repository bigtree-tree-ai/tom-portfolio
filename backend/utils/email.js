/**
 * email.js - 邮件发送工具
 *
 * 功能说明：使用 nodemailer 发送联系表单提交通知邮件
 * 设计思路：
 * - 使用环境变量配置邮件服务（安全）
 * - 支持多种邮件服务商（Gmail、QQ邮箱等）
 * - 发送失败时记录日志但不阻塞表单提交
 *
 * 关键决策：
 * - 使用 Gmail SMTP：稳定可靠
 * - 邮件发送失败不返回错误：表单仍可提交成功
 * - 包含完整提交信息：便于查看
 *
 * 依赖关系：被 routes/contact.js 调用
 *
 * 环境变量配置：
 * - EMAIL_USER: 发件邮箱地址
 * - EMAIL_PASS: 邮箱 SMTP 密码（Gmail 需用应用专用密码）
 * - EMAIL_TO: 接收通知的邮箱地址
 */

const nodemailer = require('nodemailer');

// ================================
// 邮件服务配置
// ================================

// 从环境变量读取配置
const emailUser = process.env.EMAIL_USER;
const emailPass = process.env.EMAIL_PASS;
const emailTo = process.env.EMAIL_TO || emailUser;

// 检查配置是否完整
const isConfigured = emailUser && emailPass;

if (!isConfigured) {
    console.warn('Email service not configured. Set EMAIL_USER and EMAIL_PASS environment variables.');
}

// 创建邮件传输器
// 设计思路：惰性初始化，只有在配置完整时才创建
let transporter = null;

if (isConfigured) {
    try {
        transporter = nodemailer.createTransport({
            service: 'gmail', // 使用 Gmail
            auth: {
                user: emailUser,
                pass: emailPass
            }
        });

        // 验证配置（可选，生产环境可跳过以提高启动速度）
        transporter.verify((error, success) => {
            if (error) {
                console.error('Email configuration error:', error.message);
            } else {
                console.log('Email service is ready');
            }
        });
    } catch (error) {
        console.error('Failed to create email transporter:', error.message);
    }
}

/**
 * 发送联系表单通知邮件
 *
 * 设计思路：
 * - 邮件内容格式化：包含所有提交信息
 * - 异步发送：不阻塞主流程
 * - 错误处理：发送失败不影响表单提交结果
 *
 * @param {Object} data - 表单数据
 * @param {string} data.email - 提交者邮箱
 * @param {string} data.name - 提交者称呼
 * @param {string} data.message - 备注内容
 * @returns {Promise<boolean>} - 是否发送成功
 */
async function sendEmail({ email, name, message }) {
    // 如果邮件服务未配置，直接返回成功
    if (!transporter) {
        console.log('Email service not configured, skipping email sending');
        return false;
    }

    // 构建邮件内容
    const mailOptions = {
        from: emailUser, // 发件人（与登录账号一致）
        to: emailTo, // 收件人
        subject: `[网站联系表单] 新消息来自 ${name}`, // 邮件主题
        text: ` // 纯文本内容
您好！

您收到了一条新的网站联系表单提交：

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📧 邮箱：${email}

👤 称呼：${name}

📝 备注：${message || '无'}

⏰ 提交时间：${new Date().toLocaleString('zh-CN', {
            timeZone: 'Asia/Shanghai',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

此邮件由 tom-portfolio 网站自动发送。
`,
        html: ` // HTML 内容（更美观）
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px; }
        .field { margin: 15px 0; }
        .label { font-weight: bold; color: #0099cc; }
        .value { background: white; padding: 10px; border-radius: 4px; margin-top: 5px; }
        .footer { text-align: center; margin-top: 20px; color: #999; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h2>📬 新的联系表单提交</h2>
        </div>
        <div class="content">
            <div class="field">
                <div class="label">📧 邮箱</div>
                <div class="value">${escapeHtml(email)}</div>
            </div>
            <div class="field">
                <div class="label">👤 称呼</div>
                <div class="value">${escapeHtml(name)}</div>
            </div>
            <div class="field">
                <div class="label">📝 备注</div>
                <div class="value">${escapeHtml(message || '无')}</div>
            </div>
            <div class="field">
                <div class="label">⏰ 提交时间</div>
                <div class="value">${new Date().toLocaleString('zh-CN', {
                    timeZone: 'Asia/Shanghai',
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}</div>
            </div>
        </div>
        <div class="footer">
            此邮件由 tom-portfolio 网站自动发送
        </div>
    </div>
</body>
</html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact notification email sent successfully');
        return true;
    } catch (error) {
        console.error('Failed to send email:', error.message);
        // 不抛出异常，让表单提交仍能成功
        return false;
    }
}

/**
 * 转义 HTML 特殊字符（防止 XSS）
 *
 * @param {string} str - 待转义的字符串
 * @returns {string} - 转义后的字符串
 */
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

module.exports = sendEmail;
