# 大树路跑跑 - 项目索引

## 项目概览

| 属性 | 信息 |
|------|------|
| **项目名称** | tom-portfolio |
| **GitHub仓库** | https://github.com/bigtree-tree-ai/tom-portfolio |
| **部署服务器** | 阿里云 101.37.238.138 |
| **项目类型** | 个人介绍网站 |
| **当前状态** | 🟢 运行中 |
| **开始时间** | 2025-01-31 |

## 文件夹结构

```
tom-portfolio/
├── index.html          # 主页面（包含所有HTML、CSS、JS）
├── README.md           # 项目说明
├── INDEX.md            # 本文件 - 项目索引
├── CLAUDE.md           # 项目配置
└── .git/               # Git仓库
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

### 进行中的工作
- [ ] 网站功能优化（待规划）

### 待完成的工作
- [ ] 域名配置（如需要）
- [ ] 网站内容丰富
- [ ] SEO 优化

---

## ⬅️ 上次工作结束点

**时间**：2025-01-31

**完成内容**：
1. 创建个人网站（大树路跑跑）
   - 设计风格：有机流动、粒子系统
   - 核心特性：鼠标跟随粒子、自定义光标、呼吸动画
2. 完整部署流程
   - GitHub 仓库创建
   - 阿里云服务器配置
   - Nginx + Webhook 自动化部署
3. 系统级配置文档更新
   - 添加"静态网站自动化部署规范"到 CLAUDE.md

**关键文件位置**：
- 本地项目：`/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio/`
- 服务器目录：`/data/tom-portfolio/`
- Nginx 配置：`/etc/nginx/sites-available/tom-portfolio`
- Webhook 服务：`/data/tom-portfolio/scripts/webhook-server.js`

---

## 部署信息

### 服务器配置
- **部署目录**：`/data/tom-portfolio/`
- **Nginx配置**：`/etc/nginx/sites-available/tom-portfolio`
- **访问端口**：8081
- **Webhook端口**：5001

### Webhook配置
- **密钥验证**：HMAC签名（tom_portfolio_webhook_secret_2025）
- **自动更新**：GitHub推送 → 服务器自动拉取

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

---

## 快速链接

- **GitHub仓库**：[bigtree-tree-ai/tom-portfolio](https://github.com/bigtree-tree-ai/tom-portfolio)
- **公网访问**：http://101.37.238.138:8081
- **部署规范**：`/Users/tommmmmmmm/Desktop/Claude Code/个人网站自动化部署规范.md`

---

## 💡 后续优化方向

### 功能增强
- [ ] 添加更多交互效果
- [ ] 响应式设计优化
- [ ] 加载性能优化

### 内容丰富
- [ ] 添加个人经历
- [ ] 添加项目展示
- [ ] 添加联系方式

### 技术优化
- [ ] 代码模块化拆分
- [ ] 添加 CSS 预处理器
- [ ] 考虑使用框架重构
