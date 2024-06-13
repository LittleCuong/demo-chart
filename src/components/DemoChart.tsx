import { Bar } from 'react-chartjs-2';
import { Align, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ChartOptions, TooltipItem } from 'chart.js';

import { barSize } from '../settings/chartSettings';
import { Anchor } from 'chartjs-plugin-datalabels/types/options';
import axios from 'axios';
import { useEffect, useState } from 'react';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels, annotationPlugin);

interface Plans {
    brand_name: string;
    brand_logo: string;
    [key: string]: any; // Allow for additional properties
}

interface Plan {
    brand_name: string;
    brand_logo: string;
    supply: number;
    usage: number;
    solar: number;
    [key: string]: any; // Allow for additional properties
}

const DemoChart = () => {
    const [vdo, setVdo] = useState(0);
    const [plans, setPlans] = useState<Plans[]>();
    const [usageData, setUsageData] = useState<number[]>();
    const [supplyData, setSupplyData] = useState<number[]>();
    const [solarData, setSolarData] = useState<number[]>();

    useEffect(() => {
        handleGetChartData();
    }, []);

    const handleGetChartData = async () => {
        let response = null;
        try {
            response = await axios.get(
                'http://localhost:9000/dummy/competitive-positioning-chart?retailers=ActewAGL,1st%20Energy&distributors=Essential%20Energy%20Standard,acb',
            );
            console.log(response.data);

            let plans = response.data.data.plans;

            // set vdo & plans
            setVdo(response.data.data.vdo_price);

            const totalPlans: Plans[] = plans.map(({ brand_name, brand_logo, ...rest }: Plan) => ({
                brand_name,
                brand_logo,
                ...rest,
            }));
            setPlans(totalPlans);

            // get usage
            let totalUsage: number[] = plans.map((plan: any) => plan.usage);
            setUsageData(totalUsage);

            // get supply
            let totalSupply: number[] = plans.map((plan: any) => plan.supply);
            setSupplyData(totalSupply);

            // get solar for all plan
            let solarEnergy: number[] = plans.map((plan: any) => -plan.solar);
            setSolarData(solarEnergy);
        } catch (error) {
            console.error();
        }
    };

    const data = {
        labels: plans?.map((plan) => plan.brand_name),
        // labels: ['AGL', 'AGL', 'AGL', 'AGL', 'AGL', 'AGL'],
        datasets: [
            {
                label: 'Solar',
                data: solarData?.map((solar) => solar),
                // data: [-200, -300, -400, -200, -400, -238],
                backgroundColor: 'rgba(244, 238, 0, 1)',
                barThickness: barSize,
                datalabels: {
                    color: 'black',
                    anchor: 'end' as Anchor,
                    align: 'start' as Align,
                    formatter: (value: number) => `$${Math.abs(Number(value.toFixed(0)))}`,
                },
            },
            {
                label: 'Supply',
                data: supplyData?.map((supply) => supply),
                // data: [200, 300, 400, 200, 400, 238],
                backgroundColor: 'rgba(165, 104, 210, 1)',
                barThickness: barSize,
                datalabels: {
                    color: 'white',
                    anchor: 'start' as Anchor,
                    align: 'right' as Align,
                    formatter: (value: number) => `$${value.toFixed(0)}`,
                },
            },
            {
                label: 'Usage',
                data: usageData?.map((usage) => usage),
                // data: [200, 300, 400, 200, 400, 238],
                backgroundColor: 'rgba(35, 183, 229, 1)',
                barThickness: barSize,
                datalabels: {
                    color: 'white',
                    anchor: 'center' as Anchor,
                    align: 'start' as Align,
                    formatter: (value: number) => `$${value.toFixed(0)}`,
                },
            },
        ],
    };

    // const handleDrawImage = (chart: ChartJS) => {
    //     const { ctx } = chart;
    //     const dataLength = plans ? plans.length : 0;
    //     const chartHeight = chart.chartArea.height;
    //     const step = (chartHeight - barSize * dataLength) / dataLength;
    //     const yOffset = 30;
    //     ctx.save();
    //     plans?.forEach((item, i) => {
    //         let newImage = new Image();
    //         newImage.src = agl;
    //         const imageY = i * (barSize + step) + yOffset;
    //         ctx.drawImage(newImage, 0, imageY, 30, 30);
    //     });
    //     ctx.restore();
    // };

    const chartOptions: ChartOptions<'bar'> = {
        indexAxis: 'y',
        responsive: true,
        normalized: true,
        maintainAspectRatio: false,
        backgroundColor: 'rgba(242,242,242,1)',
        plugins: {
            legend: {
                display: false,
            },
            annotation: {
                annotations: [
                    {
                        id: 'a-line-1',
                        type: 'line' as const, // important, otherwise typescript complains
                        scaleID: 'x',
                        value: vdo,
                        borderColor: 'rgba(255,179,41,1)',
                        borderWidth: 1,
                        borderDash: [5, 5],
                        label: {
                            display: true,
                            rotation: 270,
                            padding: {
                                x: 10,
                                y: 6,
                            },
                            xAdjust: 0,
                            backgroundColor: 'rgba(255,179,41,1)',
                            borderRadius: 6,
                            content: 'VDO',
                            position: 'start',
                        },
                    },
                ],
            },
            tooltip: {
                backgroundColor: 'rgba(255,255,255,1)',
                bodyColor: '#333',
                bodyFont: {
                    size: 14,
                    weight: 'normal',
                },
                callbacks: {
                    title: () => {
                        // Returning empty array to hide title
                        return [];
                    },
                    label: (tooltipItem: TooltipItem<'bar'>): string[] => {
                        if (!plans) {
                            return ['No data available'];
                        }

                        const { dataIndex } = tooltipItem;
                        const currentPlan = plans[dataIndex];

                        return [
                            `Offer: ${currentPlan.offer}`,
                            `ID: ${currentPlan._id}`,
                            `VDO: ${currentPlan.vdo_percentage}% ${currentPlan.total > vdo ? '' : 'off'}`,
                            `Supply: $${currentPlan.supply.toFixed(0)}`,
                            `Usage:  $${currentPlan.usage.toFixed(0)}`,
                            `Total: $${currentPlan.total.toFixed(0)}`,
                        ];
                    },
                },
            },
        },
        scales: {
            x: {
                // max: vdo,
                stacked: true,
                ticks: {
                    callback: function (value) {
                        if (typeof value !== 'string') {
                            return `$${Math.abs(value)}`;
                        }
                    },
                },
            },
            'x-axis-2': {
                position: 'top',
                grid: {
                    drawOnChartArea: false,
                },
                ticks: {
                    callback: (value: any) => {
                        while ((value / vdo - 1) * 100 > -30) {
                            return `${((value / vdo - 1) * 100).toFixed(0)}%`;
                        }
                    },
                },
                min: 0,
                max: vdo,
            },
            y: {
                stacked: true,
                ticks: {
                    display: true,
                },
                grid: {
                    display: true,
                },
            },
        },
    };

    let hoverValue: any = undefined;

    return (
        <div className="col-span-9">
            <div className="w-full flex items-center justify-center">
                <Bar
                    data={data}
                    height={400}
                    options={chartOptions}
                    plugins={[
                        {
                            id: 'hoverSegment',
                            beforeDatasetDraw: (chart) => {
                                const {
                                    ctx,
                                    chartArea: { left, right },
                                    scales: { y },
                                } = chart;
                                ctx.save();

                                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                                const segmentWidth = y.getPixelForValue(1) - y.getPixelForValue(0); // Assuming bars are evenly spaced

                                if (hoverValue !== undefined) {
                                    const yPosition = y.getPixelForValue(hoverValue);
                                    const xStart = left; // Adjust if necessary based on chart margins
                                    const xEnd = right; // Adjust if necessary based on chart margins
                                    ctx.fillRect(xStart, yPosition - segmentWidth / 2, xEnd - xStart, segmentWidth); // Draw the hover effect
                                }
                            },
                            afterEvent: (chart, args) => {
                                const {
                                    scales: { y },
                                } = chart;

                                if (args.inChartArea && args.event.y !== null) {
                                    hoverValue = y.getValueForPixel(args.event.y);
                                } else {
                                    hoverValue = undefined;
                                }
                                args.changed = true;
                            },
                        },
                        ChartDataLabels,
                    ]}
                />
            </div>
        </div>
    );
};

export default DemoChart;
