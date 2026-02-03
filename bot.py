# Telegram Mini App Store Bot
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
from aiogram.filters import Command
import os
import asyncio
from config import BOT_TOKEN, WEB_APP_URL

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [InlineKeyboardButton(text="🛒 Open Store", web_app=WebAppInfo(url=WEB_APP_URL))]
        ]
    )
    await message.answer("Welcome to the Mini App Store!", reply_markup=keyboard)

async def main():
    print("Bot started...")
    await dp.start_polling(bot)

if __name__ == "__main__":
    asyncio.run(main())