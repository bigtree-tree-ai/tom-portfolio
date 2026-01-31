# 大树路跑跑 - 项目配置

## 项目概述

这是一个个人介绍网站，用于测试和展示。网站采用科技感设计风格，包含粒子系统、自定义光标、呼吸动画、扫描线效果等交互效果。

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

### 上次完成（2025-01-31 迭代 #1）

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 修改 | 更新为蓝黑科技配色 + 新增关于本站区块 |

**新增功能**：
- 颜色系统改为深邃黑 + 电光蓝（科技风格）
- 新增"关于本站"内容区块
- 添加扫描线动画效果
- X 账号链接（@more_than7）
- 发光效果（box-shadow）

**关键决策已确认**：
- 网站设计风格：科技感、蓝黑配色 ✅
- 部署方式：Nginx + GitHub Webhook ✅
- 端口策略：独立端口 8081（项目隔离）✅
- 服务器目录：/data/tom-portfolio/ ✅
- X 账号：@more_than7 ✅

---

### 下一步待办

#### 优先级 P0（核心优化）
- [ ] 代码模块化拆分（CSS/JS 分离）
- [ ] Webhook 自动部署问题修复（当前需手动更新）

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

# 提交并推送
git add .
git commit -m "更新描述"
git push origin main

# 手动更新服务器（Webhook 待修复）
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138 "cd /data/tom-portfolio/app && git pull origin main"
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

# 重启服务
systemctl restart tom-portfolio-webhook
systemctl restart nginx
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
- 粒子系统：index.html 第 566-677 行
- 自定义光标：index.html 第 95-123 行
- 关于本站区块：index.html 第 241-287 行
- 扫描线效果：index.html 第 61-77 行
- CSS 变量定义：index.html 第 18-37 行

### Webhook 配置
- **端口**：5001
- **密钥**：tom_portfolio_webhook_secret_2025
- **健康检查**：http://localhost:5001/health

### 验收标准（迭代 #1）
- [x] 网站能正常访问
- [x] 颜色已改为蓝黑科技风格
- [x] 新增内容正确显示
- [x] X 账号链接可点击
- [x] 粒子动画效果正常（蓝色系）
- [x] 移动端布局正常
- [x] 自定义光标效果正常
