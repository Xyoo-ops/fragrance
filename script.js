// ==========================================
// 1. DATA APLIKASI (Simulasi Database Produk)
// ==========================================
const products = [
    { id: 1, name: "Regal Oud", price: 5500000, category: "Oud", isFeatured: true, 
      desc: "Parfum istimewa dengan Oud Laos yang berusia 50 tahun, diperkaya dengan sentuhan saffron India dan mawar Turki. Aroma ini mewakili kekuasaan dan kemewahan abadi.",
      image: "https://images.unsplash.com/photo-1541604115160-5d6664903565?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: { top: "Bergamot, Saffron", middle: "Rose, Cedarwood", base: "Laotian Oud, Ambergris, Tonka Bean" },
      rating: 4.9
    },
    { id: 2, name: "Sultan Vetiver", price: 4800000, category: "Chypré", isFeatured: true, 
      desc: "Vetiver Haiti yang kaya, dibalut dengan rempah-rempah yang hangat dan sentuhan cokelat pahit. Sangat maskulin, halus, dan berkelas tinggi.",
      image: "https://images.unsplash.com/photo-1628126742512-a7f1e56a4270?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: { top: "Grapefruit, Black Pepper", middle: "Haitian Vetiver, Praline", base: "Oakmoss, Cedar" },
      rating: 4.7
    },
    { id: 3, name: "Velvet Gardenia", price: 3900000, category: "Floral", isFeatured: true, 
      desc: "Aroma Gardenia yang lembut dan krem, diperkuat oleh Tuberose dan Jasmine Sambac. Sebuah esensi keanggunan wanita yang tak tertandingi.",
      image: "https://images.unsplash.com/photo-1547820543-c0d12e6c641d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: { top: "Neroli, Pink Pepper", middle: "Gardenia, Tuberose, Jasmine", base: "Sandalwood, Vanilla" },
      rating: 4.8
    },
    { id: 4, name: "Celestial Amber", price: 6200000, category: "Ambrée", isFeatured: false, 
      desc: "Ambra abu-abu yang diambil secara etis, dicampur dengan madu dan rempah-rempah Maroko yang manis. Hangat, sensual, dan memabukkan.",
      image: "https://images.unsplash.com/photo-1628126742512-a7f1e56a4270?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: { top: "Sichuan Pepper, Cardamom", middle: "Honey, Patchouli", base: "Ambergris, Benzoin" },
      rating: 4.9
    },
    { id: 5, name: "Phantom Musk", price: 3500000, category: "Musk", isFeatured: false, 
      desc: "Aroma musk putih yang bersih dan halus, memberikan kesan 'kulit kedua' yang mewah dan intim.",
      image: "https://images.unsplash.com/photo-1541604115160-5d6664903565?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      notes: { top: "Aldehydes, Iris", middle: "White Musk, Rose Petals", base: "Ambroxan, Cedar" },
      rating: 4.5
    },
];

let cart = JSON.parse(localStorage.getItem('eleganceCart')) || [];
let wishlist = JSON.parse(localStorage.getItem('eleganceWishlist')) || [];
let currentProductModal = null;

// ==========================================
// 2. UTILITY & NAVIGATION
// ==========================================

// Format Rupiah
function formatRupiah(number) {
    return 'Rp ' + (number || 0).toLocaleString('id-ID');
}

