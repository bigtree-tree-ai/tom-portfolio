# 田大树 - 项目配置

## 项目概述

这是一个个人介绍网站，采用 Anthropic 风格设计（极简、黑白灰+荧光绿、大量留白）。包含 Hero 区、职业经历卡片和联系表单功能。

## 技术栈

### 前端
- **纯 HTML/CSS/JavaScript**：单文件架构
- **设计风格**：Anthropic 极简风格
- **字体**：Space Grotesk（标题）+ Inter（正文）

### 后端（迭代 #2 新增）
- **Node.js + Express**：API 服务
- **SQLite**：数据库存储（better-sqlite3）
- **nodemailer**：邮件通知（支持 QQ 邮箱）
- **helmet**：安全头设置
- **express-rate-limit**：速率限制

### 部署
- **Nginx**：反向代理 + 静态文件服务
- **systemd**：服务管理
- **GitHub Webhook**：自动化部署（待修复）
- **服务器**：阿里云 ECS (Ubuntu 24)

---

## 部署信息

### 服务器
- **IP地址**：101.37.238.138
- **SSH用户**：root
- **部署目录**：/data/tom-portfolio/

### 端口分配
| 服务 | 端口 | 说明 |
|------|------|------|
| 前端 | 8081 | Nginx 静态文件服务 |
| 后端 API | 5002 | Express API 服务 |
| Webhook | 5001 | GitHub 自动部署 |

### 数据库
- **类型**：SQLite
- **文件路径**：/data/tom-portfolio/database/contact.db
- **表名**：contacts

### 邮件服务（迭代 #2 配置）
- **服务商**：QQ 邮箱
- **SMTP**：smtp.qq.com:465 (SSL)
- **发件邮箱**：2052534606@qq.com
- **环境变量**：/data/tom-portfolio/backend/.env

### GitHub
- **仓库**：bigtree-tree-ai/tom-portfolio
- **Token**：已存储（用于自动化操作）

### 访问地址
- **公网访问**：http://101.37.238.138:8081
- **API 端点**：http://101.37.238.138:8081/api/contact
- **GitHub仓库**：https://github.com/bigtree-tree-ai/tom-portfolio

---

## 开发规范

1. 所有代码包含完整注释
2. 遵循设计规范
3. 提交前自测试
4. 使用参数化查询防止 SQL 注入
5. 输入验证防止 XSS 攻击

---

## ✅ 项目状态（2026-02-22 更新）

### 服务状态检查

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 网站访问 (8081) | ✅ 正常 | HTTP 200 |
| nginx 服务 | ✅ 运行中 | 端口 8081 |
| tom-portfolio-backend | ✅ 运行中 | 端口 5002 |
| SQLite 数据库 | ✅ 正常 | /data/tom-portfolio/database/contact.db |
| 阿里云安全组 | ✅ 已配置 | 8081 端口开放 |
| Git push | ⚠️ 待修复 | 认证问题 |

### 2026-02-22 迭代 #5：专业商务风格 + 移动端优先 ✅ 最新

**改造内容**：
1. ✅ 设计风格改为深色底 + 金铜色点缀
2. ✅ 完整展示职业经历（车好多/美团/搜狐）
3. ✅ 新增核心能力区块（6 项）
4. ✅ 移动端优先，紧凑布局
5. ✅ 删除 loading-screen（修复输入框无法点击）
6. ✅ 部署到服务器

**配色方案**：
- 背景：#0D0D0D（深黑）
- 卡片：#161616
- 强调：#C9A962（金铜色）

**部署结果**：
- 公网访问：http://101.37.238.138:8081 ✅

---

## 🔄 下次从这里继续

### 上次完成（2026-02-22 迭代 #4 - Anthropic 风格改造）

**改造内容**：
1. 删除粒子系统、自定义光标、有机纹理背景、装饰性浮动元素
2. 配色改为纯白背景 + 深黑文字 + 荧光绿
3. 新增 Hero 区（大标题 + 简介）
4. 新增职业经历卡片（车好多/美团/搜狐）
5. 简化联系表单样式

**代码改动**：
- 删除：689 行
- 新增：364 行
- 净减少：325 行

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 重构 | Anthropic 风格改造 |
| INDEX.md | 更新 | 项目索引更新 |
| SESSION.md | 新建 | 会话记录 |
| tasks/checklist.md | 更新 | 检查清单更新 |

**验收结果**：
- ✅ 公网访问正常：http://101.37.238.138:8081
- ✅ 页面标题"田大树 - 产品经理"
- ✅ Hero 区显示正常
- ✅ 职业经历卡片显示正常
- ✅ 荧光绿配色 #D4FF45
- ✅ 联系表单功能正常

**关键决策已确认**：
- 网站设计风格：Anthropic 极简风格 ✅
- 配色方案：纯白背景 + 深黑文字 + 荧光绿 ✅
- 内容展示：Hero 区 + 职业经历卡片 + 联系表单 ✅

---

### 下一步待办

