import { Helmet } from "react-helmet";
import AboutCompany from "./AboutCompany";
import Banner from "./Banner";
import OurCustomers from "./OurCustomers";
import Pricing from "./Pricing";
import useAuth from '../../hooks/useAuth';
import PendingRequest from "./Employee/PendingRequest";
import MonthlyRequest from "./Employee/MonthlyRequest";
import useAdmin from '../../hooks/useAdmin';
import CalenderEvents from "./Employee/CalenderEvents";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HrHome from "./Hr/HrHome";

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isPaid, setIsPaid] = useState(false);
  const [isPaidLoading, setIsPaidLoading] = useState(true);
  const [role, roleLoading] = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && user?.email) {
      setIsPaidLoading(true);
      axiosSecure.get(`/users/hr/${user.email}`)
        .then(res => {
          console.log(res.data);
          setIsPaid(res.data.paid);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsPaidLoading(false);
        });
    }
  }, [authLoading, user, axiosSecure]);

  useEffect(() => {
    if (user && role === 'hr' && !isPaid && !authLoading && !roleLoading && !isPaidLoading) {
      navigate('/checkout');
    }
  }, [user, role, isPaid, authLoading, roleLoading, isPaidLoading, navigate]);


  return (
    <>
      <Helmet>
        <title>AssetPeak | Home</title>
      </Helmet>
      {!user && <>
        <Banner />
        <OurCustomers />
        <AboutCompany />
        <Pricing />
      </>}
      {user && role === 'employee' && <>
        <PendingRequest />
        <MonthlyRequest />
        <CalenderEvents />
      </>}
      {user && role === 'hr' && <>
        <HrHome />
      </>}
    </>
  );
}

export default Home;
