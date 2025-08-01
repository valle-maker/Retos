// Configuración de Supabase
const SUPABASE_URL = 'https://ekymsjjpkjarhpmsyoda.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVreW1zampwa2phcmhwbXN5b2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4OTA3NDgsImV4cCI6MjA2OTQ2Njc0OH0.SmMD5bfLAHxCzoBlK3yDxojh2InzMMFZc66jlrK3La0';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

document.addEventListener('DOMContentLoaded', async function(){
    //  Autenticación Anónima 
    await supabase.auth.signInAnonymously();

    // Ejecutar todas las funciones
    fetchTop20Paises();
    fetchTopRegiones();
    fetchColombiaVsSuramerica();

    // Gráfico de Barras del top 20 de países con mayor produccion de energia renovable
    async function fetchTop20Paises(){
        const { data, error } = await supabase
            .from('top20Paises')
            .select('*')
            .order('Promedio Renovables', {ascending: false})
            .limit(20);
        if(error) throw error;
        
        createBarChart('graficoBarrasPaises', data, 'Pais', 'Promedio Renovables', 'Porcentaje de Energía Renovable', 'rgba(54, 162, 235, 0.6)');
    }

    // Grafico de Barras de Producción de Energía Renovable por Regiones
    async function fetchTopRegiones(){
        const { data, error } = await supabase
            .from('topRegiones')
            .select('*')
            .order('Promedio Renovables', {ascending: false});
        if(error) throw error;
        
        createBarChart('graficoBarrasRegiones', data, 'Region', 'Promedio Renovables', 'Porcentaje de Energía Renovable por Región', 'rgba(90, 126, 114, 0.6)');
    }

    // Funcion para crear gráficos de barras
    function createBarChart(canvasId, data, labelField, dataField, label, backgroundColor){
        const ctx = document.getElementById(canvasId).getContext('2d')
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(item => item[labelField]),
                datasets: [{
                    label: label,
                    data: data.map(item => item[dataField]),
                    backgroundColor: backgroundColor,
                    borderColor: backgroundColor.replace('0.6', '1'),
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
                            text: canvasId.includes('Paises') ? 'Paises' : 'Regiones'
                        }
                    }
                }
            }
        });
    }

    // Grafico Comparativo de Líneas
    async function fetchColombiaVsSuramerica(){
        const { data, error } = await supabase
            .from('colombia_SurAmerica')
            .select('*')
            .lte('Anno', 2021)
            .order('Anno', {ascending: true});
        if(error) throw error;
        
        // Procesar los datos que vienen de la Consulta
        const colombiaData = data.filter(item => item.Region === 'Colombia');
        const surAmericaData = data.filter(item => item.Region === 'Suramerica');
        const years = [...new Set(data.map(item => item.Anno))];
        const ctx = document.getElementById('graficoLineasComparativa').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: years,
                datasets: [
                    {
                        label: 'Colombia',
                        data: colombiaData.map(item => item.Renovable),
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        fill: false,
                        borderWidht: 1,
                        tension: 0.2
                    },
                    {
                        label: 'Suramerica',
                        data: surAmericaData.map(item => item.Renovable),
                        borderColor: 'rgba(255, 99, 235, 1)',
                        backgroundColor: 'rgba(255, 99, 235, 0.6)',
                        fill: false,
                        borderWidht: 1,
                        tension: 0.2
                    }
                ]
            }
        })
    }

});