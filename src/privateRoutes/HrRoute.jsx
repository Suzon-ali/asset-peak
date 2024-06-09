import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useAdmin from "../hooks/useAdmin";
import RefreshLoader from '../utility/Loaders/RefreshLoader';

const HrRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isPaid, setIsPaid] = useState(false);
  const [isPaidLoading, setIsPaidLoading] = useState(true);
  const [role, roleLoading] = useAdmin();

  useEffect(() => {
    if (!authLoading && user?.email) {
      setIsPaidLoading(true);
      axiosSecure.get(`/users/hr/${user?.email}`)
        .then(res => {
          setIsPaid(res?.data?.paid);
          console.log('isPaid:', res?.data?.paid); 
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setIsPaidLoading(false);
        });
    }
  }, [authLoading, user, axiosSecure]);

  console.log('User:', user); 
  console.log('Role:', role); 

  if (authLoading || roleLoading || isPaidLoading) {
    return <RefreshLoader />
  }

  if (user && role === 'hr' && isPaid) {
    return children;
  }

  return <Navigate to="/checkout" />;
}

export default HrRoute;
