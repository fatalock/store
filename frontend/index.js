document.addEventListener('DOMContentLoaded', () => {
    const navigationUl = document.getElementById('navigation');
    const contentDiv = document.getElementById('content');

    // Örnek navigasyon öğeleri
    const navigationItems = [
        { text: 'Ana Sayfa', link: '/' },
        { text: 'Ürünler', link: '/products' },
        { text: 'Sepet', link: '/cart' }
    ];

    // Navigasyonu dinamik olarak oluştur
    navigationItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.text;
        li.appendChild(a);
        navigationUl.appendChild(li);
    });

    // Başlangıçta ana sayfa içeriğini yükle (basit bir örnek)
    if (window.location.pathname === '/') {
        contentDiv.innerHTML = '<h1>Hoş Geldiniz!</h1><p>Dropshipping sitemize göz atın.</p>';
    } else if (window.location.pathname === '/products') {
        // Ürün listeleme içeriğini buraya yükle (ileride API'den gelecek)
        contentDiv.innerHTML = '<h2>Ürünlerimiz</h2><div id="product-list"></div>';
        loadProducts();
    } else if (window.location.pathname === '/cart') {
        // Sepet içeriğini buraya yükle
        contentDiv.innerHTML = '<h2>Sepetiniz</h2><div id="cart-items"></div>';
        loadCart();
    }

    // Örnek ürün yükleme fonksiyonu (statik veri)
    function loadProducts() {
        const productListDiv = document.getElementById('product-list');
        const products = [
            { name: 'Ürün 1', price: 19.99 },
            { name: 'Ürün 2', price: 29.99 }
        ];

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `<h3>${product.name}</h3><p>Fiyat: $${product.price}</p><button>Sepete Ekle</button>`;
            productListDiv.appendChild(productCard);
        });
    }

    function loadCart() {
        const cartItemsDiv = document.getElementById('cart-items');
        cartItemsDiv.textContent = 'Sepetiniz şu an boş.';
        // Sepet içeriğini (localStorage'dan veya backend'den) burada gösterebilirsiniz.
    }
});
