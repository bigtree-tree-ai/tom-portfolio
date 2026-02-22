# 田大树 - 项目索引

## 项目概览

| 属性 | 信息 |
|------|------|
| **项目名称** | tom-portfolio |
| **GitHub仓库** | https://github.com/bigtree-tree-ai/tom-portfolio |
| **部署服务器** | 阿里云 101.37.238.138 |
| **项目类型** | 个人介绍网站 |
| **当前状态** | ✅ 服务正常运行（2026-02-22） |
| **设计风格** | Anthropic 风格（极简、黑白灰+荧光绿） |
| **开始时间** | 2025-01-31 |

## 文件夹结构

```
tom-portfolio/
├── index.html              # 主页面（Anthropic 风格）
├── backend/                # 后端 API 服务
│   ├── server.js          # Express 服务器
│   ├── database/          # SQLite 数据库模块
│   │   └── db.js         # 数据库初始化
│   ├── routes/            # API 路由
│   │   └── contact.js    # 联系表单接口
│   ├── middleware/        # 中间件
│   │   └── validator.js  # 数据验证
│   ├── utils/             # 工具函数
│   │   ├── email.js      # 邮件发送
│   │   └── feishu.js     # 飞书通知
│   ├── package.json      # 依赖配置
│   └── .env.example      # 环境变量模板
├── deploy/                # 部署配置文件
├── README.md              # 项目说明
├── INDEX.md               # 本文件 - 项目索引
├── CLAUDE.md              # 项目配置
├── SESSION.md             # 会话记录
└── tasks/                 # 任务管理
```

---

## ✅ 服务状态（2026-02-22）

| 检查项 | 状态 | 说明 |
|--------|------|------|
| 网站访问 (101.37.238.138:8081) | ✅ 正常 | HTTP 200 |
| Nginx 服务 | ✅ 运行中 | 端口 8081 |
| tom-portfolio-backend | ✅ 运行中 | 端口 5002 |
| SQLite 数据库 | ✅ 正常 | /data/tom-portfolio/database/contact.db |
| 阿里云安全组 | ✅ 已配置 | 8081 端口已开放 |

---

## ✅ 历史进度

### 已完成的工作
- [x] 项目创建与初始化（2025-01-31）
- [x] 网站代码开发（粒子动画效果）
- [x] GitHub 仓库创建
- [x] **迭代 #1**：蓝黑科技配色 + 关于本站区块
- [x] **迭代 #2**：联系表单功能（后端 API + 数据库 + 邮件通知）
- [x] **迭代 #3**：服务重新部署（2026-02-22）
- [x] **迭代 #4**：Anthropic 风格改造（2026-02-22）✅ 最新

### 进行中的工作
- 无

### 待完成的工作
- [ ] 邮件服务配置（需要配置邮箱 SMTP）
- [ ] 域名配置（如需要）
- [ ] SEO 优化

---

## ⬅️ 上次工作结束点

**时间**：2026-02-22

**完成内容（迭代 #4 - Anthropic 风格改造）**：

### 改造内容

1. **删除的装饰效果**
   - 粒子系统（80个粒子的 Canvas 动画）
   - 自定义光标（跟随鼠标的圆圈）
   - 有机纹理背景动画
   - 装饰性浮动元素
   - 呼吸动画效果

2. **配色方案更新**
   | 元素 | 原配色 | 新配色 |
   |------|--------|--------|
   | 背景 | #F5F0E8（米色） | #FFFFFF（纯白） |
   | 文字 | #2D4739（深绿） | #1A1A1A（深黑） |
   | 强调 | #7A9B76（柔和绿） | #D4FF45（荧光绿） |

3. **新增内容区块**
   - Hero 区：大标题"田大树" + 简介
   - 职业经历卡片：
     - 车好多集团（2016.10 - 至今）
     - 美团点评集团（2015.01 - 2016.10）
     - 搜狐集团（2012.03 - 2014.12）

4. **简化联系表单**
   - 保留功能代码
   - 修改配色为 Anthropic 风格
   - 简化边框和背景

### 代码改动量
- 删除代码：689 行
- 新增代码：364 行
- 净减少：325 行

### 验收结果
- ✅ 公网访问正常
- ✅ 页面标题"田大树 - 产品经理"
- ✅ 荧光绿配色 #D4FF45
- ✅ 职业经历卡片显示正常
- ✅ 联系表单功能正常

**改动文件列表**：
| 文件 | 操作 | 说明 |
|------|------|------|
| index.html | 重构 | Anthropic 风格改造 |

---

## 部署信息

### 服务器配置
- **服务器 IP**：101.37.238.138
- **部署目录**：`/data/tom-portfolio/`
- **前端端口**：8081
- **后端端口**：5002

### 访问地址
- **公网访问**：http://101.37.238.138:8081
- **后端 API**：http://101.37.238.138:8081/api/contact

### 服务管理命令
```bash
# SSH 连接
sshpass -p 'yxiE6*A$s7LJ,Af' ssh root@101.37.238.138

# 查看后端服务状态
systemctl status tom-portfolio-backend

# 重启后端服务
systemctl restart tom-portfolio-backend

# 查看后端日志
journalctl -u tom-portfolio-backend -f

# 查看 Nginx 状态
systemctl status nginx

# 重启 Nginx
systemctl restart nginx

# 查看数据库记录
sqlite3 /data/tom-portfolio/database/contact.db "SELECT * FROM contacts;"
```

### 环境变量配置
文件位置：`/data/tom-portfolio/backend/.env`
```env
PORT=5002
EMAIL_USER=your-email@qq.com
EMAIL_PASS=your-email-auth-code
EMAIL_TO=your-email@qq.com
```

### 安全组已开放
| 协议 | 端口 | 授权对象 | 描述 |
|------|------|---------|------|
| SSH | 22 | 0.0.0.0/0 | SSH访问 |
| HTTP | 8081 | 0.0.0.0/0 | 网站访问 |

---

## 更新日志

| 日期 | 更新内容 |
|------|---------|
| 2025-01-31 | 项目创建，初始部署完成 |
| 2025-01-31 | **迭代 #1**：蓝黑科技配色 + 关于本站区块 + 扫描线效果 |
| 2025-01-31 | **迭代 #2**：联系表单功能（后端 API + 数据库 + 邮件通知） |
| 2026-02-21 | 服务状态检查：发现服务离线，/data/ 目录丢失 |
| 2026-02-22 | **迭代 #3**：服务重新部署，网站恢复上线 |
| 2026-02-22 | **迭代 #4**：Anthropic 风格改造 ✅ |

---

## 快速链接

- **公网访问**：http://101.37.238.138:8081
- **GitHub仓库**：[bigtree-tree-ai/tom-portfolio](https://github.com/bigtree-tree-ai/tom-portfolio)
- **X 账号**：[@more_than7](https://x.com/more_than7)

---

## 💡 后续优化方向

### 功能增强
- [ ] 邮件服务配置和测试
- [ ] 添加表单验证码（防机器人）
- [ ] 添加管理后台查看提交记录

### 内容丰富
- [ ] 添加项目展示
- [ ] 添加更多联系方式

### 技术优化
- [ ] 代码模块化拆分（CSS/JS 分离）
- [ ] 考虑使用 Docker 部署
- [ ] 添加 HTTPS 支持
