import React from 'react';
import { Pie, defaults } from 'react-chartjs-2';

// defaults.global.defaultFontFamily = 'Josefin Sans';

function PieChart({ sectionLabel, colors, dataset }) {
    return (
        <div>
            <Pie
                data={{
                    labels: sectionLabel,
                    datasets: [
                        {
                            data: dataset,
                            backgroundColor: colors,
                            borderWidth: 0,
                        },
                    ],
                }}
                height={550}
                width={550}
                options={{
                    animation: {
                        duration: 1000,
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        display: false,
                    },

                    legend: {
                        position: 'top',
                        labels: {
                            fontSize: 13,
                            // fontColor: '#000',
                        },
                    },
                }}
            />
        </div>
    );
}

export default PieChart;
