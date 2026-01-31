#!/bin/bash

# ================================
# 服务器部署脚本 - 迭代 #2
# ================================
# 功能：部署后端 API 服务和更新 Nginx 配置
# 使用方法：在服务器上运行此脚本
# ================================

set -e  # 遇到错误立即退出

echo "================================"
echo "开始部署 tom-portfolio 后端服务"
echo "================================"

# ================================
# 1. 安装 Node.js（如果未安装）
# ================================
if ! command -v node &> /dev/null; then
    echo "正在安装 Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
    echo "Node.js 安装完成: $(node --version)"
else
    echo "Node.js 已安装: $(node --version)"
fi

# ================================
# 2. 创建必要的目录
# ================================
echo "创建目录结构..."
mkdir -p /data/tom-portfolio/backend
mkdir -p /data/tom-portfolio/database
mkdir -p /data/tom-portfolio/logs
mkdir -p /data/tom-portfolio/app

# ================================
# 3. 复制后端代码
# ================================
echo "复制后端代码..."
cp -r backend/* /data/tom-portfolio/backend/

# ================================
# 4. 安装依赖
# ================================
echo "安装 Node.js 依赖..."
cd /data/tom-portfolio/backend
npm install --production

# ================================
# 5. 配置环境变量
# ================================
echo "配置环境变量..."
if [ ! -f /data/tom-portfolio/backend/.env ]; then
    echo "请先配置 .env 文件："
    echo "  cp backend/.env.example /data/tom-portfolio/backend/.env"
    echo "  然后编辑 .env 文件填入邮箱配置"
    exit 1
fi

# ================================
# 6. 更新 Nginx 配置
# ================================
echo "更新 Nginx 配置..."
cp deploy/nginx-tom-portfolio.conf /etc/nginx/sites-available/tom-portfolio

# 启用配置（如果未启用）
if [ ! -L /etc/nginx/sites-enabled/tom-portfolio ]; then
    ln -sf /etc/nginx/sites-available/tom-portfolio /etc/nginx/sites-enabled/tom-portfolio
fi

# 测试 Nginx 配置
nginx -t

# ================================
# 7. 配置 systemd 服务
# ================================
echo "配置 systemd 服务..."
cp deploy/tom-portfolio-backend.service /etc/systemd/system/

# 重新加载 systemd
systemctl daemon-reload

# ================================
# 8. 启动后端服务
# ================================
echo "启动后端服务..."
systemctl enable tom-portfolio-backend
systemctl restart tom-portfolio-backend

# ================================
# 9. 重启 Nginx
# ================================
echo "重启 Nginx..."
systemctl restart nginx

# ================================
# 10. 验证服务状态
# ================================
echo ""
echo "================================"
echo "部署完成！服务状态检查："
echo "================================"

# 检查后端服务
if systemctl is-active --quiet tom-portfolio-backend; then
    echo "✓ 后端服务运行正常"
else
    echo "✗ 后端服务未运行"
    systemctl status tom-portfolio-backend --no-pager
fi

# 检查 Nginx
if systemctl is-active --quiet nginx; then
    echo "✓ Nginx 运行正常"
else
    echo "✗ Nginx 未运行"
    systemctl status nginx --no-pager
fi

# 测试 API
echo ""
echo "测试 API 端点..."
if curl -s http://localhost:5002/health > /dev/null; then
    echo "✓ 后端 API 响应正常"
else
    echo "✗ 后端 API 无响应"
fi

# 测试前端
if curl -s http://localhost:8081/health > /dev/null; then
    echo "✓ 前端访问正常"
else
    echo "✗ 前端访问异常"
fi

echo ""
echo "================================"
echo "访问地址："
echo "================================"
echo "前端: http://101.37.238.138:8081"
echo "API:  http://101.37.238.138:8081/api/contact"
echo ""
echo "查看日志："
echo "  后端: journalctl -u tom-portfolio-backend -f"
echo "  Nginx: tail -f /data/tom-portfolio/logs/nginx-access.log"
echo ""
