#!/bin/bash

# ==========================================
# 一键部署脚本 - 大树路跑跑个人网站
# 用法：./deploy.sh "提交信息"
# ==========================================

PROJECT_DIR="/Users/tommmmmmmm/Desktop/Claude Code/tom-portfolio"
SERVER_IP="101.37.238.138"
SSH_PASS="yxiE6*A\$s7LJ,Af"

# 检查是否提供了提交信息
if [ -z "$1" ]; then
    echo "❌ 请提供提交信息"
    echo "用法: ./deploy.sh \"你的提交信息\""
    exit 1
fi

COMMIT_MSG="$1"

echo "🚀 开始部署..."
echo ""

# 步骤1：进入项目目录
cd "$PROJECT_DIR" || exit 1
echo "✅ 1. 进入项目目录"

# 步骤2：添加变更到 git
echo "📝 2. 添加文件到 git..."
git add .

# 步骤3：提交
echo "💾 3. 提交变更..."
git commit -m "$COMMIT_MSG"

# 步骤4：推送到 GitHub
echo "⬆️  4. 推送到 GitHub..."
git push origin main

# 步骤5：更新服务器
echo "🖥️  5. 更新服务器..."
sshpass -p "$SSH_PASS" ssh -o StrictHostKeyChecking=no root@$SERVER_IP \
    "cd /data/tom-portfolio/app && git pull origin main"

echo ""
echo "✨ 部署完成！"
echo "🌐 访问地址: http://$SERVER_IP:8081"
