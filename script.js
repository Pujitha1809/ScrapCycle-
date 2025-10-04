// Global utility functions

// Add to cart functionality
function addToCart(productId) {
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Please login to add items to your cart.');
        window.location.href = 'login.html';
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            productId: productId,
            quantity: 1,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert('Item added to cart!');
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElements = document.querySelectorAll('#cart-count');
    cartCountElements.forEach(element => {
        element.textContent = totalItems;
    });
}

// Check if user is logged in and update UI
function checkAuthStatus() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userLinks = document.querySelectorAll('#user-link');
    
    userLinks.forEach(link => {
        if (currentUser) {
            link.innerHTML = `<i class="fas fa-user"></i> ${currentUser.fullName}`;
            link.href = "#";
            link.onclick = function() {
                if (confirm('Do you want to logout?')) {
                    localStorage.removeItem('currentUser');
                    window.location.reload();
                }
            };
        } else {
            link.innerHTML = '<i class="fas fa-user"></i> Login';
            link.href = "login.html";
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    checkAuthStatus();
    
    // Initialize products if on products page
    if (window.location.pathname.includes('products.html')) {
        initializeProducts();
    }
});

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Initialize sample products
function initializeProducts() {
    const existingProducts = JSON.parse(localStorage.getItem('products'));
    if (!existingProducts || existingProducts.length === 0) {
        const sampleProducts = [
            // Clothes
            { 
                id: 1, 
                name: "Men's Denim Jacket", 
                price: 2199, 
                category: "clothes", 
                condition: "Good", 
                description: "Lightly used denim jacket, size M", 
                image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            },
            { 
                id: 2, 
                name: "Women's Summer Dress", 
                price: 1499, 
                category: "clothes", 
                condition: "Excellent", 
                description: "Floral summer dress, size S", 
                image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: false 
            },
            { 
                id: 3, 
                name: "Kids Winter Coat", 
                price: 1299, 
                category: "clothes", 
                condition: "Good", 
                description: "Warm winter coat for kids, age 5-6", 
                image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            },
            { 
                id: 4, 
                name: "Vintage T-Shirt Collection", 
                price: 2899, 
                category: "clothes", 
                condition: "Fair", 
                description: "Set of 3 vintage band t-shirts", 
                image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: false 
            },
            
            // Furniture
            { 
                id: 5, 
                name: "Wooden Dining Table", 
                price: 9999, 
                category: "furniture", 
                condition: "Good", 
                description: "Solid wood dining table, 6 seats", 
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            },
            { 
                id: 6, 
                name: "Office Chair", 
                price: 3799, 
                category: "furniture", 
                condition: "Excellent", 
                description: "Ergonomic office chair, barely used", 
                image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: false 
            },
            { 
                id: 7, 
                name: "Bookshelf", 
                price: 5499, 
                category: "furniture", 
                condition: "Good", 
                description: "5-shelf wooden bookshelf", 
                image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            },
            { 
                id: 8, 
                name: "Coffee Table", 
                price: 2899, 
                category: "furniture", 
                condition: "Fair", 
                description: "Glass top coffee table", 
                image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: false 
            },
            
            // Tools
            { 
                id: 9, 
                name: "STANLEY Claw Hammer", 
                price: 625, 
                category: "tools", 
                condition: "Excellent", 
                description: "Professional claw hammer with steel shaft", 
                image: "https://images.unsplash.com/photo-1572981779307-38f8b0456222?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            },
            { 
                id: 10, 
                name: "Munix Scissors Set", 
                price: 375, 
                category: "tools", 
                condition: "Good", 
                description: "Assorted scissors for various uses", 
                image: "https://images.unsplash.com/photo-1589578527961-88c5cbed2093?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: false 
            },
            { 
                id: 11, 
                name: "Screwdriver Kit", 
                price: 1079, 
                category: "tools", 
                condition: "Excellent", 
                description: "30-piece magnetic screwdriver set", 
                image: "https://images.unsplash.com/photo-1607039518346-49d2d6c48d89?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
                featured: true 
            }
        ];
        localStorage.setItem('products', JSON.stringify(sampleProducts));
    }
}