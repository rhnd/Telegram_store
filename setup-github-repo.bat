@echo off
REM GitHub Repository Setup Script
echo 🚀 Setting up GitHub Repository for Telegram Store
echo.

echo Step 1: Installing Git...
winget install --id Git.Git -e --source winget
echo Git installation completed!
echo.

echo Step 2: Please create a GitHub repository:
echo 1. Go to: https://github.com/new
echo 2. Repository name: Telegram_store
echo 3. Make it Public
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.

echo Step 3: After creating the repository, copy the repository URL
echo It will look like: https://github.com/YOUR_USERNAME/Telegram_store.git
echo.

echo Step 4: Press any key to continue with Git setup...
pause

echo.
echo Step 5: Initializing Git repository...
git init
git add .
git commit -m "Initial commit: Futuristic 3D Telegram Mini App Store"

echo.
echo Step 6: Please paste your GitHub repository URL here:
echo (Right-click to paste, then press Enter)
set /p repo_url=

echo.
echo Step 7: Pushing to GitHub...
git branch -M main
git remote add origin %repo_url%
git push -u origin main

echo.
echo ✅ Success! Your repository is now on GitHub.
echo 🚂 You can now deploy to Railway!
echo.
echo Next steps:
echo 1. Go to: https://railway.app
echo 2. Connect your GitHub account
echo 3. Deploy from your new repository
echo.
pause