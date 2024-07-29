
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProductPieChart = ({ product }) => {
  const { name, quantity, withdrawals } = product;

  const data = {
    labels: ['Retirado', 'Disponível'],
    datasets: [
      {
        data: [withdrawals, quantity - withdrawals],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += `: ${context.parsed} unidades`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '300px', margin: 'auto' }}>
      <h2>{name}</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ProductPieChart;
