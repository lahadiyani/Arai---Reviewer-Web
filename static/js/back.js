// Mengambil elemen-elemen
const darkModeButton = document.getElementById('switcher');
const sun = document.querySelector('.mode-option-sun');
const moon = document.querySelector('.mode-option-moon');

// Cek jika dark mode sudah disetting di localStorage
if (localStorage.getItem('dark-mode') === 'active') {
    document.body.classList.add('dark-mode');
    sun.style.display = 'none';
    moon.style.display = 'inline';
}

// Fungsi untuk mengaktifkan dark mode
const enableDarkMode = () => {
    document.body.classList.add('dark-mode');
    localStorage.setItem('dark-mode', 'active');
    sun.style.display = 'none';
    moon.style.display = 'inline';
};

// Fungsi untuk menonaktifkan dark mode
const disableDarkMode = () => {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('dark-mode', null);
    sun.style.display = 'inline';
    moon.style.display = 'none';
};

// Menambahkan event listener ke tombol
darkModeButton.addEventListener('click', () => {
    if (localStorage.getItem('dark-mode') !== 'active') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});
