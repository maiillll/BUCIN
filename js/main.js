// js/main.js
document.addEventListener('DOMContentLoaded', () => {

    const projectList = document.getElementById('proyek-list');

    // Animasi pembuka untuk header, hero section
    gsap.from(".main-header", { duration: 1, y: -100, opacity: 0, ease: "power3.out" });
    gsap.from(".hero-title", { duration: 1, y: -30, opacity: 0, ease: "power2.out", delay: 0.5 });
    gsap.from(".hero-subtitle", { duration: 1, y: 30, opacity: 0, ease: "power2.out", delay: 0.8 });
   gsap.from(".hero-button", { duration: 1, scale: 0.8, opacity: 0, ease: "back.out(1.7)", delay: 1.2 });
    // 1. Ambil data proyek dari file JSON
    fetch('data/projects.json')
        .then(response => response.json())
        .then(data => {
            // 2. Buat elemen HTML untuk setiap proyek
            data.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <img src="${project.gambar}" alt="${project.judul}">
                    <div class="project-card-content">
                        <h3>${project.judul}</h3>
                        <p>${project.deskripsi}</p>
                    </div>
                `;
                projectList.appendChild(card);
            });

            // 3. Animasikan setiap kartu proyek saat muncul
            // Menggunakan ScrollTrigger agar animasi muncul saat discroll ke elemen
            // Pastikan Anda sudah menyertakan ScrollTrigger di HTML jika ingin ini bekerja (optional, tapi sangat disarankan)
            // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
            // <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>

            // Jika tidak menggunakan ScrollTrigger, cukup gunakan gsap.to seperti sebelumnya:
            gsap.to(".project-card", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.15, // Memberi jeda antar kartu
                ease: "power3.out",
                // scrollTrigger: { // Hapus bagian ini jika tidak menggunakan ScrollTrigger
                //     trigger: projectList,
                //     start: "top 80%", // Mulai animasi ketika 80% dari atas viewport
                //     toggleActions: "play none none none"
                // }
            });
        })
        .catch(error => console.error('Error fetching projects:', error));

    // Anda juga bisa menambahkan animasi hover menggunakan JavaScript/GSAP
    // Misalnya, untuk tombol utama
    const btnPrimary = document.querySelector('.btn-primary');
    if (btnPrimary) {
        btnPrimary.addEventListener('mouseenter', () => {
            gsap.to(btnPrimary, { scale: 1.05, y: -3, duration: 0.2, ease: "power2.out" });
        });
        btnPrimary.addEventListener('mouseleave', () => {
            gsap.to(btnPrimary, { scale: 1, y: 0, duration: 0.2, ease: "power2.out" });
        });
    }

  
});