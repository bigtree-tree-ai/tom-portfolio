# 飞书通知配置指南

本文档说明如何配置飞书自定义机器人，用于接收网站联系表单的通知消息。

---

## 一、创建飞书自定义机器人

### 步骤 1：在飞书中创建群聊

1. 打开飞书应用
2. 创建一个新群聊（或使用已有群聊）
3. 记住这个群聊，用于接收通知消息

### 步骤 2：添加自定义机器人

1. 在群聊中点击右上角 `...` 更多选项
2. 选择 `群组设置`
3. 找到 `群机器人` 选项
4. 点击 `添加机器人`
5. 选择 `自定义机器人`

### 步骤 3：配置机器人

1. **机器人名称**：输入名称（例如"网站留言通知"）
2. **描述**：可选，填写用途说明
3. **头像**：可选，上传机器人头像
4. 点击 `添加`

### 步骤 4：获取 Webhook URL

1. 添加成功后，会显示 Webhook URL
2. **复制这个 URL**（格式类似：`https://open.feishu.cn/open-apis/bot/v2/hook/xxxxxxxx`）
3. 这个 URL 就是环境变量 `FEISHU_WEBHOOK_URL` 的值

---

## 二、配置环境变量

### 方式 1：本地开发环境

1. 在项目根目录的 `backend/.env` 文件中添加：

```bash
FEISHU_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/你的webhook地址
```

2. 保存文件

### 方式 2：服务器生产环境

1. SSH 连接到服务器：

```bash
ssh root@101.37.238.138
```

2. 编辑环境变量文件：

```bash
vi /data/tom-portfolio/backend/.env
```

3. 添加以下内容：

```bash
FEISHU_WEBHOOK_URL=https://open.feishu.cn/open-apis/bot/v2/hook/你的webhook地址
```

4. 保存并退出（`:wq`）

5. 重启后端服务：

```bash
systemctl restart tom-portfolio-backend
```

---

## 三、安全设置（重要）

### 关键词验证

飞书自定义机器人有**关键词安全验证**机制：

- 发送的卡片消息中**必须包含**以下至少一个关键词，否则消息会被拒绝
- 本项目使用的关键词是：**"留言"**
- 关键词出现在以下位置：
  - 卡片标题：`📬 新的网站留言`
  - 留言内容标签：`**📝 留言内容**`

### 自定义关键词

如果你想使用其他关键词：

1. 在飞书群聊中找到自定义机器人
2. 点击机器人设置
3. 找到 `安全设置` 中的 `关键词` 选项
4. 添加你想要的关键词（例如"联系"、"表单"等）
5. 修改 `backend/utils/feishu.js` 中的卡片内容，确保包含这些关键词

---

## 四、测试通知

### 本地测试

1. 确保 `.env` 文件已配置
2. 启动后端服务：

```bash
cd backend
npm start
```

3. 访问网站，填写并提交联系表单
4. 检查飞书群聊是否收到消息

### 服务器测试

1. 确保 `.env` 文件已配置
2. 重启后端服务：

```bash
systemctl restart tom-portfolio-backend
```

3. 访问网站：http://101.37.238.138:8081
4. 填写并提交联系表单
5. 检查飞书群聊是否收到消息

---

## 五、消息格式说明

### 卡片消息结构

飞书通知采用**交互式卡片**格式，包含以下字段：

| 字段 | 说明 | 示例 |
|------|------|------|
| **标题** | 卡片标题（包含关键词） | 📬 新的网站留言 |
| **邮箱** | 提交者邮箱地址 | user@example.com |
| **称呼** | 提交者称呼 | 张三 |
| **留言内容** | 备注内容（包含关键词） | 你好，我想咨询... |
| **提交时间** | 中国时区时间戳 | 2025/02/05 14:30:25 |

### 卡片样式

- **主题色**：蓝色（`template: 'blue'`）
- **分隔线**：使用 `<hr>` 分隔各个字段
- **图标**：使用 Emoji 增强可读性

---

## 六、故障排查

### 问题 1：收不到消息

**可能原因**：
1. Webhook URL 未正确配置
2. 关键词验证失败（消息中没有关键词）
3. 网络连接问题

**排查步骤**：
```bash
# 1. 检查环境变量是否设置
cat /data/tom-portfolio/backend/.env | grep FEISHU

# 2. 检查后端服务日志
journalctl -u tom-portfolio-backend -n 50

# 3. 手动测试 Webhook URL（替换你的 URL）
curl -X POST https://open.feishu.cn/open-apis/bot/v2/hook/你的webhook地址 \
  -H "Content-Type: application/json" \
  -d '{"msg_type":"text","content":{"text":"留言测试"}}'
```

### 问题 2：消息被拒绝（返回错误）

**可能原因**：
1. Webhook URL 已失效
2. 机器人被禁用或删除
3. 关键词验证失败

**解决方法**：
1. 重新在飞书中获取 Webhook URL
2. 确认机器人状态正常
3. 检查消息中是否包含关键词

### 问题 3：后端服务启动失败

**可能原因**：
1. .env 文件格式错误
2. 环境变量名拼写错误

**排查步骤**：
```bash
# 检查 .env 文件语法
cat /data/tom-portfolio/backend/.env

# 手动测试后端启动
cd /data/tom-portfolio/backend
node server.js
```

---

## 七、高级配置

### 添加多个机器人（可选）

如果需要同时向多个群聊发送通知：

1. 修改 `backend/routes/contact.js`，在提交成功后调用多次飞书通知
2. 为每个群聊配置不同的环境变量：
   - `FEISHU_WEBHOOK_URL_1`
   - `FEISHU_WEBHOOK_URL_2`
   - `FEISHU_WEBHOOK_URL_3`

### 自定义卡片样式

修改 `backend/utils/feishu.js` 中的 `cardMessage` 对象：

```javascript
card: {
    header: {
        title: {
            tag: 'plain_text',
            content: '自定义标题' // 修改标题
        },
        template: 'red' // 修改颜色：blue/green/red/yellow
    },
    elements: [
        // 添加或修改字段
    ]
}
```

更多卡片格式参考：[飞书开放平台 - 卡片消息文档](https://open.feishu.cn/document/common-capabilities/message-card/message-cards-content/using-message-cards)

---

## 八、安全建议

1. **不要提交 .env 文件到 Git**：`.env` 已在 `.gitignore` 中
2. **定期更换 Webhook URL**：如果怀疑 URL 泄露，立即在飞书中重新生成
3. **限制机器人权限**：只在需要的群聊中添加机器人
4. **监控通知频率**：设置飞书群消息免打扰，避免被大量通知打扰

---

## 九、相关文件

| 文件 | 说明 |
|------|------|
| `backend/utils/feishu.js` | 飞书通知核心逻辑 |
| `backend/routes/contact.js` | 联系表单 API（调用飞书通知） |
| `backend/.env` | 环境变量配置文件 |
| `backend/.env.example` | 环境变量示例文件 |

---

## 十、参考文档

- [飞书开放平台 - 自定义机器人](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)
- [飞书开放平台 - 卡片消息](https://open.feishu.cn/document/common-capabilities/message-card/message-cards-content/using-message-cards)
- [飞书开放平台 - 安全设置](https://open.feishu.cn/document/ukTMukTMukTM/uUTNz4SN1MjL1UzM)

---

如有问题，请检查后端服务日志或联系开发者。
