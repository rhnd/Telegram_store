// Initialize Telegram WebApp
const tg = window.Telegram.WebApp;
tg.expand(); // Expand app to full height

// Translations object
const translations = {
    en: {
        // Header
        "store-title": "🛍️ Premium Store",
        "store-subtitle": "Your trusted online shopping destination",
        
        // Hero
        "hero-title": "Discover Amazing Products",
        "hero-subtitle": "Quality products at competitive prices",
        
        // Products
        "product-smartphone-title": "Smartphone Pro",
        "product-smartphone-desc": "Latest smartphone with advanced features",
        "product-laptop-title": "Laptop Elite",
        "product-laptop-desc": "High-performance laptop for professionals",
        "product-headphones-title": "Wireless Headphones",
        "product-headphones-desc": "Premium sound quality with noise cancellation",
        "product-watch-title": "Smart Watch",
        "product-watch-desc": "Track your fitness and stay connected",
        "product-camera-title": "Digital Camera",
        "product-camera-desc": "Capture life's moments in stunning detail",
        "product-console-title": "Gaming Console",
        "product-console-desc": "Next-gen gaming experience at home",
        
        // UI Elements
        "quantity-label": "Quantity:",
        "add-to-cart": "Add to Cart",
        
        // Footer
        "footer-copyright": "© 2024 Premium Store. All rights reserved.",
        "footer-services": "Secure payments • Fast delivery • 24/7 support",
        
        // Messages
        "invalid-quantity": "Please enter a valid quantity!",
        "no-user": "Cannot detect Telegram user!",
        "order-success": "✅ Order placed successfully!",
        "order-failed": "❌ Order failed:",
        "connection-error": "❌ Could not connect to backend!",
        "processing": "Processing..."
    },
    ar: {
        "store-title": "🛍️ متجر مميز",
        "store-subtitle": "وجهتك الموثوقة للتسوق عبر الإنترنت",
        "hero-title": "اكتشف منتجات مذهلة",
        "hero-subtitle": "منتجات عالية الجودة بأسعار تنافسية",
        "product-smartphone-title": "هاتف ذكي Pro",
        "product-smartphone-desc": "أحدث هاتف ذكي مع ميزات متقدمة",
        "product-laptop-title": "لابتوب Elite",
        "product-laptop-desc": "لابتوب عالي الأداء للمحترفين",
        "product-headphones-title": "سماعات لاسلكية",
        "product-headphones-desc": "جودة صوت مميزة مع إلغاء الضوضاء",
        "product-watch-title": "ساعة ذكية",
        "product-watch-desc": "تتبع لياقتك البدنية وابق على اتصال",
        "product-camera-title": "كاميرا رقمية",
        "product-camera-desc": "التقط لحظات الحياة بتفاصيل مذهلة",
        "product-console-title": "جهاز ألعاب",
        "product-console-desc": "تجربة ألعاب الجيل التالي في المنزل",
        "quantity-label": "الكمية:",
        "add-to-cart": "أضف إلى السلة",
        "footer-copyright": "© 2024 متجر مميز. جميع الحقوق محفوظة.",
        "footer-services": "مدفوعات آمنة • توصيل سريع • دعم 24/7",
        "invalid-quantity": "يرجى إدخال كمية صحيحة!",
        "no-user": "لا يمكن اكتشاف مستخدم Telegram!",
        "order-success": "✅ تم تقديم الطلب بنجاح!",
        "order-failed": "❌ فشل الطلب:",
        "connection-error": "❌ لا يمكن الاتصال بالخادم!",
        "processing": "جارٍ المعالجة..."
    }
};

// Current language
let currentLanguage = 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Try to get saved language from localStorage
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && translations[savedLanguage]) {
        currentLanguage = savedLanguage;
    } else {
        // Try to detect browser language
        const browserLang = navigator.language.split('-')[0];
        if (translations[browserLang]) {
            currentLanguage = browserLang;
        }
    }
    
    // Set language selector
    const selectElement = document.getElementById('language-select');
    if (selectElement) {
        selectElement.value = currentLanguage;
        
        // Add event listener for language change
        selectElement.addEventListener('change', changeLanguage);
    }
    
    // Set document direction for RTL languages
    const rtlLanguages = ['ar'];
    document.documentElement.dir = rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr';
    
    // Apply translations
    updateLanguage();
});

