@echo off
REM Push to GitHub Script
echo 🚀 Pushing your Telegram Store to GitHub
echo.

echo IMPORTANT: First create a GitHub repository at https://github.com/new
echo Repository name: Telegram_store
echo Make it Public
echo DO NOT check "Add a README file"
echo.

echo After creating the repository, copy the URL and paste it below:
echo (It should look like: https://github.com/YOUR_USERNAME/Telegram_store.git)
echo.

set /p repo_url="Paste your GitHub repository URL: https://github.com/rhnd/Telegram_store"

echo.
echo Setting up remote origin...
& "C:\Program Files\Git\bin\git.exe" remote add origin %repo_url%

echo.
echo Setting main branch...
& "C:\Program Files\Git\bin\git.exe" branch -M main

echo.
echo Pushing to GitHub...
& "C:\Program Files\Git\bin\git.exe" push -u origin main

echo.
echo ✅ Success! Your code is now on GitHub.
echo.
echo Next: Deploy to Railway at https://railway.app
echo.
pause