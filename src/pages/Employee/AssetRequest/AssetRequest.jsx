
import { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';


function AssetRequest() {
  
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");

  let query = "";
  if (type !== "") {
    query += `&productType=${type}`;
  }
  if (status !== "") {
    query += `&status=${status}`;
  }
  if (search !== "") {
    query += `&productName=${search}`;
  }
  if (sortBy !== "") {
    query += `&sortBy=${sortBy}`;
  }

  console.log(query);

  const {
    data: assets,
    isLoading: isAssetsLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "assets"],
    enabled: user?.email !== undefined && !loading,
    queryFn: async () => {
      try {
        if (!user?.email) {
          throw new Error("User email is not available.");
        }
        const res = await axiosSecure.get(
          `/assets?productProvider=${user.email}${query}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [search, type, status, sortBy, refetch]);


  const handleCancelRequest = async (assetId) => {
    try {
      await axiosSecure.delete(`/assets/${assetId}/request`);
      
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  const handlePrintDetails = async (assetId) => {
    // Handle printing details here
  };

  const handleReturnAsset = async (assetId) => {
    // Handle returning asset here
  };

  return (
    <>
      <Helmet>
        <title>Request for Asset</title>
      </Helmet>
      <div className="max-w-screen-xl m-0 py-10 shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-4/5 ">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              My Requested Assets
            </h1>
            {/* Search Section */}
            <div className="w-full mt-8 mb-6">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* Filter Section */}
            <div className="w-full flex justify-between mb-6 gap-4">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Filter by status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-1/2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              >
                <option value="">Filter by type</option>
                <option value="returnable">Returnable</option>
                <option value="non-returnable">Non-Returnable</option>
              </select>
            </div>
            {/* Asset List Section */}
            <div className="w-full overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Asset Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Asset Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Availability
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Request Button
                    </th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {assets && assets.map((asset) => (
                    <tr key={asset.id} className="border-b border-gray-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.productName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.productType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.requestDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.approvalDate}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {asset.status === "pending" && (
                          <button
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleCancelRequest(asset.id)}
                          >
                            Cancel Request
                          </button>
                        )}
                        {asset.status === "approved" && (
                          <button
                            className="text-green-500 hover:text-green-600"
                            onClick={() => handlePrintDetails(asset.id)}
                          >
                            Print Details
                          </button>
                        )}
                        {asset.status === "approved" &&
                          asset.type === "returnable" && (
                            <button
                              className="text-blue-500 hover:text-blue-600"
                              onClick={() => handleReturnAsset(asset.id)}
                            >
                              Return Asset
                            </button>
                          )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AssetRequest;
