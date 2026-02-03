import sqlite3
from datetime import datetime
import os

# Use Railway's writable temp directory for database
DB_FILE = os.path.join("/tmp", "orders.db")

# Initialize database and table
def init_db():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('''CREATE TABLE IF NOT EXISTS orders (
        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
        telegram_user_id TEXT,
        user_name TEXT,
        product_name TEXT,
        price REAL,
        timestamp TEXT
    )''')
    conn.commit()
    conn.close()

# Save a new order
def save_order(telegram_user_id, user_name, product_name, price):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    timestamp = datetime.now().isoformat()
    cursor.execute('''INSERT INTO orders (telegram_user_id, user_name, product_name, price, timestamp)
                     VALUES (?, ?, ?, ?, ?)''', (telegram_user_id, user_name, product_name, price, timestamp))
    conn.commit()
    conn.close()

# Get all orders (optional)
def get_orders():
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM orders')
    orders = cursor.fetchall()
    conn.close()
    return orders

# Initialize DB automatically
init_db()