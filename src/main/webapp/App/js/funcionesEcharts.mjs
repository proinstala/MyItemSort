
import {DEFAULT_IMG, DISPONIBILIDAD} from './constantes.mjs';


/**
 * Obtiene el gráfico ECharts de un contenedor o lo inicializa si no existe.
 * @param {string} idContenedor - ID del div donde se renderiza el gráfico
 * @returns {echarts.ECharts} - instancia de ECharts
 */
function obtenerChart(idContenedor) {
    const chartDom = document.getElementById(idContenedor);
    let myChart = echarts.getInstanceByDom(chartDom);
    if (!myChart) {
        myChart = echarts.init(chartDom);
    }
    return myChart;
}

function pintarGraficoEmplazamientos(emplazamientos, idContenedor = 'graficoEmplazamientos') {
    //Preparar los datos
    const datos = emplazamientos
        .map(e => ({
            name: e.nombre,
            value: e.listaExistencias ? e.listaExistencias.length : 0,
            tipo: e.tipoEmplazamiento.nombre || 'Desconocido'
        }))
        .filter(d => d.value > 0);

        const totalExistencias = emplazamientos.reduce((total, e) => {
            if (e.listaExistencias && e.listaExistencias.length > 0) {
                const disponibles = e.listaExistencias.filter(
                    ex => ex.disponible === DISPONIBILIDAD.DISPONIBLE.name
                ).length;
                return total + disponibles;
            }
            return total;
        }, 0);

    const myChart = obtenerChart(idContenedor);

    //Opciones del gráfico
    const option = {
        title: {
            text: 'Distribución de existencias por emplazamiento',
            subtext: `Existencias: ${totalExistencias}`,
            left: 'center',
            textStyle: {
                fontSize: 21,         
                fontWeight: 'bold'
            },
            subtextStyle: {
                fontSize: 14,        
                color: '#666'
            }
        },
        tooltip: {
            trigger: 'item',
            backgroundColor: '#fff',    
            borderWidth: 1,
            textStyle: {
                color: '#333'
            },
            formatter: function (params) {
                // params.data contiene nuestros datos personalizados
                return `
                    <div style="
                        text-align: center;
                        font-weight: bold;
                        font-size: 14px;
                        margin-bottom: 6px;
                    ">
                        ${params.name}
                    </div>
                    <div style="font-size:12px; line-height:1.4;">
                        <b>Tipo:</b> ${params.data.tipo}<br/>
                        <b>Existencias:</b> ${params.value}<br/>
                        <b>Porcentaje:</b> ${params.percent}%
                    </div>
                `;
            }
        },
        legend: {
            type: 'scroll', // Permite "wrap" automático
            orient: 'horizontal',
            bottom: 0, // Debajo del gráfico
            left: 'center',
            align: 'auto',
            textStyle: {
                fontSize: 14
            },
            pageButtonPosition: 'end' // Flechas a la derecha si hay overflow
        },
        series: [
            {
                name: 'Existencias',
                type: 'pie',
                radius: '55%',
                center: ['50%', '55%'],
                data: datos,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: true,
                    formatter: (params) => {
                        return `${params.name}: ${params.percent.toFixed(1)}%`;
                      },
                    fontSize: 13
                },
                labelLine: {
                    show: true
                }
            }
        ]
    };

    //Renderizar
    myChart.setOption(option);

    //Ajustar tamaño si cambia la ventana
    window.addEventListener('resize', () => myChart.resize());
}

export { pintarGraficoEmplazamientos
    };

