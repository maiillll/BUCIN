document.addEventListener('DOMContentLoaded', () => {

    const photoGrid = document.getElementById('photo-grid');

    // 1. Ambil data foto dari file JSON
    fetch('data/photos.json')
        .then(response => response.json())
        .then(photos => {
            if (photos.length === 0) {
                photoGrid.innerHTML = '<p>Galeri masih kosong.</p>';
                return;
            }

            // 2. Buat elemen HTML untuk setiap foto
            photos.forEach(photo => {
                // Buat elemen <a> sebagai pembungkus untuk Fancybox
                const link = document.createElement('a');
                link.href = photo.url; // Link ke gambar ukuran penuh
                link.className = 'photo-item';
                link.dataset.fancybox = 'gallery'; // Mengelompokkan semua foto ke satu galeri
                link.dataset.caption = photo.caption; // Menambahkan caption

                // Buat elemen <img> untuk thumbnail
                const img = document.createElement('img');
                img.src = photo.url;
                img.alt = photo.caption;

                // Gabungkan elemennya
                link.appendChild(img);
                photoGrid.appendChild(link);
            });

            // 3. Animasikan setiap foto saat muncul
            gsap.to(".photo-item", {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.1, // Efek muncul satu per satu
                ease: "power2.out",
                delay: 0.3
            });

            // 4. Inisialisasi Fancybox setelah semua gambar dimuat
            Fancybox.bind("[data-fancybox='gallery']", {
                // Opsi tambahan untuk Fancybox jika diperlukan
                buttons: ["slideShow", "thumbs", "close"],
                loop: true,
            });
        })
        .catch(error => {
            console.error('Error fetching photos:', error);
            photoGrid.innerHTML = '<p>Gagal memuat galeri. Silakan coba lagi nanti.</p>';
        });
});