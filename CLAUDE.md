# 大树路跑跑 - 项目配置

## 项目概述

这是一个个人介绍网站，用于测试和展示。网站采用创意个性化设计，包含粒子系统、自定义光标、呼吸动画等交互效果。

## 技术栈

- **前端**：纯 HTML/CSS/JavaScript
- **部署**：Nginx + GitHub Webhook
- **服务器**：阿里云 ECS (Ubuntu 24)

---

## 部署信息

### 服务器
- **IP地址**：101.37.238.138
- **SSH用户**：root
- **部署目录**：/data/tom-portfolio/

### GitHub
- **仓库**：bigtree-tree-ai/tom-portfolio
- **Token**：已存储（用于自动化操作）

### 访问地址
- **公网访问**：http://101.37.238.138:8081
- **GitHub仓库**：https://github.com/bigtree-tree-ai/tom-portfolio

---

## 开发规范

1. 所有代码包含完整注释
2. 遵循设计规范
3. 提交前自测试

---

## 🔄 下次从这里继续

### 上次完成（2025-01-31）

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 创建 | 网站主文件（含粒子系统动画） |
| README.md | 创建 | 项目说明文档 |
| INDEX.md | 创建 | 项目索引 |
| CLAUDE.md | 创建 | 项目配置 |
| /etc/nginx/sites-available/tom-portfolio | 创建 | Nginx 配置 |
| /data/tom-portfolio/scripts/webhook-server.js | 创建 | Webhook 服务 |
| 系统级 CLAUDE.md | 更新 | 添加静态网站部署规范 |

**关键决策已确认**：
- 网站设计风格：有机流动、粒子系统 ✅
- 部署方式：Nginx + GitHub Webhook ✅
- 端口策略：独立端口 8081（项目隔离）✅
- 服务器目录：/data/tom-portfolio/ ✅

---

### 下一步待办

#### 优先级 P0（核心优化）
- [ ] 响应式设计优化（移动端适配）
- [ ] 代码模块化拆分（CSS/JS 分离）

#### 优先级 P1（功能增强）
- [ ] 添加更多内容区块
- [ ] 性能优化（加载速度）

#### 优先级 P2（可选）
- [ ] 域名配置
- [ ] SEO 优化

---

### 日常更新流程

```bash
# 本地修改代码
cd "/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio"
vim index.html

# 提交并推送（服务器自动更新）
git add .
git commit -m "更新描述"
git push origin main
```

---

### 服务器管理命令

```bash
# SSH 连接
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138

# 查看 Webhook 服务状态
systemctl status tom-portfolio-webhook

# 查看 Nginx 日志
tail -f /data/tom-portfolio/logs/nginx-access.log

# 查看 Webhook 日志
tail -f /data/tom-portfolio/logs/webhook.log

# 重启服务
systemctl restart tom-portfolio-webhook
systemctl restart nginx
```

---

## 技术细节

### 设计风格
- **色彩系统**：温暖陶土色系 + 深邃墨蓝背景
- **字体系统**：Noto Serif SC（标题）+ Space Mono（正文）
- **核心视觉**：粒子系统跟随鼠标 + 呼吸动画

### 关键代码位置
- 粒子系统：index.html 第 350-450 行
- 自定义光标：index.html 第 95-130 行
- CSS 变量定义：index.html 第 40-55 行

### Webhook 配置
- **端口**：5001
- **密钥**：tom_portfolio_webhook_secret_2025
- **健康检查**：http://localhost:5001/health
