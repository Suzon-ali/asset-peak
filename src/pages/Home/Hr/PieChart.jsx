import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import useMyInfo from '../../../hooks/useMyInfo';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [returnableItems, setReturnableItems] = useState(0);
  const [nonReturnableItems, setNonReturnableItems] = useState(0);
  const [myInfo] = useMyInfo();

  const {company_name} = myInfo || {};

  const { data: requests, isLoading, error } = useQuery({
    queryKey: [company_name, 'requests'],
    queryFn: async () => {
      if (!company_name) {
        throw new Error('Company name is not available.');
      }
      const res = await axios.get(`/requests/admin?productCompanyName=${company_name}`);
      return res.data;
    },
    enabled: !!company_name,
    onError: (error) => console.error('Error fetching assets:', error),
  });

  useEffect(() => {
    if (requests) {
      const returnableCount = requests.filter(item => item.productType === 'non-returnable').length;
      const nonReturnableCount = requests.filter(item => item.productType === 'returnable').length;
      setReturnableItems(returnableCount);
      setNonReturnableItems(nonReturnableCount);

      console.log('Returnable Items:', returnableCount);
      console.log('Non-Returnable Items:', nonReturnableCount);
    }
  }, [requests]);

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
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="w-full mx-auto flex flex-col justify-center items-center rounded-lg">
      <h2 className="text-lg font-semibold text-center mb-4">Items Requested by Employee</h2>
      <div className="w-full h-80 md:h-96">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
