// ----------------- Mobile Navbar -----------------
const menuToggleBtn = document.querySelector(".menu-icon");
const mobileNavbarOverlay = document.querySelector(".mobile-navbar-overlay");
const closeMenuBtn = document.querySelector(".mobile-navbar-overlay img");

// Toggle the sidebar when clicking the icon  
menuToggleBtn.addEventListener("click", () => {
    mobileNavbarOverlay.classList.toggle("-translate-x-full");
});

// Close the sidebar when clicking the close button  
closeMenuBtn.addEventListener("click", () => {
    mobileNavbarOverlay.classList.add("-translate-x-full");
});

// Close the sidebar when clicking outside the menu area (on the overlay)  
mobileNavbarOverlay.addEventListener("click", (e) => {
    if (e.target === mobileNavbarOverlay) {
        mobileNavbarOverlay.classList.add("-translate-x-full");
    }
});




// ----------------- Product Quantity -----------------
const increaseQtyBtn = document.querySelector(".quantity-increase-btn");
const decreaseQtyBtn = document.querySelector(".quantity-decrease-btn");
const productQtyDisplay = decreaseQtyBtn.nextElementSibling;
const addToCartBtn = document.querySelector(".btn-add-to-cart");
const cartCounter = document.querySelector(".cart-counter");

// Increase product quantity when "+" button is clicked
increaseQtyBtn.addEventListener("click", function () {
    productQtyDisplay.innerHTML = parseInt(productQtyDisplay.innerHTML) + 1;
})

// Decrease product quantity when "-" button is clicked
decreaseQtyBtn.addEventListener("click", function () {
    if (productQtyDisplay.innerHTML == 0) {
        // Prevent quantity from going below 0
        productQtyDisplay.innerHTML = 0;
    } else {
        productQtyDisplay.innerHTML = parseInt(productQtyDisplay.innerHTML) - 1;
    }
})

// Add selected quantity to cart when "Add to cart" button is clicked
addToCartBtn.addEventListener("click", function() {
    if (productQtyDisplay.innerHTML == 0) {
        // Do nothing if quantity is 0
        return;
    } else {
        // Increase cart counter by selected quantity
        cartCounter.innerHTML = parseInt(cartCounter.innerHTML) + parseInt(productQtyDisplay.innerHTML);
        
        // Show cart counter if it was hidden
        cartCounter.classList.remove("hidden");
        cartCounter.classList.add("flex");
    }
})





// ----------------- Cart Dropdown -----------------
const cartDropdown = document.querySelector(".cart-dropdown");
const cartIconBtn = document.querySelector(".cart-toggle-btn");
const emptyCartMessage = document.querySelector(".cart-empty-message");
const cartItemsWrapper = document.querySelector(".cart-items-wrapper");
const removeCartItemBtn = document.querySelector(".remove-item-btn");
const cartItemPrice = document.querySelector(".cart-item-price");

// Toggle cart dropdown when cart icon is clicked
cartIconBtn.addEventListener("click", function() {
    if (cartCounter.innerHTML == 0) {
        // Show empty cart dropdown if no items in cart
        cartDropdown.classList.toggle("hidden");
    } else {
        // Hide "empty cart" message and show cart items
        emptyCartMessage.classList.add("hidden");
        cartItemsWrapper.classList.remove("hidden");
        cartDropdown.classList.toggle("hidden");

        // Display item price and quantity inside the cart
        cartItemPrice.innerHTML = `125.00 x ${cartCounter.innerHTML} <span class="cart-total-price text-textPrimary font-bold ml-3"></span>`;

        // Calculate and display total price
        const totalPriceSpan = document.querySelector(".cart-total-price");
        const total = 125 * parseInt(cartCounter.innerHTML);
        totalPriceSpan.innerHTML = `$${total}.00`;
    }
});

// Remove cart item when delete button is clicked
removeCartItemBtn.addEventListener("click", function() {
    // Hide cart items and show "empty cart" message
    cartItemsWrapper.classList.add("hidden");
    emptyCartMessage.classList.remove("hidden");

    // Reset cart counter to 0 and hide the counter badge
    cartCounter.innerHTML = 0;      
    cartCounter.classList.add("hidden");
})

// Close the cart dropdown when clicking outside of it
document.addEventListener("click", (e) => {
    if (!cartDropdown.contains(e.target) && !cartIconBtn.contains(e.target)) {
        cartDropdown.classList.add("hidden");
    }
});



// ----------------- Product Images -----------------
const productGallery = document.querySelector(".product-gallery-overlay");
const productSection = document.querySelector(".product-gallery");

