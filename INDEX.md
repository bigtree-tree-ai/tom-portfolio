# 大树路跑跑 - 项目索引

## 项目概览

| 属性 | 信息 |
|------|------|
| **项目名称** | tom-portfolio |
| **GitHub仓库** | https://github.com/bigtree-tree-ai/tom-portfolio |
| **部署服务器** | 阿里云 101.37.238.138 |
| **项目类型** | 个人介绍网站（动态） |
| **当前状态** | 🟢 运行中 |
| **开始时间** | 2025-01-31 |

## 文件夹结构

```
tom-portfolio/
├── index.html              # 主页面（包含所有HTML、CSS、JS）
├── backend/                # 后端 API 服务
│   ├── server.js          # Express 服务器
│   ├── database/          # SQLite 数据库
│   │   └── db.js         # 数据库初始化
│   ├── routes/            # API 路由
│   │   └── contact.js    # 联系表单接口
│   ├── middleware/        # 中间件
│   │   └── validator.js  # 数据验证
│   ├── utils/             # 工具函数
│   │   └── email.js      # 邮件发送
│   ├── package.json      # 依赖配置
│   └── .env.example      # 环境变量模板
├── deploy/                # 部署配置文件
│   ├── nginx-tom-portfolio.conf      # Nginx 配置
│   └── tom-portfolio-backend.service # systemd 服务配置
├── README.md              # 项目说明
├── INDEX.md               # 本文件 - 项目索引
├── CLAUDE.md              # 项目配置
├── tasks/                 # 任务管理
│   └── checklist.md       # 检查清单
└── .git/                  # Git仓库
```

## ✅ 当前进度

### 已完成的工作
- [x] 项目创建与初始化
- [x] 网站代码开发（粒子动画效果）
- [x] GitHub 仓库创建
- [x] 服务器环境配置
- [x] Nginx 配置（端口 8081）
- [x] Webhook 自动化部署
- [x] 公网访问验证
- [x] 系统级配置文档更新
- [x] **迭代 #1**：蓝黑科技配色 + 关于本站区块
- [x] **迭代 #2**：联系表单功能（后端 API + 数据库 + 邮件通知）

### 进行中的工作
- [ ] 邮件服务配置（需要用户配置 Gmail SMTP）

### 待完成的工作
- [ ] 代码模块化拆分（CSS/JS 分离）
- [ ] Webhook 自动部署问题修复
- [ ] 域名配置（如需要）
- [ ] 网站内容丰富
- [ ] SEO 优化

---

## ⬅️ 上次工作结束点

**时间**：2025-01-31

**完成内容（迭代 #2）**：
1. 前端联系表单
   - 三个字段：邮箱、称呼、备注
   - 实时字符计数（称呼限制20字符）
   - 客户端验证（邮箱格式）
   - 科技风格样式（保持一致性）
2. 后端 API 服务
   - Express.js 服务器（端口 5002）
   - SQLite 数据库存储
   - nodemailer 邮件通知
   - helmet 安全头
   - express-rate-limit 速率限制
3. 安全措施
   - SQL 注入防护（参数化查询）
   - XSS 防护（输入验证）
   - 速率限制（每小时5次）
   - 请求体大小限制（1kb）
4. 部署配置
   - Nginx 反向代理配置
   - systemd 服务配置
   - 环境变量模板

**验收结果**：
- ✅ 前端表单显示正常
- ✅ API 服务运行正常
- ✅ 数据存储成功
- ✅ 公网访问正常

**待办事项**：
- [ ] 配置 Gmail SMTP（邮箱发送功能）
- [ ] 本地测试邮件发送

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 修改 | 添加联系表单区块 + CSS + JS |
| backend/ | 新增 | 后端 API 服务完整目录 |
| deploy/ | 新增 | Nginx 和 systemd 配置 |
| .gitignore | 新增 | 忽略敏感文件和数据库 |

**关键文件位置**：
- 本地项目：`/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio/`
- 服务器目录：`/data/tom-portfolio/`
- 后端服务：`/data/tom-portfolio/backend/`
- 数据库文件：`/data/tom-portfolio/database/contact.db`
- Nginx 配置：`/etc/nginx/sites-available/tom-portfolio`
- systemd 服务：`/etc/systemd/system/tom-portfolio-backend.service`

---

## 部署信息

### 服务器配置
- **部署目录**：`/data/tom-portfolio/`
- **Nginx配置**：`/etc/nginx/sites-available/tom-portfolio`
- **前端端口**：8081
- **后端端口**：5002
- **Webhook端口**：5001

### 服务管理命令
```bash
# 查看后端服务状态
systemctl status tom-portfolio-backend

# 重启后端服务
systemctl restart tom-portfolio-backend

# 查看后端日志
journalctl -u tom-portfolio-backend -f

# 查看数据库记录
sqlite3 /data/tom-portfolio/database/contact.db "SELECT * FROM contacts;"
```

### 环境变量配置
文件位置：`/data/tom-portfolio/backend/.env`
```env
PORT=5002
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=xxxx xxxx xxxx xxxx  # Gmail 应用专用密码
EMAIL_TO=your-email@gmail.com
```

### 安全组已开放
| 协议 | 端口 | 授权对象 | 描述 |
|------|------|---------|------|
| SSH | 22 | 116.148.119.160/32 | SSH访问 |
| HTTP | 8081 | 0.0.0.0/0 | 网站访问 |

---

## 更新日志

| 日期 | 更新内容 |
|------|---------|
| 2025-01-31 | 项目创建，初始部署完成 |
| 2025-01-31 | 网站上线（http://101.37.238.138:8081） |
| 2025-01-31 | Webhook 自动化部署配置完成 |
| 2025-01-31 | 系统级配置文档更新（添加静态网站部署规范） |
| 2025-01-31 | **迭代 #1**：蓝黑科技配色 + 关于本站区块 + 扫描线效果 |
| 2025-01-31 | **迭代 #2**：联系表单功能（后端 API + 数据库 + 邮件通知） |

---

## 快速链接

- **GitHub仓库**：[bigtree-tree-ai/tom-portfolio](https://github.com/bigtree-tree-ai/tom-portfolio)
- **公网访问**：http://101.37.238.138:8081
- **部署规范**：`/Users/tommmmmmmm/Desktop/Claude Code/个人网站自动化部署规范.md`
- **X 账号**：[@more_than7](https://x.com/more_than7)

---

## 💡 后续优化方向

### 功能增强
- [ ] 邮件服务配置和测试
- [ ] 添加表单验证码（防机器人）
- [ ] 添加管理后台查看提交记录
- [ ] 添加更多交互效果

### 内容丰富
- [ ] 添加个人经历
- [ ] 添加项目展示
- [ ] 添加更多联系方式

### 技术优化
- [ ] 代码模块化拆分（CSS/JS 分离）
- [ ] Webhook 自动部署修复
- [ ] 添加 CSS 预处理器
- [ ] 考虑使用框架重构
