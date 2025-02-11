// fetch('/rates/com.mobile.legends')  // Ganti dengan URL yang sesuai
//   .then(response => response.json())  // Mengonversi respons ke dalam format JSON
//   .then(data => {
//     console.log(data);  // Menampilkan data JSON ke console
//   })
//   .catch(error => {
//     console.error('Error:', error);  // Menampilkan error jika terjadi kesalahan
//   });

let rate = document.getElementById('rate');
let inputUrl = document.getElementById('url-input');
let infoAi = document.getElementById('info-ai');
let resultsBox = document.getElementById('results-box');

// Fungsi untuk ekstrak app_id dari URL
function extractAppId(url) {
  const regex = /id=([a-zA-Z0-9._-]+)(&|$)/; // Mencari pola 'id=' diikuti oleh karakter app_id yang valid
  const match = url.match(regex); // Mencocokkan regex dengan URL
  return match ? match[1] : null; // Jika ditemukan, kembalikan app_id; jika tidak, kembalikan null
}

// Fungsi untuk mengirimkan request ke server
function sendAppIdToServer(appId) {
  const url = `http://127.0.0.1:3000/rates/${appId}/100`; // URL dengan parameter app_id

  // Debug: Menampilkan URL yang akan dipanggil
  console.log(`Mengirim request ke URL: ${url}`);

  // Gunakan fetch untuk melakukan request GET
  fetch(url)
    .then(response => {
      // Cek apakah response berhasil (status 200)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); // Mengonversi response menjadi JSON
    })
    .then(data => {
      // Debug: Menampilkan data yang diterima dari server
      console.log('Data yang diterima dari server:', data);
      // Jika data ada, tampilkan di resultsBox
      if (data && data.reviews && data.reviews.length > 0 && data.rate) {
        const reviews = data.reviews[0]; // Ambil review pertama sebagai contoh
        const rates = data.rate;


        resultsBox.innerHTML = `
        <div class="border-3d">
          <div class="image-apps">
              <img src="${reviews.icon}" alt="${reviews.title}" class="apps-results" id="app-icon">
          </div>
          <div class="info-results">
              <span class="text-dumps" id="app-title">Name: ${reviews.title}</span>
              <span class="text-dumps" id="app-ratings">Ratings: ${rates.rate}</span>
              <span class="text-dumps" id="app-score">Reviews: ${reviews.ratings}</span>
          </div>
        </div>
        <div class="graph-chart">
            <canvas class="graph" id="myChart"></canvas>
        </div>
        `;
        
        // Call the function to update the chart
        updateChart(rates.baik_percentage, rates.buruk_percentage, reviews.title);
        inputUrl.value = '';
        
      } else {
        resultsBox.innerHTML = `
          <p class='text-error'>Data review tidak ditemukan.</p>
        `;
        inputUrl.value = '';
      }
    })
    .catch(error => {
      // Debug: Menangani kesalahan jika ada
      console.error('Terjadi kesalahan:', error); // Menampilkan error ke konsol
      resultsBox.innerHTML = `
        <p class='text-error'>Terjadi kesalahan saat mengirimkan request.</p>
      `;
      inputUrl.value = '';
    });
}

// Fungsi untuk update chart
function updateChart(baik_percentage, buruk_percentage, title) { 
  const data = {
      labels: ['Baik', 'Buruk'],
      datasets: [{
          label: `${title}`,
          data: [baik_percentage, buruk_percentage],
          backgroundColor: [
              'rgb(54, 162, 235)', // Warna untuk Baik
              'rgb(255, 99, 132)'  // Warna untuk Buruk
          ],
          hoverOffset: 4
      }]
  };

  const config = {
      type: 'pie', // Tipe chart pie
      data: data,
      options: {
        plugins: {
          tooltip: {
            callbacks: {
              // Menambahkan '%' pada tooltip
              label: function(tooltipItem) {
                return tooltipItem.raw + '%';  // Menambahkan simbol persen pada data
              }
            }
          }
        }
      }
  };

  const ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, config); // Membuat chart baru dengan data yang diperbarui
}

rate.addEventListener('click', (event) => {
  event.preventDefault();
  // Ambil nilai input URL
  const url = inputUrl.value;

  infoAi.style.display = 'none';
  resultsBox.style.display = 'flex';

  // Ekstrak app_id dari URL
  const appId = extractAppId(url);

  // Tampilkan hasil di resultsBox
  if (appId) {
    console.log(`App ID: ${appId}`);
    sendAppIdToServer(appId); // Panggil fungsi untuk mengirim request ke server
  } else {
    console.log("App ID tidak ditemukan pada URL.");
    resultsBox.innerHTML = `
      <p class='text-error'>App ID tidak ditemukan pada URL.</p>
    `;
    inputUrl.value = '';
  }
});
