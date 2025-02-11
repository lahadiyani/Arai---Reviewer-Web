// let darkmode = localStorage.getItem('dark-mode')
// const dark_modeButton = document.getElementById('switcher')
// let sun = document.querySelector('.mode-option-sun')
// let moon = document.querySelector('.mode-option-moon')

// const enableDarkmode = () => {
//     document.body.classList.add('dark-mode')
//     localStorage.setItem('dark-mode', 'active')
//     sun.style.display = 'none'
//     moon.style.display = 'block'
// }

// const disableDarkmode = () => {
//     document.body.classList.remove('dark-mode')
//     localStorage.removeItem('dark-mode')
//     sun.display.display = 'block'
//     moon.style.display = 'none'
// }

// if(darkmode === "active") enableDarkmode()

// dark_modeButton.addEventListener('click', () => {
//     darkmode = localStorage.getItem('dark-mode')
//     if(darkmode !== "active") {
//         enableDarkmode()
//         console.log('Dark mode enabled');
//     } else {
//         disableDarkmode()
//         console.log('Dark mode disabled');
//     }
// })

// console.log('Dark mode script loaded');
// console.log('Current mode:', darkmode);

// Ambil status dark mode dan ikon dari localStorage
// let darkmode = localStorage.getItem('dark-mode');
// let currentIcon = localStorage.getItem('current-icon');

// // Ambil elemen tombol dan ikon
// const dark_modeButton = document.getElementById('switcher');
// const sun = document.querySelector('.mode-option-sun');
// const moon = document.querySelector('.mode-option-moon');

// // Fungsi untuk mengaktifkan dark mode
// const enableDarkmode = () => {
//     document.body.classList.add('dark-mode'); // Tambahkan class dark mode
//     localStorage.setItem('dark-mode', 'active'); // Simpan status dark mode
//     localStorage.setItem('current-icon', 'moon'); // Simpan status ikon
//     sun.style.display = 'none'; // Sembunyikan sun
//     moon.style.display = 'block'; // Tampilkan moon
// };

// // Fungsi untuk menonaktifkan dark mode
// const disableDarkmode = () => {
//     document.body.classList.remove('dark-mode'); // Hapus class dark mode
//     localStorage.setItem('dark-mode', 'inactive'); // Simpan status dark mode
//     localStorage.setItem('current-icon', 'sun'); // Simpan status ikon
//     sun.style.display = 'block'; // Tampilkan sun
//     moon.style.display = 'none'; // Sembunyikan moon
// };

// // Saat halaman dimuat, sesuaikan tampilan berdasarkan status localStorage
// if (darkmode === 'active') {
//     enableDarkmode();
// } else {
//     disableDarkmode();
// }

// // Pastikan ikon sesuai status saat halaman dimuat
// if (currentIcon === 'moon') {
//     sun.style.display = 'none';
//     moon.style.display = 'block';
// } else {
//     sun.style.display = 'block';
//     moon.style.display = 'none';
// }

// // Tambahkan event listener untuk tombol toggle
// dark_modeButton.addEventListener('click', () => {
//     darkmode = localStorage.getItem('dark-mode');
//     if (darkmode !== 'active') {
//         enableDarkmode();
//         console.log('Dark mode enabled');
//     } else {
//         disableDarkmode();
//         console.log('Dark mode disabled');
//     }
// });