// Tampilkan Bintang Rating
function renderStars(rating) {
    const roundedRating = Math.round(rating * 2) / 2;
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= roundedRating) {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500 fill-current" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l1.255 3.864 4.062.294c.974.07 1.365 1.258.62 1.879l-3.235 2.502 1.255 3.864c.3.921-.755 1.688-1.54 1.127l-3.235-2.502-3.235 2.502c-.785.561-1.84-.199-1.54-1.127l1.255-3.864-3.235-2.502c-.745-.621-.354-1.809.62-1.879l4.062-.294 1.255-3.864z"/></svg>`;
        } else if (i - 0.5 === roundedRating) {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-yellow-500" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 2.553a1 1 0 00-1.788 0l-1.255 3.864-4.062.294c-.974.07-1.365 1.258-.62 1.879l3.235 2.502-1.255 3.864c-.3.921.755 1.688 1.54 1.127l3.235-2.502 3.235 2.502c.785.561 1.84-.199 1.54-1.127l-1.255-3.864 3.235-2.502c.745-.621.354-1.809-.62-1.879l-4.062-.294L10.894 2.553zM10 13.414L7.758 11.66c-.6-.465-1.428-.465-2.028 0L3 13.586V6.414L4.242 5.16c.6-.465 1.428-.465 2.028 0L10 8.586l3.73-3.426c.6-.465 1.428-.465 2.028 0L17 6.414v7.172l-2.73-1.926c-.6-.465-1.428-.465-2.028 0L10 13.414z" clip-rule="evenodd"/></svg>`;
        } else {
            starsHtml += `<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-700" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.62-.921 1.92 0l1.255 3.864 4.062.294c.974.07 1.365 1.258.62 1.879l-3.235 2.502 1.255 3.864c.3.921-.755 1.688-1.54 1.127l-3.235-2.502-3.235 2.502c-.785.561-1.84-.199-1.54-1.127l1.255-3.864-3.235-2.502c-.745-.621-.354-1.809.62-1.879l4.062-.294 1.255-3.864z"/></svg>`;
        }
    }
    return starsHtml;
}

// Tampilkan Notifikasi (Toast)
function showNotification(message) {
    let notification = document.getElementById('notification');
    if (!notification) return;

    notification.textContent = message;
    notification.classList.remove('opacity-0', 'translate-x-full');
    notification.classList.add('opacity-100', 'translate-x-0');

    setTimeout(() => {
        notification.classList.remove('opacity-100', 'translate-x-0');
        notification.classList.add('opacity-0', 'translate-x-full');
    }, 3000);
}

// Navigasi Halaman
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.add('hidden');
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.remove('hidden');
        window.scrollTo(0, 0); 

        // Update konten jika halaman terkait
        if (pageId === 'cart') renderCart();
        if (pageId === 'wishlist') renderWishlist();
    }
}

// ==========================================
// 3. LOGIKA CART (Keranjang)
// ==========================================

function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
        showNotification(`${product.name} diperbarui di keranjang.`);
    } else {
        cart.push({ ...product, quantity: 1 });
        showNotification(`${product.name} telah ditambahkan ke keranjang.`);
    }
    
    localStorage.setItem('eleganceCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function removeFromCart(productId) {
    const product = products.find(p => p.id === productId);
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('eleganceCart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
    showNotification(`${product.name} telah dihapus dari keranjang.`);
}

function changeQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        localStorage.setItem('eleganceCart', JSON.stringify(cart));
        renderCart();
    }
}

function renderCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.getElementById('cart-summary');
    const emptyMessage = document.getElementById('empty-cart-message');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '';
        cartSummary.classList.add('hidden');
        emptyMessage.classList.remove('hidden');
        return;
    }

    emptyMessage.classList.add('hidden');
    cartSummary.classList.remove('hidden');

    let subtotal = 0;
    const itemsHtml = cart.map(item => {
        const totalItemPrice = item.price * item.quantity;
        subtotal += totalItemPrice;
        return `
            <div class="flex items-center p-4 bg-zinc-800 rounded-lg shadow-md border border-zinc-700">
                <img src="${item.image}" alt="${item.name}" class="w-20 h-20 object-cover rounded mr-4">
                <div class="flex-grow">
                    <h3 class="text-lg font-semibold text-brand-gold-400">${item.name}</h3>
                    <p class="text-sm text-gray-400">${formatRupiah(item.price)} x ${item.quantity}</p>
                    <p class="text-base font-bold text-white mt-1">${formatRupiah(totalItemPrice)}</p>
                </div>
                <div class="flex items-center space-x-2 mr-4">
                    <button onclick="changeQuantity(${item.id}, -1)" class="w-8 h-8 bg-black border border-zinc-700 text-white rounded-full hover:bg-zinc-700 transition-colors">-</button>
                    <span class="w-6 text-center text-white">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" class="w-8 h-8 bg-black border border-zinc-700 text-white rounded-full hover:bg-zinc-700 transition-colors">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="text-red-500 hover:text-red-400 transition-colors ml-4">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3" /></svg>
                </button>
            </div>
        `;
    }).join('');

    cartItemsContainer.innerHTML = itemsHtml;
    document.getElementById('cart-subtotal').textContent = formatRupiah(subtotal);
}

