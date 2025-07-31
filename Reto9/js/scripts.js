document.addEventListener('DOMContentLoaded', function(){
    // Gráfico de Barras del top 20 de países con mayor produccion de energia renovable
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
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidht: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            begginAtZero: true,
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
        });
        // Grafico de Barras de Producción de Energía Renovable por Regiones
    fetch('data/topRegiones.json')
        .then(response => response.json())
        .then(data => {
            const ctx = document.getElementById('graficoBarrasRegiones').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: data.map(item => item.Region),
                    datasets: [{
                        label: 'Porcentaje de Energía Renovable',
                        data: data.map(item => item['Promedio Renovables']),
                        backgroundColor: 'rgba(236, 47, 165, 0.6)',
                        borderColor: 'rgba(236, 47, 165, 0.6)',
                        borderWidht: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            begginAtZero: true,
                            title: {
                                display: true,
                                text: 'Porcentaje (%)'
                            }
                        },
                        x: {
                            title: {
                                display: true,
                                text: 'Regiones'
                            }
                        }
                    }
                }
            });
        });
        // Grafico de Líneas de comparativa de Producción de Energía Renovable - Colombia vs. Suramerica
    fetch('data/colombia_SurAmerica.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item => item.Anno <= 2021)
            const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [...new Set(filteredData.map(item => item.Anno))],
                    datasets: [
                        {
                            label: 'Colombia',
                            data: filteredData.filter(item => item.Region === 'Colombia').map(item => item.Renovable),
                            borderColor: 'rgba(54, 162, 235, 1)',
                            backgroundColor: 'rgba(54, 162, 235, 0.6)',
                            fill: false,
                            borderWidht: 1,
                            tension: 0.2
                        },
                        {
                            label: 'Suramerica',
                            data: filteredData.filter(item => item.Region === 'Suramerica').map(item => item.Renovable),
                            borderColor: 'rgba(255, 99, 235, 1)',
                            backgroundColor: 'rgba(255, 99, 235, 0.6)',
                            fill: false,
                            borderWidht: 1,
                            tension: 0.2
                        }
                    ]
                }
            })
        });
});