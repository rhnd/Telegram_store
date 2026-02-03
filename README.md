# Telegram Mini App Store

A futuristic 3D styled online store built as a Telegram Mini App with admin notifications.

## 🌐 Deployment Options (Since ngrok is blocked in Iraq)

### Option 1: Railway (Recommended - Free & Global)
Railway is a great alternative that works worldwide and offers a free tier.

#### Quick Deploy:
1. **Go to:** https://railway.app
2. **Sign up/Login** with GitHub
3. **Click "New Project"**
4. **Choose "Deploy from GitHub repo"**
5. **Connect your GitHub** and select this repository
6. **Deploy!**

#### After Deployment:
1. Copy the Railway URL (looks like: `https://your-app-name.up.railway.app`)
2. Update `config.py`:
   ```python
   WEB_APP_URL = "https://your-app-name.up.railway.app"
   ```
3. Your Mini App is now live globally! 🌍

### Option 2: Cloudflare Tunnel (Alternative)
If Railway doesn't work, try Cloudflare Tunnel:

```bash
# Download and login
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe -o cloudflared.exe
.\cloudflared.exe tunnel login

# Create and run tunnel
.\cloudflared.exe tunnel create my-tunnel
.\cloudflared.exe tunnel route dns my-tunnel your-subdomain
.\cloudflared.exe tunnel run my-tunnel
```

### Option 3: Local Testing Only
For testing on your local network:

```python
# In config.py
WEB_APP_URL = "http://192.168.56.1:8000"  # Your local IP
```
⚠️ **Note:** Telegram requires HTTPS, so this only works for local testing.

## Features

- 🎨 Futuristic 3D design with glassmorphism effects
- 🌐 Multi-language support (English/Arabic)
- 📱 Responsive design for all devices
- 🤖 Telegram Mini App integration
- 📊 SQLite database for order storage
- 📢 Real-time admin notifications via Telegram

## Setup Instructions

### 1. Configure Admin Notifications

To receive order notifications, you need to set your Telegram chat ID:

1. **Get your Chat ID:**
   - Start a chat with [@userinfobot](https://t.me/userinfobot)
   - Send `/start` to get your chat ID
   - Copy the ID number

2. **Update Configuration:**
   - Open `config.py`
   - Replace `YOUR_ADMIN_CHAT_ID_HERE` with your actual chat ID
   - Example: `ADMIN_CHAT_ID = "123456789"`

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the Application

**Option 1: Run both bot and web server**
```bash
# Terminal 1: Run the bot
python bot.py

# Terminal 2: Run the web server
python -m uvicorn backend:app --host 0.0.0.0 --port 8000 --reload
```

**Option 2: Use the provided run script**
```bash
# For Windows
run.bat

# For Linux/Mac
./run.sh
```

### 4. Access the Store

- **Web Interface:** http://localhost:8000
- **Telegram Bot:** Search for your bot and send `/start`

## How It Works

1. **Customer Experience:**
   - User clicks "🛒 Open Store" in Telegram
   - Mini App opens with futuristic 3D interface
   - User selects products and places orders
   - Orders are saved to database

2. **Admin Notifications:**
   - When an order is placed, the system automatically sends a formatted message to the admin
   - Message includes customer name, product, price, and user ID
   - Admin can process orders in real-time

## Configuration Files

- `config.py` - Bot token, web app URL, and admin chat ID
- `requirements.txt` - Python dependencies
- `database.py` - SQLite database operations
- `backend.py` - FastAPI web server
- `bot.py` - Telegram bot handler

## Technologies Used

- **Backend:** FastAPI, Uvicorn
- **Database:** SQLite
- **Frontend:** HTML, CSS, JavaScript
- **Bot:** aiogram (Telegram Bot API)
- **Styling:** Modern CSS with 3D effects and animations

## Customization

- **Products:** Edit `templates/index.html` to add/modify products
- **Styling:** Modify `static/style.css` for custom design
- **Languages:** Update `static/app.js` for additional language support
- **Bot Commands:** Extend `bot.py` for more bot functionality

## Troubleshooting

- **Bot not responding:** Check BOT_TOKEN in `config.py`
- **No admin notifications:** Verify ADMIN_CHAT_ID is correct
- **Web app not loading:** Ensure the server is running on port 8000
- **Database errors:** Check `database.py` and ensure write permissions

## Support

For issues or questions, check the configuration files and ensure all dependencies are installed correctly.