// ==========================================
// 4. LOGIKA WISHLIST
// ==========================================

function toggleWishlist(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${product.name} dihapus dari Wishlist.`);
    } else {
        wishlist.push(productId);
        showNotification(`${product.name} ditambahkan ke Wishlist.`);
    }

    localStorage.setItem('eleganceWishlist', JSON.stringify(wishlist));
    renderWishlist();
    if (currentProductModal) updateWishlistButton();
}

function renderWishlist() {
    const wishlistContainer = document.getElementById('wishlist-list');
    const emptyMessage = document.getElementById('empty-wishlist-message');
    
    const wishlistItems = products.filter(p => wishlist.includes(p.id));

    if (wishlistItems.length === 0) {
        wishlistContainer.innerHTML = '';
        emptyMessage.classList.remove('hidden');
        return;
    }

    emptyMessage.classList.add('hidden');
    
    const itemsHtml = wishlistItems.map(p => `
        <div class="product-card bg-zinc-900 rounded-xl shadow-xl p-5 border border-brand-gold-400/10 hover:border-brand-gold-400/50 transition-all cursor-pointer animate-fade-in-up" data-category="${p.category}" onclick="openModal(${p.id})">
            <div class="relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-48 object-cover rounded-lg mb-4">
                <button onclick="event.stopPropagation(); toggleWishlist(${p.id})" class="absolute top-2 right-2 text-brand-red p-2 bg-black/50 rounded-full hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
            </div>
            <div class="flex items-center mb-2">${renderStars(p.rating)}</div>
            <h3 class="text-xl font-serif text-brand-gold-400 font-semibold mb-1">${p.name}</h3>
            <p class="text-sm text-gray-400 mb-3">${p.category}</p>
            <p class="text-lg font-bold text-white">${formatRupiah(p.price)}</p>
            <button onclick="event.stopPropagation(); addToCart(${p.id})" class="mt-4 w-full px-4 py-2 bg-brand-gold-400 text-black rounded-full text-sm font-semibold hover:bg-brand-gold-300 transition-colors">
                Tambahkan ke Keranjang
            </button>
        </div>
    `).join('');

    wishlistContainer.innerHTML = itemsHtml;
}

function updateWishlistButton() {
    const btn = document.getElementById('modal-wishlist-btn');
    if (!btn || !currentProductModal) return;

    const isInWishlist = wishlist.includes(currentProductModal.id);
    btn.className = isInWishlist
        ? 'text-brand-red p-3 rounded-full border border-brand-red hover:scale-110 transition-transform'
        : 'text-gray-400 p-3 rounded-full border border-zinc-700 hover:text-brand-red hover:border-brand-red transition-colors';
}

// ==========================================
// 5. MODAL & PRODUCT RENDERING
// ==========================================

function renderProducts() {
    const productListContainer = document.getElementById('product-list');
    const unggulanContainer = document.getElementById('unggulan-container');
    
    // Render Daftar Produk
    const allProductsHtml = products.map(p => `
        <div class="product-card bg-zinc-900 rounded-xl shadow-xl p-5 border border-brand-gold-400/10 hover:border-brand-gold-400/50 transition-all cursor-pointer animate-fade-in-up" data-category="${p.category}" onclick="openModal(${p.id})">
            <div class="relative">
                <img src="${p.image}" alt="${p.name}" class="w-full h-56 object-cover rounded-lg mb-4">
                <button onclick="event.stopPropagation(); toggleWishlist(${p.id})" class="absolute top-2 right-2 text-gray-400 p-2 bg-black/50 rounded-full hover:text-brand-red hover:scale-110 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                </button>
            </div>
            <div class="flex items-center mb-2">${renderStars(p.rating)}</div>
            <h3 class="text-2xl font-serif text-brand-gold-400 font-semibold mb-1">${p.name}</h3>
            <p class="text-sm text-gray-400 mb-3">${p.category}</p>
            <p class="text-xl font-bold text-white">${formatRupiah(p.price)}</p>
        </div>
    `).join('');
    productListContainer.innerHTML = allProductsHtml;

    // Render Produk Unggulan (Halaman Beranda)
    const featuredProductsHtml = products.filter(p => p.isFeatured).map(p => `
        <div class="product-card bg-zinc-900 rounded-xl shadow-xl p-5 border border-brand-gold-400/10 hover:border-brand-gold-400/50 transition-all cursor-pointer animate-fade-in-up" onclick="openModal(${p.id})">
            <img src="${p.image}" alt="${p.name}" class="w-full h-64 object-cover rounded-lg mb-4">
            <div class="flex items-center justify-center mb-2">${renderStars(p.rating)}</div>
            <h3 class="text-2xl font-serif text-brand-gold-400 font-semibold mb-1">${p.name}</h3>
            <p class="text-sm text-gray-400 mb-3">${p.category}</p>
            <p class="text-xl font-bold text-white">${formatRupiah(p.price)}</p>
        </div>
    `).join('');
    unggulanContainer.innerHTML = featuredProductsHtml;

    // Attach filter listeners
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterProducts(filter, button);
        });
    });
}

function filterProducts(filter, clickedButton) {
    document.querySelectorAll('.product-card').forEach(card => card.style.border = '1px solid rgba(201, 168, 122, 0.1)');

    document.querySelectorAll('#product-list .product-card').forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });

    // Update button styles
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-gold-400', 'text-black');
        btn.classList.add('bg-zinc-800', 'text-white');
    });
    clickedButton.classList.remove('bg-zinc-800', 'text-white');
    clickedButton.classList.add('bg-brand-gold-400', 'text-black');
}

function openModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    currentProductModal = product;
    
    document.getElementById('modal-image').src = product.image;
    document.getElementById('modal-image').alt = product.name;
    document.getElementById('modal-name').textContent = product.name;
    document.getElementById('modal-category').textContent = product.category;
    document.getElementById('modal-price').textContent = formatRupiah(product.price);
    document.getElementById('modal-description').textContent = product.desc;
    document.getElementById('modal-notes-top').textContent = product.notes.top;
    document.getElementById('modal-notes-middle').textContent = product.notes.middle;
    document.getElementById('modal-notes-base').textContent = product.notes.base;

    // Render Rating
    document.getElementById('modal-rating').innerHTML = renderStars(product.rating) + 
        '<span class="ml-2 text-sm text-gray-400">(4.8 / 5 dari 128 Ulasan)</span>';
    
    updateWishlistButton();
    
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
    currentProductModal = null;
}

// ==========================================
// 6. LOGIKA PENCARIAN CANGGIH
// ==========================================
function toggleSearchModal() {
    const modal = document.getElementById('search-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) {
        document.getElementById('search-input').focus();
    } else {
        document.getElementById('autocomplete-results').classList.add('hidden');
        document.getElementById('search-input').value = '';
    }
}

function handleSearchInput() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const resultsContainer = document.getElementById('autocomplete-results');

    if (query.length < 2) {
        resultsContainer.classList.add('hidden');
        resultsContainer.innerHTML = '';
        return;
    }

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.notes.top.toLowerCase().includes(query) ||
        p.notes.middle.toLowerCase().includes(query) ||
        p.notes.base.toLowerCase().includes(query)
    ).slice(0, 5);

    if (filteredProducts.length > 0) {
        const resultsHtml = filteredProducts.map(p => `
            <div onclick="performSearch('${p.name}')" class="p-3 text-white hover:bg-zinc-800 cursor-pointer border-b border-zinc-800 last:border-b-0">
                <span class="font-semibold text-brand-gold-400">${p.name}</span> <span class="text-sm text-gray-400">(${p.category})</span>
            </div>
        `).join('');
        resultsContainer.innerHTML = resultsHtml;
        resultsContainer.classList.remove('hidden');
    } else {
        resultsContainer.innerHTML = '<div class="p-3 text-gray-500 text-sm">Tidak ada hasil ditemukan.</div>';
        resultsContainer.classList.remove('hidden');
    }
}

function performSearch(query) {
    toggleSearchModal();
    
    showPage('produk'); 
    showNotification(`Menampilkan hasil pencarian untuk: "${query}"`);
    
    document.querySelectorAll('#product-list .product-card').forEach(card => {
        const cardText = card.textContent.toLowerCase();
        if (cardText.includes(query.toLowerCase())) {
            card.classList.remove('hidden');
            card.style.border = '2px solid #c9a87a';
        } else {
            card.classList.add('hidden');
            card.style.border = '1px solid rgba(201, 168, 122, 0.1)';
        }
    });

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('bg-brand-gold-400', 'text-black');
        btn.classList.add('bg-zinc-800', 'text-white');
    });
    document.querySelector('.filter-btn[data-filter="all"]').classList.add('bg-brand-gold-400', 'text-black');
}

// ==========================================
// 7. LOGIKA CHECKOUT LENGKAP
// ==========================================

let currentStep = 1;
let checkoutData = { shippingCost: 25000, shippingMethod: 'standard' };

function startCheckout() {
    if (cart.length === 0) {
        showNotification("Keranjang Anda kosong. Tidak dapat melanjutkan checkout.");
        return;
    }
    currentStep = 1;
    goToStep(currentStep);
    showPage('checkout');
}

function goToStep(step) {
    if (step > currentStep && !validateStep(currentStep)) {
        showNotification("Harap lengkapi semua bidang yang wajib diisi!");
        return;
    }

    if (step > currentStep) saveStepData(currentStep);

    currentStep = step;
    
    document.querySelectorAll('.checkout-step').forEach(el => el.classList.add('hidden'));
    const targetStepEl = document.getElementById(`step-${step}`);
    if(targetStepEl) targetStepEl.classList.remove('hidden');

    document.querySelectorAll('[id^="step-"][id$="-title"]').forEach((title, index) => {
        const stepNum = index + 1;
        const bar = title.querySelector('div');
        
        title.classList.remove('text-brand-gold-400', 'font-bold', 'text-gray-600');
        bar.classList.remove('bg-brand-gold-400', 'bg-zinc-700');

        if (stepNum < step) {
            title.classList.add('text-brand-gold-400');
            bar.classList.add('bg-brand-gold-400');
        } else if (stepNum === step) {
            title.classList.add('text-brand-gold-400', 'font-bold');
            bar.classList.add('bg-brand-gold-400');
        } else {
            title.classList.add('text-gray-600');
            bar.classList.add('bg-zinc-700');
        }
    });

    if (step === 4) {
        collectDataForReview();
    }
}

function validateStep(step) {
    if (step === 1) {
        const email = document.getElementById('email').value.trim();
        const name = document.getElementById('name').value.trim();
        const address = document.getElementById('address').value.trim();
        const phone = document.getElementById('phone').value.trim();
        return email !== '' && name !== '' && address !== '' && phone !== '';
    }
    return true;
}

function saveStepData(step) {
    if (step === 1) {
        checkoutData.email = document.getElementById('email').value;
        checkoutData.name = document.getElementById('name').value;
        checkoutData.address = document.getElementById('address').value;
        checkoutData.phone = document.getElementById('phone').value;
    } else if (step === 2) {
        const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
        checkoutData.shippingMethod = selectedShipping.value;
        checkoutData.shippingCost = parseInt(selectedShipping.getAttribute('data-cost'));
    } else if (step === 3) {
        const selectedPayment = document.querySelector('input[name="payment-method"]:checked');
        checkoutData.paymentMethod = selectedPayment.value;
    }
}

function collectDataForReview() {
    saveStepData(1);
    saveStepData(2);
    saveStepData(3);
    
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutData.subtotal = subtotal;
    
    let finalShippingCost = checkoutData.shippingCost;
    if (subtotal >= 5000000 && checkoutData.shippingMethod === 'standard') {
        finalShippingCost = 0; 
    }
    checkoutData.shippingCost = finalShippingCost;
    checkoutData.total = subtotal + checkoutData.shippingCost;

    document.getElementById('review-name').textContent = checkoutData.name;
    document.getElementById('review-email').textContent = checkoutData.email;
    document.getElementById('review-address').textContent = checkoutData.address;
    document.getElementById('review-payment-method').textContent = checkoutData.paymentMethod.toUpperCase().replace('CARD', 'Kartu Kredit/Debit').replace('BANK', 'Transfer Bank').replace('EWALLET', 'E-Wallet');

    document.getElementById('review-subtotal').textContent = formatRupiah(checkoutData.subtotal);
    
    const shippingTypeEl = document.querySelector(`input[name="shipping-method"][value="${checkoutData.shippingMethod}"]`);
    if (shippingTypeEl) {
        document.getElementById('review-shipping-type').textContent = shippingTypeEl.nextElementSibling.querySelector('span').textContent.replace(/\s*\(.*\)/, '');
    } else {
        document.getElementById('review-shipping-type').textContent = 'Tidak Ditemukan';
    }

    document.getElementById('review-shipping-cost').textContent = (checkoutData.shippingCost === 0) ? "Gratis" : formatRupiah(checkoutData.shippingCost);
    document.getElementById('review-total').textContent = formatRupiah(checkoutData.total);
    
    const reviewItemsContainer = document.getElementById('review-items');
    reviewItemsContainer.innerHTML = cart.map(item => `
        <div class="flex justify-between items-center text-sm text-gray-300">
            <span>${item.name} (${item.quantity}x)</span>
            <span>${formatRupiah(item.price * item.quantity)}</span>
        </div>
    `).join('');
}

function placeOrder() {
    showNotification("Memproses pembayaran...");
    
    setTimeout(() => {
        cart = [];
        localStorage.setItem('eleganceCart', JSON.stringify(cart));
        updateCartCount();

        document.getElementById('order-email').textContent = checkoutData.email;

        goToStep(5);
        
        showNotification("Transaksi Berhasil! Pesanan Anda telah dikonfirmasi.");
    }, 1500);
}

// ==========================================
// 8. LOGIKA CHATBOT
// ==========================================
function toggleChatbot() {
    const chatbotWindow = document.getElementById('chatbot-window');
    chatbotWindow.classList.toggle('hidden');
    document.getElementById('chatbot-toggle').classList.remove('animate-pulse-slow');
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    if (!message) return;

    appendMessage(message, 'user');
    input.value = '';

    const typingIndicator = appendMessage('...', 'ai');
    
    setTimeout(() => {
        typingIndicator.remove();
        let response = '';
        const lowerCaseMessage = message.toLowerCase();

        if (lowerCaseMessage.includes('pengiriman')) {
            response = 'Kami menawarkan pengiriman standar (Gratis untuk order di atas Rp 5 Juta) dan Royal Messenger (1 Hari) untuk layanan premium. Alamat Anda akan dikonfirmasi di tahap checkout.';
        } else if (lowerCaseMessage.includes('pembayaran')) {
            response = 'Kami menerima Kartu Kredit/Debit, Transfer Bank (Virtual Account), dan E-Wallet (OVO, Dana, dll.). Semua transaksi aman dan terenkripsi (SSL Secured).';
        } else if (lowerCaseMessage.includes('regal oud')) {
            response = 'Regal Oud adalah mahakarya Oud Laos berusia 50 tahun. Anda dapat melihat detail lengkapnya di halaman koleksi kami, atau ketik "Beli Regal Oud" untuk menambahkannya ke keranjang.';
        } else if (lowerCaseMessage.includes('wishlist')) {
            response = 'Wishlist Anda adalah tempat sempurna untuk menyimpan parfum favorit. Anda dapat mengaksesnya melalui ikon hati di menu navigasi.';
        } else if (lowerCaseMessage.includes('tolong') || lowerCaseMessage.includes('bantuan')) {
            response = 'Tentu, silakan sebutkan kata kunci seperti "pengiriman", "pembayaran", atau nama parfum yang Anda cari. Saya siap membantu!';
        } else {
            response = 'Mohon maaf, saya adalah asisten simulasi. Untuk pertanyaan lain, silakan hubungi kontak support kami di Footer.';
        }

        appendMessage(response, 'ai');
    }, 1000); 
}

function appendMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `text-sm p-2 rounded-lg max-w-[80%] ${
        sender === 'user' 
        ? 'bg-brand-gold-400 text-black self-end ml-auto' 
        : 'bg-zinc-800 text-gray-200 self-start'
    }`;
    messageDiv.textContent = text;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;

    return messageDiv;
}

// ==========================================
// 9. INISIALISASI BACKGROUND BINTANG
// ==========================================
function initializeStarBackground() {
    const skyContainer = document.getElementById('night-sky-background');
    
    for (let i = 0; i < 300; i++) {
        const star = document.createElement('div');
        
        const starTypes = ['small', 'medium', 'large', 'gold'];
        const starType = starTypes[Math.floor(Math.random() * starTypes.length)];
        star.className = `star ${starType}`;
        
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        const duration = Math.random() * 6 + 2;
        const delay = Math.random() * 10;
        star.style.setProperty('--twinkle-duration', `${duration}s`);
        star.style.animationDelay = `${delay}s`;
        
        skyContainer.appendChild(star);
    }
    
    for (let j = 0; j < 8; j++) {
        const shootingStar = document.createElement('div');
        shootingStar.className = 'shooting-star';
        
        shootingStar.style.top = `${Math.random() * 40}%`;
        shootingStar.style.left = `${Math.random() * 20}%`;
        
        const shootingDuration = Math.random() * 3 + 2;
        const shootingDelay = Math.random() * 30 + 10;
        shootingStar.style.setProperty('--shooting-duration', `${shootingDuration}s`);
        shootingStar.style.animationDelay = `${shootingDelay}s`;
        
        skyContainer.appendChild(shootingStar);
    }
    
    createConstellation(skyContainer, 50, 20, 80, 40);
    createConstellation(skyContainer, 70, 60, 90, 80);
    createConstellation(skyContainer, 20, 70, 40, 90);
}

function createConstellation(container, x1, y1, x2, y2) {
    const constellation = document.createElement('div');
    constellation.className = 'constellation';
    
    const line = document.createElement('div');
    line.className = 'constellation-line';
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    
    line.style.width = `${length}%`;
    line.style.top = `${y1}%`;
    line.style.left = `${x1}%`;
    line.style.transform = `rotate(${angle}deg)`;
    
    constellation.appendChild(line);
    container.appendChild(constellation);
    
    const star1 = createConstellationStar(x1, y1);
    const star2 = createConstellationStar(x2, y2);
    
    container.appendChild(star1);
    container.appendChild(star2);
}

function createConstellationStar(x, y) {
    const star = document.createElement('div');
    star.className = 'star gold';
    star.style.top = `${y}%`;
    star.style.left = `${x}%`;
    star.style.animationDuration = `${Math.random() * 4 + 3}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    return star;
}

