import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const usePaid = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isPaid, isLoading: isPaidLoading } = useQuery({
    queryKey: [user?.email, 'isPaid'],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      console.log('Checking if user is paid:', user);
      const res = await axiosSecure.get(`/users/hr/${user.email}`);
      return res.data?.paid;
    }
  });

  return [isPaid, isPaidLoading];
};

export default usePaid;
