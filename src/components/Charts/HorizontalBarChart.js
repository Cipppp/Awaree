import React from 'react';
import { HorizontalBar, defaults } from 'react-chartjs-2';

defaults.global.defaultFontFamily = 'Josefin Sans';

function HorizontalBarChart({ sectionLabel, colors, dataset }) {
    return (
        <div>
            <HorizontalBar
                data={{
                    labels: sectionLabel,
                    datasets: [
                        {
                            data: dataset,
                            backgroundColor: colors,
                            borderWidth: 4,
                        },
                    ],
                }}
                height={550}
                width={550}
                options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    beginAtZero: true,
                                },
                            },
                        ],
                    },

                    legend: {
                        display: false,
                    },

                    title: {
                        display: true,
                        fontSize: 13,
                    },
                }}
            />
        </div>
    );
}

export default HorizontalBarChart;
