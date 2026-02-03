from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from database import save_order
import requests
import os
from config import BOT_TOKEN, ADMIN_CHAT_ID

app = FastAPI()

# Serve static folder
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates folder
templates = Jinja2Templates(directory="templates")

# Function to send message to admin
async def send_admin_notification(user_name: str, product_name: str, price: str, telegram_user_id: str):
    try:
        # Skip if admin chat ID is not configured
        if ADMIN_CHAT_ID == "YOUR_ADMIN_CHAT_ID_HERE" or not ADMIN_CHAT_ID:
            print("Admin notification skipped: ADMIN_CHAT_ID not configured")
            return

        message = f"""
🛒 **New Order Received!**

👤 **Customer:** {user_name}
🆔 **User ID:** {telegram_user_id}
📦 **Product:** {product_name}
💰 **Price:** {price}

Please process this order as soon as possible!
"""

        url = f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage"
        data = {
            "chat_id": ADMIN_CHAT_ID,
            "text": message,
            "parse_mode": "Markdown"
        }

        response = requests.post(url, data=data)
        if response.status_code == 200:
            print(f"Admin notification sent successfully for order: {user_name} - {product_name}")
        else:
            print(f"Failed to send admin notification: {response.text}")

    except Exception as e:
        print(f"Error sending admin notification: {str(e)}")

# Home route → Mini App
@app.get("/")
async def home(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

# Order route
@app.post("/order")
async def create_order(order: dict):
    telegram_user_id = order.get("user_id")
    user_name = order.get("name")
    product_name = order.get("product_name")
    price = order.get("price")

    if not all([telegram_user_id, user_name, product_name, price]):
        return JSONResponse(content={"status": "error", "detail": "Missing required fields"})

    # Clean price (remove $ and convert to float)
    try:
        if isinstance(price, str) and price.startswith('$'):
            price_clean = float(price[1:])
        else:
            price_clean = float(price)
    except (ValueError, TypeError):
        return JSONResponse(content={"status": "error", "detail": "Invalid price format"})

    # Save order to the database
    save_order(telegram_user_id, user_name, product_name, price_clean)

    # Send notification to admin (run in background to not block response)
    import asyncio
    asyncio.create_task(send_admin_notification(user_name, product_name, price, telegram_user_id))

    return JSONResponse(content={"status": "success"})