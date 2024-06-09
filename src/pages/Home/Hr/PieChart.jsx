import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ returnableItems, nonReturnableItems }) => {
  const data = {
    labels: ['Returnable Items', 'Non-Returnable Items'],
    datasets: [
      {
        label: '% of Items',
        data: [returnableItems, nonReturnableItems],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full  mx-auto flex flex-col justify-center items-center rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">Items Requested by Employee</h2>
      <div className="w-full h-80 md:h-96">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
