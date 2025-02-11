function updateChart(baikPercentage, burukPercentage, title) {
    const data = {
        labels: ['Baik', 'Buruk'],
        datasets: [{
            label: 'Ratings',
            data: [baikPercentage, burukPercentage],
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
    };

    const ctx = document.getElementById('myChart').getContext('2d');
    new Chart(ctx, config); // Membuat chart baru dengan data yang diperbarui
}
