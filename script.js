
/* =================================
   VOICES FOR - JAVASCRIPT
================================= */

// PRODUCT DATABASE

const products = [
    {
        id: 1,
        name: "Olive Branch",
        category: "prints",
        price: 25,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700",
        tag: "BESTSELLER"
    },
    {
        id: 2,
        name: "Heritage in Colour",
        category: "prints",
        price: 30,
        image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=700",
        tag: "NEW"
    },
    {
        id: 3,
        name: "Palestinian Stories",
        category: "cards",
        price: 15,
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=700",
        tag: "HANDMADE"
    },
    {
        id: 4,
        name: "Creative Forms",
        category: "stationery",
        price: 18,
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=700",
        tag: ""
    },
    {
        id: 5,
        name: "A Place Called Home",
        category: "prints",
        price: 28,
        image: "https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?w=700",
        tag: ""
    },
    {
        id: 6,
        name: "Little Messages",
        category: "cards",
        price: 12,
        image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700",
        tag: ""
    },
    {
        id: 7,
        name: "Art & Memory",
        category: "prints",
        price: 35,
        image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=700",
        tag: "LIMITED"
    },
    {
        id: 8,
        name: "Everyday Creativity",
        category: "stationery",
        price: 20,
        image: "https://images.unsplash.com/photo-1577083288073-40892c0860a4?w=700",
        tag: ""
    }
];


// CART DATABASE

let cart = [];

let activeCategory = "all";


// SELECT HTML ELEMENTS

const productGrid = document.getElementById("product-grid");

const cartCount = document.getElementById("cart-count");

const cartPanel = document.getElementById("cart-panel");

const cartOverlay = document.getElementById("cart-overlay");

const cartItems = document.getElementById("cart-items");

const cartTotal = document.getElementById("cart-total");

const sortSelect = document.getElementById("sort-products");


// DISPLAY PRODUCTS

function displayProducts() {

    let filteredProducts = [...products];

    // CATEGORY FILTER

    if (activeCategory !== "all") {

        filteredProducts = filteredProducts.filter(product =>
            product.category === activeCategory
        );

    }

    // SORT PRODUCTS

    const sortValue = sortSelect.value;

    if (sortValue === "low") {

        filteredProducts.sort((a, b) => a.price - b.price);

    } else if (sortValue === "high") {

        filteredProducts.sort((a, b) => b.price - a.price);

    } else if (sortValue === "az") {

        filteredProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
        );

    }

    // EMPTY CATEGORY

    if (filteredProducts.length === 0) {

        productGrid.innerHTML = "<p>No products found.</p>";

        return;

    }

    // GENERATE PRODUCT CARDS

    productGrid.innerHTML = filteredProducts.map(product => `

        <article class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    loading="lazy"
                >

                ${product.tag ? `
                    <span class="product-tag">
                        ${product.tag}
                    </span>
                ` : ""}

            </div>

            <div class="product-info">

                <h3>${product.name}</h3>

                <p>€${product.price.toFixed(2)}</p>

                <button
                    class="add-button"
                    data-product-id="${product.id}"
                >
                    ADD TO BAG +
                </button>

            </div>

        </article>

    `).join("");

}


// CATEGORY FILTERS

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        activeCategory = button.dataset.filter;

        displayProducts();

    });

});


// SORTING

sortSelect.addEventListener("change", displayProducts);


// ADD TO CART

productGrid.addEventListener("click", event => {

    const button = event.target.closest(".add-button");

    if (!button) return;

    const productId = Number(button.dataset.productId);

    const product = products.find(item => item.id === productId);

    if (!product) return;

    cart.push(product);

    updateCart();

    button.textContent = "ADDED ✓";

    setTimeout(() => {

        button.textContent = "ADD TO BAG +";

    }, 1200);

});


// UPDATE CART

function updateCart() {

    // NUMBER OF ITEMS

    cartCount.textContent = cart.length;

    // EMPTY CART

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your bag is empty.</p>";

    } else {

        cartItems.innerHTML = cart.map((product, index) => `

            <div class="cart-item">

                <span>
                    ${product.name}
                    <br>
                    €${product.price.toFixed(2)}
                </span>

                <button
                    class="remove-item"
                    data-index="${index}"
                    aria-label="Remove ${product.name}"
                >
                    ×
                </button>

            </div>

        `).join("");

    }

    // CALCULATE TOTAL

    const total = cart.reduce((sum, product) => {

        return sum + product.price;

    }, 0);

    cartTotal.textContent = "€" + total.toFixed(2);

}


// REMOVE CART ITEM

cartItems.addEventListener("click", event => {

    const button = event.target.closest(".remove-item");

    if (!button) return;

    const index = Number(button.dataset.index);

    cart.splice(index, 1);

    updateCart();

});


// OPEN CART

function openCart() {

    cartPanel.classList.add("open");

    cartOverlay.classList.add("open");

    document.body.style.overflow = "hidden";

}


// CLOSE CART

function closeCart() {

    cartPanel.classList.remove("open");

    cartOverlay.classList.remove("open");

    document.body.style.overflow = "";

}


// CART BUTTONS

document.getElementById("cart-open").addEventListener("click", openCart);

document.getElementById("cart-close").addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


// MOBILE NAVIGATION

const menuToggle = document.getElementById("menu-toggle");

const navigation = document.getElementById("navigation");

menuToggle.addEventListener("click", () => {

    navigation.classList.toggle("open");

    menuToggle.textContent =
        navigation.classList.contains("open") ? "×" : "☰";

});




navigation.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", () => {

        navigation.classList.remove("open");

        menuToggle.textContent = "☰";

    });

});


// NEWSLETTER DEMO

const newsletterForm = document.getElementById("newsletter-form");

newsletterForm.addEventListener("submit", event => {

    event.preventDefault();

    const message = document.getElementById("newsletter-message");

    message.textContent =
        "Thank you for your interest! Newsletter registration needs to be connected.";

    newsletterForm.reset();

});


// CHECKOUT DEMO

document.getElementById("checkout").addEventListener("click", () => {

    const message = document.getElementById("cart-message");

    if (cart.length === 0) {

        message.textContent = "Your bag is empty.";

    } else {

        message.textContent =
            "Your cart is ready. Connect a payment provider to enable checkout.";

    }

});




displayProducts();

updateCart();
