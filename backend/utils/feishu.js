/**
 * feishu.js - 飞书通知工具
 *
 * 功能说明：通过飞书自定义机器人 Webhook 发送卡片消息通知
 * 设计思路：
 * - 使用环境变量配置 Webhook URL（安全）
 * - 发送交互式卡片消息（interactive）
 * - 异步发送，失败不影响表单提交
 * - 包含关键词"留言"以通过飞书安全验证
 *
 * 关键决策：
 * - 消息类型：interactive（卡片格式）
 * - 关键词要求：消息中必须包含"留言"（飞书安全机制）
 * - 异步发送：不阻塞主流程，失败只记录日志
 * - 数据格式化：包含邮箱、称呼、备注、时间戳
 *
 * 依赖关系：被 routes/contact.js 调用
 *
 * 环境变量配置：
 * - FEISHU_WEBHOOK_URL: 飞书自定义机器人 Webhook 地址
 */

const https = require('https');

// ================================
// 飞书 Webhook 配置
// ================================

// 从环境变量读取 Webhook URL
const webhookUrl = process.env.FEISHU_WEBHOOK_URL;

// 检查配置是否完整
const isConfigured = webhookUrl && webhookUrl.startsWith('https://');

if (!isConfigured) {
    console.warn('Feishu webhook not configured. Set FEISHU_WEBHOOK_URL environment variable.');
}

/**
 * 发送飞书卡片消息
 *
 * 设计思路：
 * - 构建符合飞书规范的卡片消息格式
 * - 使用 https 模块发送 POST 请求
 * - 失败时记录日志但不抛出异常
 *
 * 飞书卡片消息格式：
 * - msg_type: "interactive"（交互式卡片）
 * - card: 卡片内容（标题、内容、元素）
 * - 必须包含关键词"留言"才能通过安全验证
 *
 * @param {Object} data - 表单数据
 * @param {string} data.email - 提交者邮箱
 * @param {string} data.name - 提交者称呼
 * @param {string} data.message - 备注内容
 * @returns {Promise<boolean>} - 是否发送成功
 */
async function sendFeishuNotification({ email, name, message }) {
    // 如果飞书未配置，直接返回成功
    if (!isConfigured) {
        console.log('Feishu webhook not configured, skipping notification');
        return false;
    }

    // 获取当前时间（中国时区）
    const now = new Date();
    const timestamp = now.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    // ================================
    // 构建飞书卡片消息
    // ================================
    // 官方文档：https://open.feishu.cn/document/common-capabilities/message-card/message-cards-content/using-message-cards
    const cardMessage = {
        msg_type: 'interactive',
        card: {
            header: {
                title: {
                    tag: 'plain_text',
                    content: '📬 新的网站留言' // 包含关键词"留言"
                },
                template: 'blue' // 蓝色主题
            },
            elements: [
                // 邮箱字段
                {
                    tag: 'div',
                    text: {
                        tag: 'lark_md',
                        content: `**📧 邮箱**\n${escapeMarkdown(email)}`
                    }
                },
                // 分隔线
                {
                    tag: 'hr'
                },
                // 称呼字段
                {
                    tag: 'div',
                    text: {
                        tag: 'lark_md',
                        content: `**👤 称呼**\n${escapeMarkdown(name)}`
                    }
                },
                // 分隔线
                {
                    tag: 'hr'
                },
                // 备注字段
                {
                    tag: 'div',
                    text: {
                        tag: 'lark_md',
                        content: `**📝 留言内容**\n${escapeMarkdown(message || '无')}` // 包含关键词"留言"
                    }
                },
                // 分隔线
                {
                    tag: 'hr'
                },
                // 时间戳字段
                {
                    tag: 'div',
                    text: {
                        tag: 'plain_text',
                        content: `⏰ 提交时间：${timestamp}`
                    }
                }
            ]
        }
    };

    // ================================
    // 发送 HTTP 请求
    // ================================
    return new Promise((resolve) => {
        try {
            // 解析 Webhook URL
            const url = new URL(webhookUrl);
            const options = {
                hostname: url.hostname,
                port: 443,
                path: url.pathname + url.search,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            // 创建请求
            const req = https.request(options, (res) => {
                let responseData = '';

                res.on('data', (chunk) => {
                    responseData += chunk;
                });

                res.on('end', () => {
                    if (res.statusCode === 200) {
                        console.log('Feishu notification sent successfully');
                        resolve(true);
                    } else {
                        console.error(`Feishu notification failed: ${res.statusCode}`);
                        console.error(`Response: ${responseData}`);
                        resolve(false);
                    }
                });
            });

            // 错误处理
            req.on('error', (error) => {
                console.error('Feishu notification error:', error.message);
                resolve(false);
            });

            // 发送数据
            req.write(JSON.stringify(cardMessage));
            req.end();

        } catch (error) {
            console.error('Feishu notification error:', error.message);
            resolve(false);
        }
    });
}

/**
 * 转义 Markdown 特殊字符（飞书 Lark Markdown）
 *
 * 飞书 Lark Markdown 需要转义的特殊字符：
 * - \ -> \\
 * - * -> \*
 * - _ -> \_
 * - [ -> \[
 * - ] -> \]
 * - ( -> \(
 * - ) -> \)
 * - # -> \#
 * - + -> \+
 * - - -> \-
 * - . -> \.
 * - ! -> \!
 *
 * @param {string} str - 待转义的字符串
 * @returns {string} - 转义后的字符串
 */
function escapeMarkdown(str) {
    if (!str) return '';
    return str
        .replace(/\\/g, '\\\\')
        .replace(/\*/g, '\\*')
        .replace(/_/g, '\\_')
        .replace(/\[/g, '\\[')
        .replace(/\]/g, '\\]')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/#/g, '\\#')
        .replace(/\+/g, '\\+')
        .replace(/-/g, '\\-')
        .replace(/\./g, '\\.')
        .replace(/!/g, '\\!');
}

module.exports = sendFeishuNotification;
