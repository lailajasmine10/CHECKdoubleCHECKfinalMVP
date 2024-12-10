// Initialize the cart from localStorage or create an empty one
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update localStorage with the current cart
function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Cart updated:', cart);

    // Update cart count in the header
    const cartCountElement = document.querySelector('.header-cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalItems;

    // Update cart table on the cart page
    const cartWrapper = document.getElementById('cart-product');
    if (cartWrapper) {
        cartWrapper.innerHTML = '';
        cart.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="product-thumbnail"><img src="img/sample-product.jpg" alt="${item.name}" /></td>
                <td class="product-name">${item.name}</td>
                <td class="product-price">$${item.price.toFixed(2)}</td>
                <td class="product-quantity">${item.quantity}</td>
                <td class="product-subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            cartWrapper.appendChild(row);
        });
    }
}

// Function to add product to the cart
function addToCart(quantity) {
    // Example product object. Replace with dynamic product data as needed.
    const product = {
        id: 1, // Replace with a unique identifier for the product
        name: 'Sample Product', // Replace with product name
        price: 29.99, // Replace with product price
        quantity: quantity,
    };

    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
        // If the product exists, update the quantity
        cart[existingProductIndex].quantity += quantity;
    } else {
        // If the product does not exist, add it to the cart
        cart.push(product);
    }

    // Update the cart in localStorage
    updateCart();

    alert(`${quantity} item(s) added to the cart!`);
}

// Attach an event listener to the Add to Cart button
document.getElementById('add-to-cart').addEventListener('click', function () {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);

    if (isNaN(quantity) || quantity < 1) {
        alert('Please enter a valid quantity.');
        return;
    }

    addToCart(quantity);
});

// Initialize cart display on page load
updateCart();