// Initialize product thumbnails 
function initProductThumbnails(section) {

    // Get all thumbnails inside the given section  
    const productThumbnails = section.querySelectorAll(".product-thumbnails img");

    // Get main product image inside the section  
    const mainProductImage = section.querySelector(".product-main-img");

    // Add click event for each thumbnail
    productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener("click", function() {
            // Remove "active" style from all thumbnails
            productThumbnails.forEach(el => el.classList.remove("thumbnail-active"));

            // Add "active" style to the clicked thumbnail  
            thumbnail.classList.add("thumbnail-active");

            // Replace main image src with the clicked thumbnail (remove "-thumbnail")  
            let newSrc = thumbnail.src.replace("-thumbnail", "");
            mainProductImage.src = newSrc;
        });
    });
}

// Run thumbnails initialization for main product section
initProductThumbnails(productSection);

// ----------------- Image Slider -----------------

// Initialize image slider 
function initImageSlider(section) {
    const nextImageBtn = section.querySelector(".next-image-btn");
    const prevImageBtn = section.querySelector(".prev-image-btn");
    const mainProductImage = section.querySelector(".product-main-img"); 
    let currentIndex = 1; 
    const totalImages = 4; 

    // Next button functionality
    nextImageBtn.addEventListener("click", function() {
        if (currentIndex < totalImages) {
            // If not last image → go to next image  
            currentIndex++;
        } else {
            // If last image → loop back to first image  
            currentIndex = 1; 
        }
        mainProductImage.src = `images/image-product-${currentIndex}.jpg`;
    });

    // Previous button functionality
    prevImageBtn.addEventListener("click", function() {
        if (currentIndex > 1) {
            // If not first image → go to previous image 
            currentIndex--;
        } else {
            // If first image → loop back to last image  
            currentIndex = totalImages; 
        }
        mainProductImage.src = `images/image-product-${currentIndex}.jpg`;
    });
}
// Run image slider initialization for main product section 
initImageSlider(productSection);


// ----------------------- Gallery Modal ----------------------

// Clone product section into gallery modal
const galleryModal = productSection.cloneNode(true);
const nextBtn = galleryModal.querySelector(".next-image-btn");
const prevBtn = galleryModal.querySelector(".prev-image-btn");

// Add the cloned gallery into the product gallery overlay 
productGallery.appendChild(galleryModal);

// Initialize slider and thumbnails inside the gallery modal
initImageSlider(galleryModal);
initProductThumbnails(galleryModal);

// Show gallery when main image is clicked
productSection.querySelector(".product-main-img").addEventListener("click", function() {
    productGallery.classList.remove("hidden");
    productGallery.classList.add("flex");

    nextBtn.classList.remove("hidden");
    nextBtn.classList.add("flex");
    prevBtn.classList.remove("hidden");
    prevBtn.classList.add("flex");

    nextBtn.classList.remove("right-[4%]", "top-[45%]");
    prevBtn.classList.remove("left-[4%]", "top-[45%]");

    nextBtn.classList.add("-right-[4%]", "top-[38%]");
    prevBtn.classList.add("-left-[4%]", "top-[38%]");

});

// Hide gallery when clicking outside modal
productGallery.addEventListener("click", (e) => {
    if (e.target === productGallery) {
        productGallery.classList.add("hidden");
    }
});

// Close gallery 
const closeGalleryBtn = document.querySelector(".close-gallery-btn");

// Close gallery when close button is clicked
closeGalleryBtn.addEventListener("click", function() {
    productGallery.classList.add("hidden");
});

// ----------------- Gallery Navigation (Next/Prev Sync) -----------------
let currentThumbIndex = 1;

// Function to initialize navigation buttons (next/prev)
function initGalleryNavigation(button, direction) {
    button.addEventListener("click", function() {

        // Get all thumbnails inside the gallery 
        const thumbnails = galleryModal.querySelectorAll(".product-thumbnails img");
        // Find currently active thumbnail 
        let activeThumb = Array.from(thumbnails).find(img => img.classList.contains("thumbnail-active"));

        // Extract current index from thumbnail src (e.g. image-product-2-thumbnail.jpg)
        let src = activeThumb.src;  
        let match = src.match(/image-product-(\d)-thumbnail\.jpg$/);
        if (match) {
            currentThumbIndex = parseInt(match[1]);
        }

        // Remove active state from all thumbnails 
        thumbnails.forEach(img => img.classList.remove("thumbnail-active"));

        // Update index depending on navigation direction  
        if (direction === "next") {
            currentThumbIndex++;
            if (currentThumbIndex > 4) currentThumbIndex = 1;
        } else if (direction === "prev") {
            currentThumbIndex--;
            if (currentThumbIndex < 1) currentThumbIndex = 4; 
        }

        // Update main image source based on new index
        const mainImg = galleryModal.querySelector(".product-main-img");
        mainImg.src = `images/image-product-${currentThumbIndex}.jpg`;

        // Set active class on the matching thumbnai
        thumbnails.forEach(img => {
            if (img.src.includes(`image-product-${currentThumbIndex}-thumbnail`)) {
                img.classList.add("thumbnail-active");
            }
        });
    });
}

// Initialize both next and prev buttons 
initGalleryNavigation(nextBtn, "next");
initGalleryNavigation(prevBtn, "prev");
