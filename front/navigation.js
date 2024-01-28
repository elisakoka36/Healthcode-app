// Function to add navigation HTML
// Function to update cart count in the navigation
// Global state for cart and products
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.innerText = totalQuantity;
}
function addDataToHTML() {
    // This function should be called with product data to populate the product list
    // Assuming you have a .listProduct element in your HTML to display products
    const listProductHTML = document.querySelector('.listProduct');
    products.forEach(product => {
        const productHTML = `
            <div class="item" data-id="${product.id}">
                <img src="http://127.0.0.1:8000/${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>
            </div>
        `;
        listProductHTML?.insertAdjacentHTML('beforeend', productHTML);
    });
}
function addNavigation() {
    const navigationHtml = `
        <ul> 
            <li><a href="services.html">Services</a></li>
            <li><a href="register.html">Register</a></li>
            <li><a href="login.html">Login</a></li>
            <li id="reservations" style="display: none;"><a href="reservations.html">Reservations</a></li>
            <li id="orders" style="display: none;"><a href="order_history.html">Order history</a></li>
            <li><a href="menu.html">Menu</a></li>
            <li><a href="index.html">Home</a></li>
            <li><a href="add_product.html" id='add_product' style="display: none;" >Add Product</a></li>

            <li><a style="cursor:pointer;" id="logout">Logout</a></li>
            <li class="icon-cart" id='iconCart'>
            <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"/>
            </svg>
            <span id="cartCount">0</span>
        </li>
            <img src="http://127.0.0.1:8000/Healthcode-5.png" alt="Logo" style="width: 55px;">
        </ul>`;


    // Inserting the navigation HTML
    const navigationElement = document.getElementById('navigation-placeholder');
    navigationElement.innerHTML = navigationHtml;
    document.body.insertBefore(navigationElement, document.body.firstChild);

    // Adding CSS for navigation
    const css = `
        ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #333;
        }

        li {
            float: left;
        }

        li a {
            display: block;
            color: white;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
        }

        li a:hover {
            background-color: #111;
        }`;

    // Cart HTML
    const cartHtml = `
        <div class="cartTab">
            <h1>Shopping Cart</h1>
            <div class="listCart">
                <!-- Cart items will be added here -->
            </div>
            <div class="btn">
                <button class="close">CLOSE</button>
                <button id="checkoutButton" class="checkOut">Check Out</button>
            </div>
        </div>`;
    const head = document.head || document.getElementsByTagName('head')[0];
    const style = document.createElement('style');
    // Inserting the cart HTML
    const cartElement = document.createElement('div');
    cartElement.innerHTML = cartHtml;
    document.body.appendChild(cartElement);

    head.appendChild(style);

    style.type = 'text/css';
    if (style.styleSheet){
        // This is required for IE8 and below.
        style.styleSheet.cssText = css;
    } else {
        style.appendChild(document.createTextNode(css));
    }
    // Add event listeners for cart functionality
    const iconCart = document.querySelector('.icon-cart');
    iconCart.addEventListener('click', () => {
        document.body.classList.toggle('showCart');
    });

    const closeCart = document.querySelector('.close');
    closeCart.addEventListener('click', () => {
        document.body.classList.toggle('showCart');
    });
     // Update cart count
     fetchProductsAndRender()
     updateCartCount();
     setupEventListeners();  // Ensure this is called here

      // Attach checkout event listener
    const checkoutButton = document.getElementById('checkoutButton');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', checkout);
    }
}
function checkout() {
    fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('authToken'),
        },
        body: JSON.stringify({ items: cart }),
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        alert('Order placed successfully!');
        cart = [];
        localStorage.removeItem('cart');
        renderCart();
    })
    .catch(error => console.error('Error:', error));
}
function fetchProductsAndRender() {
    fetch('http://127.0.0.1:8000/api/products')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();
        renderCart();
    })
    .catch(error => console.error('Error fetching products:', error));
}

function loadCSS(filename) { 
    const link = document.createElement("link");
    link.href = filename;
    link.type = "text/css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
}

