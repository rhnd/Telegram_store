#!/usr/bin/env python3
"""
Test script for admin notifications
Run this to test if the admin notification system works
"""

import requests
import json

# Test order data
test_order = {
    "user_id": "123456789",
    "name": "Test Customer",
    "product_name": "Test Product",
    "price": "$99.99"
}

def test_admin_notification():
    try:
        # Send test order to the backend
        url = "http://localhost:8001/order"
        headers = {"Content-Type": "application/json"}

        print("Sending test order...")
        response = requests.post(url, json=test_order, headers=headers)

        if response.status_code == 200:
            result = response.json()
            if result.get("status") == "success":
                print("✅ Order submitted successfully!")
                print("📢 Admin notification should have been sent (check your Telegram)")
                print("💾 Order saved to database")
            else:
                print("❌ Order submission failed:", result)
        else:
            print(f"❌ HTTP Error {response.status_code}: {response.text}")

    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Make sure the server is running on http://localhost:8000")
    except Exception as e:
        print(f"❌ Error: {str(e)}")

if __name__ == "__main__":
    print("🧪 Testing Admin Notification System")
    print("=" * 40)
    test_admin_notification()