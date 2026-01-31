# 大树路跑跑 - 项目配置

## 项目概述

这是一个个人介绍网站，从静态网站升级为动态应用。网站采用科技感设计风格，包含粒子系统、自定义光标、呼吸动画、扫描线效果等交互效果，以及联系表单功能。

## 技术栈

### 前端
- **纯 HTML/CSS/JavaScript**：单文件架构
- **粒子系统**：Canvas 2D 动画
- **自定义光标**：鼠标跟随效果

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

## 🔄 下次从这里继续

### 上次完成（2025-01-31 迭代 #2）

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 修改 | 添加联系表单区块 + CSS 样式 + JS 逻辑 |
| backend/ | 新增 | 后端 API 服务完整目录 |
| backend/server.js | 新增 | Express 服务器主文件 |
| backend/database/db.js | 新增 | SQLite 数据库初始化 |
| backend/routes/contact.js | 新增 | 联系表单 API 路由 |
| backend/middleware/validator.js | 新增 | 数据验证中间件 |
| backend/utils/email.js | 新增 | 邮件发送工具（支持 QQ 邮箱） |
| backend/package.json | 新增 | Node.js 依赖配置 |
| deploy/nginx-tom-portfolio.conf | 新增 | Nginx 配置文件 |
| deploy/tom-portfolio-backend.service | 新增 | systemd 服务配置 |
| .gitignore | 新增 | 忽略敏感文件和数据库 |

**新增功能（迭代 #2）**：
1. **前端联系表单**
   - 三个字段：邮箱、称呼（限20字符）、备注
   - 实时字符计数
   - 客户端验证（邮箱格式）
   - 提交状态反馈（加载中/成功/失败）
   - 科技风格样式（保持一致性）

2. **后端 API 服务**
   - Express.js 服务器（端口 5002）
   - SQLite 数据库存储（参数化查询防注入）
   - QQ 邮件通知（smtp.qq.com:465 SSL）
   - helmet 安全头
   - express-rate-limit 速率限制（每小时5次）

3. **部署配置**
   - Nginx 反向代理（/api/* → 后端）
   - systemd 服务（自动启动）
   - 环境变量配置（.env 文件）

**关键决策已确认**：
- 网站设计风格：科技感、蓝黑配色 ✅
- 部署方式：Nginx + systemd ✅
- 端口策略：前端 8081、后端 5002、Webhook 5001 ✅
- 数据库：SQLite（文件型，无需额外服务）✅
- 邮件服务：QQ 邮箱 SMTP（国内稳定）✅
- 接收通知邮箱：2052534606@qq.com ✅

---

### 下一步待办

#### 优先级 P0（核心优化）
- [ ] 代码模块化拆分（CSS/JS 分离）
- [ ] Webhook 自动部署问题修复（当前需手动更新）

#### 优先级 P1（功能增强）
- [ ] 添加更多内容区块
- [ ] 添加表单验证码（防机器人）
- [ ] 性能优化（加载速度）

#### 优先级 P2（可选）
- [ ] 域名配置
- [ ] SEO 优化
- [ ] 管理后台查看提交记录

---

### 日常更新流程

```bash
# 本地修改代码
cd "/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio"

# 提交并推送
git add .
git commit -m "更新描述"
git push origin main

# 手动更新服务器（前端）
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138 \
  "cp /data/tom-portfolio/index.html /data/tom-portfolio/app/index.html"

# 手动更新服务器（后端）
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138 \
  "cd /data/tom-portfolio && git pull origin main && systemctl restart tom-portfolio-backend"
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
- **色彩系统**：深邃黑 + 电光蓝（科技风格）
- **字体系统**：Noto Serif SC（标题）+ Space Mono（正文）
- **核心视觉**：粒子系统跟随鼠标 + 呼吸动画 + 扫描线效果

### 颜色变量
| 变量 | 值 | 说明 |
|------|-----|------|
| `--color-bg` | `#000510` | 深邃黑背景 |
| `--color-text` | `#e0f0ff` | 冷白文字 |
| `--color-accent` | `#00d4ff` | 电光蓝 |
| `--color-accent-light` | `#40e0ff` | 亮蓝 |
| `--color-accent-dark` | `#0099cc` | 深蓝 |
| `--color-muted` | `#1a3a5c` | 深蓝灰 |

### 关键代码位置

#### 前端（index.html）
- 粒子系统：第 795-915 行
- 自定义光标：第 95-123 行
- 关于本站区块：第 241-287 行
- **联系表单区块**：第 690-760 行（迭代 #2 新增）
- 表单 CSS 样式：第 290-430 行（迭代 #2 新增）
- 表单 JS 逻辑：第 920-1050 行（迭代 #2 新增）
- 扫描线效果：第 61-77 行
- CSS 变量定义：第 18-37 行

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

#### 迭代 #1
- [x] 网站能正常访问
- [x] 颜色已改为蓝黑科技风格
- [x] 新增内容正确显示
- [x] X 账号链接可点击
- [x] 粒子动画效果正常（蓝色系）
- [x] 移动端布局正常
- [x] 自定义光标效果正常

#### 迭代 #2
- [x] 前端表单显示正常（保持科技风格）
- [x] 邮箱格式验证正常
- [x] 称呼字符计数正常（0/20）
- [x] 提交按钮有加载状态
- [x] 提交成功/失败有明确反馈
- [x] 后端 API 服务正常运行（端口 5002）
- [x] 数据成功存入 SQLite 数据库
- [x] QQ 邮件通知正常发送
- [x] 速率限制生效（每小时5次）
- [x] 错误处理正常（400/500响应）
- [x] Nginx 反向代理正常
- [x] 公网访问表单功能正常
- [x] 移动端表单可用
