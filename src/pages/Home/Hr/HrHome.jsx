import Chart from "./Chart";
import LimitedStock from "./LimitedStock";
import PendingRequest from "./PendingRequest";
import TopRequest from "./TopRequest";

const HrHome = () => {
  return (
    <div className="pt-5">
      <PendingRequest />
      <TopRequest />
      <LimitedStock />
      <Chart />

      
    </div>
  );
};

export default HrHome;
