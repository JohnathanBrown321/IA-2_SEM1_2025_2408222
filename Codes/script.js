/* ===================================================
   USER REGISTRATION & LOGIN
   =================================================== */
function registerUser() {
    const name = document.getElementById("name")?.value.trim();
    const dob = document.getElementById("dob")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const username = document.getElementById("username")?.value.trim();
    const password = document.getElementById("password")?.value.trim();

    if (!name || !dob || !email || !username || !password) {
        alert("All fields are required!");
        return;
    }

    const user = { name, dob, email, username, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("Registration successful!");
    window.location.href = "Login.html";
}

function loginUser() {
    const username = document.getElementById("Username")?.value.trim();
    const password = document.getElementById("Password")?.value.trim();

    const savedUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (!savedUser) {
        alert("No registered account found.");
        return;
    }

    if (savedUser.username === username && savedUser.password === password) {
        alert("Login successful!");
        window.location.href = "Products.html";
    } else {
        alert("Incorrect username or password.");
    }
}

/* ===================================================
   PRODUCT PRICES
   =================================================== */
const Product1 = 25.00;
const Product2 = 10.00;
const Product3 = 15.00;

function displayProductPrices() {
    const priceElements = document.querySelectorAll(".price");
    if (priceElements.length > 0) {
        document.querySelector("#Product1 .price").innerText = "Cost: $" + Product1.toFixed(2);
        document.querySelector("#Product2 .price").innerText = "Cost: $" + Product2.toFixed(2);
        document.querySelector("#Product3 .price").innerText = "Cost: $" + Product3.toFixed(2);
    }
}

/* ===================================================
   CART SYSTEM
   =================================================== */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
}

function addToCart(productId, name, price) {
    const existing = cart.find(item => item.id === productId);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id: productId, name: name, price: price, quantity: 1 });
    }

    saveCart();
    alert(`${name} added to cart!`);
}

function displayCart() {
    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    if (!cartItems || !cartTotal) return;

    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartItems.innerHTML += `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)} each</p>
                <p>Quantity:
                    <button onclick="changeQty(${index}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${index}, 1)">+</button>
                </p>
                <p>Total: $${itemTotal.toFixed(2)}</p>
                <button onclick="removeItem(${index})">Remove</button>
                <hr>
            </div>
        `;
    });

    cartTotal.textContent = total.toFixed(2);
}

function changeQty(index, amount) {
    cart[index].quantity += amount;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    saveCart();
    displayCart();
}

function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;
    }
}

/* ===================================================
   CHECKOUT SYSTEM
   =================================================== */
function displayOrderSummary() {
    const orderItems = document.getElementById("order-items");
    const grandTotal = document.getElementById("grand-total");

    if (!orderItems || !grandTotal) return;

    orderItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        orderItems.innerHTML += `
            <div class="order-item">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity} = $${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });

    grandTotal.textContent = total.toFixed(2);
}

function handleCheckout(event) {
    event.preventDefault();
    alert("Order placed successfully! Thank you for shopping with Bored Games.");
    cart = [];
    saveCart();
    window.location.href = "Home.html";
}

/* ===================================================
   INITIALIZATION
   =================================================== */
document.addEventListener("DOMContentLoaded", () => {
    displayProductPrices();
    displayCart();
    displayOrderSummary();
    updateCartCount();

    const checkoutForm = document.getElementById("checkout-form");
    if (checkoutForm) {
        checkoutForm.addEventListener("submit", handleCheckout);
    }
});
