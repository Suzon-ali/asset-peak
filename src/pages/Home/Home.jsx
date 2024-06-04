
import { Helmet } from "react-helmet"
import AboutCompany from "./AboutCompany"
import Banner from "./Banner"
import OurCustomers from "./OurCustomers"
import Pricing from "./Pricing"

const Home = () => {


  return (
    <>
    <Helmet>
        <title>AssetPeak | Home</title>
      </Helmet>
    <Banner />
    <OurCustomers />
    <AboutCompany />
    <Pricing />
    </>
  )
}

export default Home