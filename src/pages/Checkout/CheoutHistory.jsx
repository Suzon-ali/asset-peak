import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet";

const CheoutHistory = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data,
    error: queryError,
    isLoading: queryLoading,
    refetch,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user?.email}`);
      return res.data;
    },
    enabled: !!user?.email && !loading,
    retry: false,
  });

console.log(data)


  return (
    <div className="mb-10">
       <Helmet>
        <title>AssetPeak | Checkout History</title>
      </Helmet>
      <h2 className="p-2 font-semibold">#Transaction Histories</h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-2">
        <table className="w-full text-sm text-left rtl:text-right ">
          <thead className="text-xs uppercase bg-indigo-200">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">#</div>
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>

              <th scope="col" className="px-6 py-3">
                TNX ID
              </th>
            </tr>
          </thead>
          <tbody>
            {data && data.map((d, index)=>{
                const {date,email,price,status,transactionId, _id} = d || {};

              return <tr key={_id} className="bg-white border-b ">
              <td className="w-4 p-4">
                <div className="flex items-center">{index +1}</div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {date}
              </th>
              <td className="px-6 py-4">{email}</td>
              <td className="px-6 py-4">{price}</td>
              <td className="px-6 py-4">{status}</td>
              <td className="px-6 py-4">{transactionId}</td>
            </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CheoutHistory;
