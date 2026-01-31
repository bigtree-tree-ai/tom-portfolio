# 大树路跑跑 - 项目索引

## 项目概览

| 属性 | 信息 |
|------|------|
| **项目名称** | tom-portfolio |
| **GitHub仓库** | https://github.com/bigtree-tree-ai/tom-portfolio |
| **部署服务器** | 阿里云 101.37.238.138 |
| **项目类型** | 个人介绍网站 |
| **当前状态** | 🟢 运行中 |

## 文件夹结构

```
tom-portfolio/
├── index.html          # 主页面（包含所有HTML、CSS、JS）
├── README.md           # 项目说明
├── INDEX.md            # 本文件 - 项目索引
├── CLAUDE.md           # 项目配置
└── .git/               # Git仓库（初始化后）
```

## 部署信息

### 服务器配置
- **部署目录**：`/data/tom-portfolio/`
- **Nginx配置**：`/etc/nginx/sites-available/tom-portfolio`
- **访问端口**：80 (HTTP)

### Webhook配置
- **Webhook端口**：5001
- **密钥验证**：HMAC签名
- **自动更新**：GitHub推送 → 服务器自动拉取

## 更新日志

| 日期 | 更新内容 |
|------|---------|
| 2025-01-31 | 项目创建，初始部署 |

## 快速链接

- **GitHub仓库**：[bigtree-tree-ai/tom-portfolio](https://github.com/bigtree-tree-ai/tom-portfolio)
- **公网访问**：http://101.37.238.138
