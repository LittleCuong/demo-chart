import { ChartOptions, TooltipItem } from 'chart.js';

const chartOptions: ChartOptions<'bar'> = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        datalabels: {
            color: 'black',
            display: true,
        },
        tooltip: {
            backgroundColor: 'rgba(255,255,255,1)',
            bodyColor: '#333',
            callbacks: {
                title: () => {
                    // Returning empty array to hide title
                    return [];
                },
                label: (tooltipItem: TooltipItem<'bar'>): string[] => {
                    const { datasetIndex, dataIndex } = tooltipItem;
                    const value = tooltipItem.raw as number;
                    const labels = tooltipItem.chart.data.labels;

                    let supply = '';
                    let usage = '';

                    if (datasetIndex === 0) {
                        supply = `$${value}`;
                        usage = `$${tooltipItem.chart.data.datasets[1].data[dataIndex]}`;
                    } else {
                        supply = `$${tooltipItem.chart.data.datasets[0].data[dataIndex]}`;
                        usage = `$${value}`;
                    }

                    const label = labels ? labels[dataIndex] : 'Unknown';

                    return [
                        label as string,
                        'Offer: Super Saver 25',
                        'VDO: 25% off',
                        `Supply: ${supply}`,
                        `Usage: ${usage}`,
                    ];
                },
            },
        },
        annotation: {
            annotations: {
                line1: {
                    type: 'line',
                    yMin: 60,
                    yMax: 60,
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    label: {
                        content: 'Threshold',
                        position: 'center', // adjust position as needed
                    },
                },
            },
        },
    },
    scales: {
        x: {
            ticks: {
                callback: function (value) {
                    return `$${value}`;
                },
            },
        },
        y: {
            stacked: true,
            ticks: {
                display: false,
            },
            grid: {
                display: true,
            },
            afterFit: (axis) => {
                axis.width = 40;
            },
        },
    },
};

export default chartOptions;
