import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";

const MonthlyRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).toISOString();
  const firstDayOfNextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1).toISOString();

  let query = `&startDate=${firstDayOfMonth}&endDate=${firstDayOfNextMonth}`;

  const { data: Monthlyassets, isLoading: isAssetsLoading, refetch } = useQuery({
    queryKey: [user?.email, "requests", firstDayOfMonth, firstDayOfNextMonth],
    enabled: user?.email !== undefined && !loading,
    queryFn: async () => {
      try {
        if (!user?.email) {
          throw new Error("User email is not available.");
        }
        const res = await axiosSecure.get(`/requests/monthly?requestedBy=${user?.email}${query}`);
        console.log("Response: ", res.data);  // Debugging: log the response
        return res.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }
    },
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 lg:px-0">
      <h2 className="text-xl font-semibold mb-6">#My Monthly Request</h2>

      <div className="bg-white rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-300">
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Product Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Request Date
              </th>
            </tr>
          </thead>
          <tbody>
            {Monthlyassets && Monthlyassets.map((asset) => (
              <tr key={asset._id} className="border-b border-gray-200">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img className="size-14" src={asset.productImage} alt="" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {asset.productName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {asset.productType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {asset.requestStatus}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {moment(asset.requestedDate).format("YYYY-MM-DD")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MonthlyRequest;
