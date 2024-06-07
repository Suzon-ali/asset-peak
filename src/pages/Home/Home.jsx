
import { Helmet } from "react-helmet"
import AboutCompany from "./AboutCompany"
import Banner from "./Banner"
import OurCustomers from "./OurCustomers"
import Pricing from "./Pricing"
import useAuth from '../../hooks/useAuth';
import PendingRequest from "./Employee/PendingRequest"
import MonthlyRequest from "./Employee/MonthlyRequest"
import useAdmin from '../../hooks/useAdmin';
import CalenderEvents from "./Employee/CalenderEvents"

const Home = () => {

  const {user} = useAuth();
  const [role] = useAdmin();

  return (
    <>
    <Helmet>
        <title>AssetPeak | Home</title>
      </Helmet>
    {!user && <><Banner />
    <OurCustomers />
    <AboutCompany />
    <Pricing /></>}

    {user && role === 'employee' && <>
    <PendingRequest />
    <MonthlyRequest />
    <CalenderEvents />
    </>}
    </>
    
  )
}

export default Home