#### 优先级 P0（待修复）
- [ ] 修复 Git push 认证问题
- [ ] 配置邮件 SMTP（联系表单邮件通知）

#### 优先级 P1（功能增强）
- [ ] 添加表单验证码（防机器人）
- [ ] 跨浏览器测试

#### 优先级 P2（可选）
- [ ] 域名配置
- [ ] SEO 优化
- [ ] Docker 化部署（提高稳定性）

---

### 日常更新流程

```bash
# 本地修改代码
cd "/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio"

# 提交
git add index.html
git commit -m "更新描述"

# 推送（如果认证正常）
git push origin main

# 如果 Git push 失败，使用 scp 直接上传
sshpass -p 'yxiE6*A$s7LJ,Af' scp index.html root@101.37.238.138:/data/tom-portfolio/app/index.html
```

---

### 服务器管理命令

```bash
# SSH 连接
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138

# 查看后端服务状态
systemctl status tom-portfolio-backend

# 重启后端服务
systemctl restart tom-portfolio-backend

# 查看后端日志
journalctl -u tom-portfolio-backend -f

# 查看 Nginx 日志
tail -f /data/tom-portfolio/logs/nginx-access.log

# 查看数据库记录
sqlite3 /data/tom-portfolio/database/contact.db "SELECT * FROM contacts;"

# 重启 Nginx
systemctl restart nginx

# 查看 Webhook 服务状态
systemctl status tom-portfolio-webhook
```

---

## 技术细节

### 设计风格
- **色彩系统**：纯白背景 + 深黑文字 + 荧光绿强调色（Anthropic 风格）
- **字体系统**：Space Grotesk（标题）+ Inter（正文）
- **核心视觉**：极简、大量留白、内容优先

### 颜色变量
| 变量 | 值 | 说明 |
|------|-----|------|
| `--color-bg` | `#FFFFFF` | 纯白背景 |
| `--color-text` | `#1A1A1A` | 深黑文字 |
| `--color-text-secondary` | `#666666` | 次要文字 |
| `--color-text-tertiary` | `#999999` | 辅助文字 |
| `--color-accent` | `#D4FF45` | 荧光绿强调色 |
| `--color-border` | `#E5E5E5` | 边框颜色 |

### 关键代码位置

#### 前端（index.html）
- Hero 区：第 64-72 行
- 职业经历卡片：第 76-142 行
- 联系表单区块：第 147-190 行
- 表单 CSS 样式：第 226-320 行
- 表单 JS 逻辑：第 375-475 行
- CSS 变量定义：第 18-32 行

#### 后端（backend/）
- server.js：Express 服务器主文件
- database/db.js：SQLite 数据库初始化
- routes/contact.js：联系表单 API 路由
- middleware/validator.js：数据验证中间件
- utils/email.js：邮件发送工具（支持 QQ/Gmail/163）

### 数据库表结构
```sql
CREATE TABLE contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    name TEXT NOT NULL,
    message TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ip_address TEXT
);
```

### 安全措施
- SQL 注入防护：参数化查询
- XSS 防护：输入验证 + HTML 转义
- 速率限制：每小时 5 次提交
- 请求体大小限制：1kb
- Helmet 安全头

### 验收标准

#### 迭代 #1（2025-01-31）
- [x] 网站能正常访问
- [x] 颜色已改为蓝黑科技风格
- [x] 新增内容正确显示
- [x] X 账号链接可点击
- [x] 粒子动画效果正常（蓝色系）
- [x] 移动端布局正常
- [x] 自定义光标效果正常

#### 迭代 #2（2025-01-31）
- [x] 前端表单显示正常（保持科技风格）
- [x] 邮箱格式验证正常
- [x] 称呼字符计数正常（0/20）
- [x] 提交按钮有加载状态
- [x] 提交成功/失败有明确反馈
- [x] 后端 API 服务正常运行（端口 5002）
- [x] 数据成功存入 SQLite 数据库
- [x] 速率限制生效（每小时5次）
- [x] 错误处理正常（400/500响应）
- [x] Nginx 反向代理正常
- [x] 公网访问表单功能正常
- [x] 移动端表单可用
- [ ] 邮件通知正常发送（待配置 SMTP）

#### 迭代 #3（2026-02-22）
- [x] 服务器环境重建完成
- [x] 前端代码部署成功
- [x] 后端代码部署成功
- [x] Nginx 配置完成
- [x] systemd 服务配置完成
- [x] 阿里云安全组开放 8081 端口
- [x] 公网访问验证通过

#### 迭代 #4（2026-02-22）✅ 最新
- [x] 粒子系统已删除
- [x] 自定义光标已删除
- [x] 有机纹理背景已删除
- [x] 装饰性浮动元素已删除
- [x] 呼吸动画效果已删除
- [x] 配色改为纯白背景 + 深黑文字 + 荧光绿
- [x] Hero 区显示正常
- [x] 职业经历卡片显示正常
- [x] 联系表单功能正常
- [x] 公网访问验证通过
