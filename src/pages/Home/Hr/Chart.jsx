
import PieChart from './PieChart';

const Chart = () => {
  const returnableItems = 70; // Example percentage
  const nonReturnableItems = 30; // Example percentage

  return (
    <div className=' flex justify-center items-center h-full w-full'>
     
      <PieChart returnableItems={returnableItems} nonReturnableItems={nonReturnableItems} />
    </div>
  );
};

export default Chart;
