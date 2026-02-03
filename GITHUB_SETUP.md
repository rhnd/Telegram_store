# GitHub Repository Setup Guide

## Step 1: Install Git
If Git is not installed, download it from: https://git-scm.com/download/win

## Step 2: Create GitHub Repository
1. Go to: https://github.com/new
2. Repository name: `Telegram_store`
3. Make it **Public**
4. **DO NOT** check "Add a README file"
5. Click **"Create repository"**
6. Copy the repository URL (it looks like: `https://github.com/YOUR_USERNAME/Telegram_store.git`)

## Step 3: Setup Local Git Repository
Open Command Prompt or PowerShell in your project folder:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Futuristic 3D Telegram Mini App Store"

# Set main branch
git branch -M main

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/Telegram_store.git

# Push to GitHub
git push -u origin main
```

## Step 4: Deploy to Railway
1. Go to: https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project"
4. Choose "Deploy from GitHub repo"
5. Select your `Telegram_store` repository
6. Click "Deploy"

## Step 5: Update Configuration
After Railway deploys, copy the URL and update `config.py`:
```python
WEB_APP_URL = "https://your-app-name.up.railway.app"
```

## Step 6: Test Your Mini App
1. Restart your bot: `python bot.py`
2. Send `/start` to your bot
3. Click "🛒 Open Store"
4. Enjoy your live Mini App! 🎉

## Troubleshooting
- If `git push` asks for credentials, use your GitHub username and Personal Access Token
- Create a Personal Access Token at: https://github.com/settings/tokens