// ==========================================
// 10. INISIALISASI UTAMA
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartCount();
    renderWishlist();
    initializeStarBackground();
    
    const header = document.getElementById('main-header');
    window.addEventListener('scroll', function(){
        if(window.scrollY > 50){
            header.classList.add('py-3','bg-black/90');
            header.classList.remove('py-5','bg-black/70');
        } else {
            header.classList.remove('py-3','bg-black/90');
            header.classList.add('py-5','bg-black/70');
        }
    });

    showPage('beranda');

    const hero = document.getElementById('hero-section');
    const heroContent = document.getElementById('hero-content');
    if (hero && heroContent) {
        hero.addEventListener('mousemove', (e) => {
            if (window.innerWidth < 768) return;
            
            const { clientX, clientY, currentTarget } = e;
            const { clientWidth, clientHeight } = currentTarget;

            const x = (clientX / clientWidth) - 0.5;
            const y = (clientY / clientHeight) - 0.5;

            const strength = 30;

            heroContent.style.transform = `translate(${x * -strength}px, ${y * -strength}px)`;
        });
    }

    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.addEventListener('change', () => {
            const cardForm = document.getElementById('card-form');
            if (radio.value === 'card') {
                cardForm.classList.remove('hidden');
            } else {
                cardForm.classList.add('hidden');
            }
        });
    });

    const initialPayment = document.querySelector('input[name="payment-method"]:checked');
    if (initialPayment && initialPayment.value !== 'card') {
        document.getElementById('card-form').classList.add('hidden');
    }

    document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
});