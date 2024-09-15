let searchForm = document.querySelector('.search-form')
document.querySelector('#search-btn').onclick = () =>
{
    searchForm.classList.toggle('active');
    
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let shoppingCart = document.querySelector('.shopping-cart')
document.querySelector('#cart-btn').onclick = () =>
{
    shoppingCart.classList.toggle('active');

    searchForm.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

let loginForm = document.querySelector('.login-form')
document.querySelector('#login-btn').onclick = () =>
{
    loginForm.classList.toggle('active');

    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar')
document.querySelector('#menu-btn').onclick = () =>
{
    navbar.classList.toggle('active');

    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
}

window.onscroll = () =>
{
    searchForm.classList.remove('active');
    shoppingCart.classList.remove('active');
    loginForm.classList.remove('active');
    navbar.classList.remove('active');
}

// Get all the "Add to Cart" buttons
var addToCartButtons = document.querySelectorAll('.box .btn');

// Add event listener to each button
addToCartButtons.forEach(function(button) {
  button.addEventListener('click', addToCart);
});

// Function to handle the "Add to Cart" button click
function addToCart(event) {
  event.preventDefault();
  var productBox = this.closest('.box');
  var productName = productBox.querySelector('h1').textContent;
  var productPrice = productBox.querySelector('.price').textContent;

  // Create a new cart item
  var cartItem = document.createElement('div');
  cartItem.classList.add('box');
  cartItem.innerHTML = `
    <i class="fa fa-trash"></i>
    <img src="${productBox.querySelector('img').src}">
    <div class="content">
      <h3>${productName}</h3>
      <span class="price">${productPrice}</span>
      <span class="quantity">Qty : 1</span>
    </div>
  `;

  // Add the new cart item to the shopping cart
  var shoppingCart = document.querySelector('.shopping-cart');
  shoppingCart.insertBefore(cartItem, shoppingCart.firstChild);

  // Update the total price in the shopping cart
  updateTotalPrice();

  // Clear the input fields
  this.blur();

  // Add event listener to the trash icon
  var emptyCartMessage = document.getElementById('empty-cart-message');
  var trashIcon = cartItem.querySelector('.fa-trash');
  trashIcon.addEventListener('click', removeCartItem);
  emptyCartMessage.style.display = 'none';
  saveCartData();
}


function removeCartItem(event) {
  var cartItem = this.closest('.box');
  cartItem.remove();

  // Update the total price in the shopping cart
  updateTotalPrice();

  // If no items left in the cart, show "Cart is empty" message
  var cartItems = document.querySelectorAll('.shopping-cart .box');
  if (cartItems.length === 0) {
    var emptyCartMessage = document.querySelector('.shopping-cart .empty-cart');
    emptyCartMessage.style.display = 'block';
  }
  saveCartData();
}

// Function to update the total price in the shopping cart
function updateTotalPrice() {
  var total = 0;
  var cartItems = document.querySelectorAll('.shopping-cart .box');

  cartItems.forEach(function(item) {
    var priceText = item.querySelector('.price').textContent;
    var price = parseFloat(priceText);
    total += price;
  });

  var totalPriceElement = document.querySelector('.shopping-cart .total');
  totalPriceElement.textContent = 'Total : ' + total.toFixed(2) + ' AED/';
  saveCartData();
}

function saveCartData() {
  var cartItems = document.querySelectorAll('.shopping-cart .box');
  var cartData = [];

  cartItems.forEach(function(item) {
    var productName = item.querySelector('h3').textContent;
    var productPrice = item.querySelector('.price').textContent;
    var productImage = item.querySelector('img').src;

    cartData.push({
      name: productName,
      price: productPrice,
      image: productImage
    });
  });

  localStorage.setItem('cart', JSON.stringify(cartData));
}

// Function to load cart data from local storage and display the items in the cart
function loadCartData() {
  var cartData = localStorage.getItem('cart');
  var shoppingCart = document.querySelector('.shopping-cart .cart-items');
  var emptyCartMessage = document.getElementById('empty-cart-message');

  // Clear any existing cart items
  shoppingCart.innerHTML = '';

  if (cartData) {
    cartData = JSON.parse(cartData);

    cartData.forEach(function(item) {
      var cartItem = document.createElement('div');
      cartItem.classList.add('box');
      cartItem.innerHTML = `
        <i class="fa fa-trash"></i>
        <img src="${item.image}">
        <div class="content">
          <h3>${item.name}</h3>
          <span class="price">${item.price}</span>
          <span class="quantity">Qty : 1</span>
        </div>
      `;

      // Add event listener to the trash icon
      var trashIcon = cartItem.querySelector('.fa-trash');
      trashIcon.addEventListener('click', removeCartItem);

      shoppingCart.appendChild(cartItem);
    });

    // Update the total price in the shopping cart
    updateTotalPrice();

    // Hide the "Cart is empty" message
    emptyCartMessage.style.display = 'none';
  } else {
    // Show the "Cart is empty" message if there are no cart items
    emptyCartMessage.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', function() {
  var cartData = localStorage.getItem('cart');
  var emptyCartMessage = document.getElementById('empty-cart-message');

  if (!cartData || JSON.parse(cartData).length === 0) {
    emptyCartMessage.style.display = 'block';
  } else {
    emptyCartMessage.style.display = 'none';
    loadCartData();
  }
});


// coding for MAP

var map = L.map('map').setView([24.360039, 54.509435], 15);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

var marker = L.marker([24.360039, 54.509435]).addTo(map);

$(document).ready(function() {
    var mapSection = $(".map-section");
    var mapOverlay = $(".map-overlay");
    var map = $("#map");

    // Function to remove the fading effect
    function removeFadingEffect() {
      map.css("opacity", "1"); // Set the map opacity to fully visible
      mapOverlay.css("pointer-events", "none"); // Enable mouse events on the map
    }

    // Function to apply the fading effect
    function applyFadingEffect() {
      map.css("opacity", "0.3"); // Set the map opacity to create the fading effect
      mapOverlay.css("pointer-events", "auto"); // Disable mouse events on the map
    }

    // Add mouseenter and mouseleave event listeners to the map section
    mapSection.mouseenter(function() {
      removeFadingEffect(); // Remove the fading effect on mouse enter
    });

    mapSection.mouseleave(function() {
      applyFadingEffect(); // Apply the fading effect on mouse leave
    });
  });