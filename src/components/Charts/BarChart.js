import React from 'react';
import { Bar, defaults } from 'react-chartjs-2';

// defaults.defaultFontFamily = 'Arial';
defaults.font.family = 'Josefin Sans';
defaults.font.size = 13;

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
                            return tooltipItem.yLabel;
                        },
                    },
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                            },
                        },
                    ],
                },
            }}
        />
    );
}

export default BarChart;
