import React from 'react';
import { Bar, defaults, Chart } from 'react-chartjs-2';

// defaults.defaultFontFamily = 'Arial';
defaults.font.family = 'Josefin Sans';

function BarChart({ sectionLabel, colors, dataset }) {
    return (
        <Bar
            data={{
                labels: sectionLabel,
                datasets: [
                    {
                        label: 'Homework',
                        data: dataset,
                        // backgroundColor: colors,
                        backgroundColor: colors,
                    },
                ],
            }}
            height={550}
            width={550}
            options={{
                options: {
                    plugins: {
                        legend: {
                            display: false,
                        },
                    },
                },
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                tooltips: {
                    callbacks: {
                        label: function (tooltipItem) {
                            console.log(tooltipItem);
                            return tooltipItem.yLabel;
                        },
                    },
                },
                // scales: {
                //     yAxes: [
                //         {
                //             ticks: {
                //                 beginAtZero: true,
                //             },
                //         },
                //     ],
                // },
            }}
        />
    );
}

export default BarChart;