window.addEventListener('DOMContentLoaded', (event) => {
    addNavigation();

    loadCSS('cart.css')
    loadCSS('index.css')
    if(window.location.pathname !=="/menu.html"){
        document.getElementById('iconCart').style.display="none";
    }
    const homeBody = document.getElementById('homeBody');
    if(homeBody){
        document.getElementById('homeBody').style.display='flex';
    }
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
        document.getElementById('reservations').style.display = 'block';
        document.getElementById('orders').style.display = 'block';
        console.log(typeof localStorage.getItem('isAdmin'))
        if(localStorage.getItem('isAdmin')!=='0'){
            document.getElementById('add_product').style.display='block';
        }
    }
        // Add logout button functionality
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('authToken');
        window.location.reload();
    });
});

// Call renderCart whenever there's a change in localStorage
window.addEventListener('storage', (event) => {
    if (event.key === 'cart') {
        renderCart();
    }
});

function addCartToHTML() {
    const listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML = ''; // Clear the cart contents first
    let totalQuantity = 0;

    cart.forEach(item => {
        totalQuantity += item.quantity;
        const product = products.find(p => p.id == item.product_id);
        if (product) {
            const cartItemHTML = `
                <div class="item" data-id="${product.id}">
                    <div class="image">
                        <img src="http://127.0.0.1:8000/${product.image}">
                    </div>
                    <div class="name">
                        ${product.name}
                    </div>
                    <div class="totalPrice">$${product.price * item.quantity}</div>
                    <div class="quantity">
                        <span class="minus">-</span>
                        <span>${item.quantity}</span>
                        <span class="plus">+</span>
                    </div>
                    <button class="removeItem">Remove</button>
                </div>
            `;
            listCartHTML.insertAdjacentHTML('beforeend', cartItemHTML);
        }
    });

    updateCartCount();
}
function updateLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}
function addToCart(productId) {
    // Convert productId to number as dataset values are strings
    const numericProductId = parseInt(productId, 10);

    // Check if product is already in the cart
    let productInCart = cart.find(item => item.product_id === numericProductId);

    if (productInCart) {
        // Increase quantity if product already exists in the cart
        productInCart.quantity++;
    } else {
        // Add new item to cart if not already present
        cart.push({ product_id: numericProductId, quantity: 1 });
    }

    // Update cart in localStorage and re-render
    updateLocalStorage();
    addCartToHTML();
}
function removeFromCart(productId) {
    console.log({productId})
    cart = cart.filter(item => item.product_id.toString() !== productId.toString());
    updateLocalStorage();
    addCartToHTML();
}

// Update the cart whenever there's a change in localStorage
function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCartCount(cart);
    addCartToHTML(cart);
}

function updateQuantity(productId, newQuantity) {
    let productInCart = cart.find(item => item.product_id.toString() === productId.toString());
    if (productInCart) {
        productInCart.quantity = newQuantity;
        if (productInCart.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateLocalStorage();
            addCartToHTML();
        }
    }
}

function setupEventListeners() {
    const listProductHTML = document.querySelector('.listProduct');
    listProductHTML?.addEventListener('click', (event) => {
        if (event.target.classList.contains('addCart')) {
            const productId = event.target.closest('.item').dataset.id;
            addToCart(productId);
        }
    });

    const listCartHTML = document.querySelector('.listCart');
    listCartHTML?.addEventListener('click', (event) => {
        console.log('Event triggered on:', event.target);

        if (event.target.classList.contains('minus') || event.target.classList.contains('plus')) {
            const productId = event.target.closest('.item').dataset.id;
            console.log({productId})
            console.log('Adjusting quantity for product ID:', productId);
            console.log({cart})
            const productInCart = cart.find(item => item.product_id.toString() === productId.toString());
            console.log({productInCart})
            if (productInCart) {
                const newQuantity = event.target.classList.contains('minus') 
                    ? productInCart.quantity - 1 
                    : productInCart.quantity + 1;

                updateQuantity(productId, newQuantity);
            }
        } else if (event.target.classList.contains('removeItem')) {
            const productId = parseInt(event.target.closest('.item').dataset.id);
            console.log('Removing product ID:', productId);
            removeFromCart(productId);
        }
    });
}
