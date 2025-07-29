document.addEventListener('DOMContentLoaded', function() {
    fetch('data/top20Paises.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarrasPaises').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Pais),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['Promedio Renovables']),
                        backgroundColor: 'rgba(54,162, 235, 0.6)',
                        borderColor: 'rgba(54,162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Paises'
                            }
                        }
                    }
                }
            });
        })
});