

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useMyInfo = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: myInfo, isPending: isMyInfoPending} = useQuery({
        queryKey: [user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/me/${user.email}`);
            return res.data;
        }
    })
    return [myInfo, isMyInfoPending]
};

export default useMyInfo;