// Change language function
function changeLanguage() {
    const select = document.getElementById('language-select');
    if (select) {
        const newLang = select.value;
        if (newLang !== currentLanguage) {
            currentLanguage = newLang;
            
            // Save to localStorage
            localStorage.setItem('selectedLanguage', currentLanguage);
            
            // Set document direction for RTL languages
            const rtlLanguages = ['ar'];
            document.documentElement.dir = rtlLanguages.includes(currentLanguage) ? 'rtl' : 'ltr';
            
            // Update all text
            updateLanguage();
            
            // Show confirmation
            alert('Language changed to: ' + (currentLanguage === 'ar' ? 'العربية' : 'English'));
        }
    }
}

// Get translation for a specific key
function getTranslation(key) {
    if (translations[currentLanguage] && translations[currentLanguage][key]) {
        return translations[currentLanguage][key];
    }
    return translations['en'][key] || key; // Fallback to English or return key
}

// Update all text elements with translations
function updateLanguage() {
    const elements = document.querySelectorAll('[data-i18n]');
    console.log('Found', elements.length, 'elements to translate');
    
    elements.forEach((element, index) => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage] && translations[currentLanguage][key]) {
            const oldText = element.textContent;
            const newText = translations[currentLanguage][key];
            element.textContent = newText;
            console.log(`Element ${index}: "${key}" changed from "${oldText}" to "${newText}"`);
        } else {
            console.log(`Translation missing for key: ${key} in language: ${currentLanguage}`);
        }
    });
}

// Function called by each product button
async function placeOrder(productName, qtyInputId, price) {
    // Get quantity value
    const qtyInput = document.getElementById(qtyInputId);
    const quantity = parseInt(qtyInput.value);

    if (!quantity || quantity <= 0) {
        showNotification(translations[currentLanguage]["invalid-quantity"], "error");
        return;
    }

    // Telegram user data
    const user = tg.initDataUnsafe.user;
    const telegramUserId = user ? user.id : null;
    const userName = user ? user.first_name + (user.last_name ? ' ' + user.last_name : '') : 'Unknown User';

    if (!telegramUserId) {
        showNotification(translations[currentLanguage]["no-user"], "error");
        return;
    }

    // Calculate total price
    const totalPrice = price * quantity;

    // Build order object
    const orderData = {
        user_id: telegramUserId,
        name: userName,
        product_name: `${productName} (x${quantity})`,
        price: totalPrice
    };

    // Show loading state
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = translations[currentLanguage]["processing"];
    button.disabled = true;

    try {
        // Send order to backend
        const response = await fetch("/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderData)
        });

        if (response.ok) {
            showNotification(translations[currentLanguage]["order-success"], "success");
            // Optional: close the Mini App after successful order
            setTimeout(() => {
                tg.close();
            }, 2000);
        } else {
            const data = await response.json();
            showNotification(translations[currentLanguage]["order-failed"] + " " + (data.detail || "Unknown error"), "error");
        }
    } catch (error) {
        console.error("Error sending order:", error);
        showNotification(translations[currentLanguage]["connection-error"], "error");
    } finally {
        // Reset button state
        button.textContent = originalText;
        button.disabled = false;
    }
}

// Notification system
function showNotification(message, type = "info") {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        padding: '15px 25px',
        borderRadius: '10px',
        color: 'white',
        fontWeight: '500',
        fontSize: '1rem',
        zIndex: '1000',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        animation: 'slideDown 0.3s ease-out'
    });

    // Set background color based on type
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e74c3c';
    } else {
        notification.style.backgroundColor = '#3498db';
    }

    // Add to body
    document.body.appendChild(notification);

    // Auto remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 4000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
    }
    @keyframes slideUp {
        from {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        to {
            transform: translateX(-50%) translateY(-100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Handle case when not in Telegram (for testing)
if (!tg.initDataUnsafe.user) {
    console.log('Not in Telegram, using fake user data for testing.');
    // For testing purposes, you can set fake user data here
    // tg.initDataUnsafe.user = { id: 123456789, first_name: 'Test', last_name: 'User' };
}