/**
 * validator.js - 数据验证中间件
 *
 * 功能说明：验证联系表单提交的数据，防止恶意输入
 * 设计思路：
 * - 邮箱格式验证：使用正则表达式验证标准邮箱格式
 * - 长度限制：防止数据灌入攻击
 * - 内容过滤：防止 XSS 和 SQL 注入（虽然参数化查询已防护）
 *
 * 关键决策：
 * - 邮箱最大 100 字符：足够长但防止超长输入
 * - 称呼最大 20 字符：符合用户需求
 * - 备注最大 500 字符：合理限制
 * - 最小长度 1 字符：防止空字符串
 *
 * 安全考虑：
 * - 不使用第三方验证库，减少依赖
 * - 正则表达式简洁但覆盖常见格式
 * - 返回具体错误信息帮助用户修正
 */

/**
 * 验证邮箱格式
 *
 * 设计思路：使用简洁的正则表达式验证邮箱格式
 * - 要求：包含 @ 符号，@ 前后有内容，包含域名后缀
 * - 不验证所有边界情况（如国际化域名），保持简单
 *
 * @param {string} email - 待验证的邮箱地址
 * @returns {boolean} - 是否为有效邮箱格式
 */
function isValidEmail(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }

    // 邮箱格式正则：xxx@xxx.xxx
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * 验证输入数据
 *
 * 设计思路：
 * - 返回错误列表而非抛出异常，方便返回给前端
 * - 每个字段独立验证，收集所有错误
 * - 提供清晰的错误信息
 *
 * @param {Object} data - 待验证的数据对象
 * @param {string} data.email - 邮箱地址
 * @param {string} data.name - 称呼
 * @param {string} data.message - 备注内容
 * @returns {Array<string>} - 错误信息数组，空数组表示验证通过
 */
function validateInput(data) {
    const errors = [];

    // ================================
    // 邮箱验证
    // ================================
    if (!data.email) {
        errors.push('请输入邮箱地址');
    } else if (!isValidEmail(data.email)) {
        errors.push('请输入有效的邮箱地址');
    } else if (data.email.length > 100) {
        errors.push('邮箱地址过长（最多100字符）');
    }

    // ================================
    // 称呼验证
    // ================================
    if (!data.name) {
        errors.push('请输入您的称呼');
    } else if (data.name.length < 1) {
        errors.push('称呼不能为空');
    } else if (data.name.length > 20) {
        errors.push('称呼不能超过20个字符');
    }

    // ================================
    // 备注验证（可选字段）
    // ================================
    if (data.message && data.message.length > 500) {
        errors.push('备注内容过长（最多500字符）');
    }

    return errors;
}

/**
 * 清理输入数据（去除危险字符）
 *
 * 设计思路：
 * - 虽然参数化查询已防止 SQL 注入，但额外清理可以提高安全性
 * - 去除 HTML 标签防止 XSS
 * - 去除首尾空白
 *
 * @param {string} str - 待清理的字符串
 * @returns {string} - 清理后的字符串
 */
function sanitizeString(str) {
    if (!str || typeof str !== 'string') {
        return '';
    }

    // 去除 HTML 标签
    let cleaned = str.replace(/<[^>]*>/g, '');

    // 去除首尾空白
    cleaned = cleaned.trim();

    return cleaned;
}

module.exports = {
    isValidEmail,
    validateInput,
    sanitizeString
};
