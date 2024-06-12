import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useMyInfo from "../../../hooks/useMyInfo";
import RequestModal from "./RequestModal";

const AssetRequest = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [additionalInformation, setAdditionalInfo] = useState("");
  const [myInfo] = useMyInfo();
  const { company_name } = myInfo || {};

  const [showModal, setShowModal] = useState(false);
  const [assetToDelete, setAssetToDelete] = useState(null); // Renamed to assetToDelete for clarity

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
          `/assets?productCompanyName=${company_name}${query}`
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

  const handleRequestModal = (asset) => {
    setAssetToDelete(asset);
    setShowModal(true);
  };

  const handleConfirmRequest = async () => {
    const asset = assetToDelete;
    const requestInfo = {
      productID: asset._id,
      productName: asset.productName,
      productType: asset.productType,
      productImage: asset.productImage,
      requestStatus: "pending",
      requestedBy: user?.email,
      requestedDate: new Date(),
      approvalDate: "",
      description: additionalInformation,
    };
  
    try {
     
      const requestRes = await axiosSecure.post(`/requests`, requestInfo);
      if (requestRes.status === 200) {
       
        const updateRes = await axiosSecure.put(`/assets/${asset._id}`, {
          productQuantity: asset.productQuantity - 1,
        });
        if (updateRes.status === 200) {
          toast.success("Request Sent");
          refetch();
        } else {
          console.error("Failed to update asset quantity:", updateRes.data);
          toast.error("Failed to update asset quantity");
        }
      } else {
        console.error("Failed to send request:", requestRes.data);
        toast.error("Failed to send request");
      }
    } catch (error) {
      console.error("Error requesting asset:", error);
      toast.error("Failed to request asset");
      refetch();
    } finally {
      setShowModal(false);
    }
  };
  

  const handleCancelDelete = () => {
    setShowModal(false);
    setAssetToDelete(null); // Reset the asset to delete
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-2 lg:px-0">
      <h2 className="text-3xl font-semibold mb-6">Asset List Page</h2>

      {/* Search Section */}
      <div className="mb-6 w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name..."
          className="w-[92dvw] lg:w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="lg:flex items-center justify-between">
        {/* Filter Section */}
        <div className="mb-6 flex gap-4 items-center">
          <label className="block font-semibold ">Filter:</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="checkbox"
                className="form-checkbox"
                value="available"
                onChange={(e) => setStatus(e.target.checked ? "available" : "")}
              />
              <span className="ml-2">Available</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                value="out-of-stock"
                onChange={(e) =>
                  setStatus(e.target.checked ? "out-of-stock" : "")
                }
              />
              <span className="ml-2">Out-of-stock</span>
            </label>
          </div>
        </div>

        <div className="mb-6 flex gap-2 items-center">
          <label className="block font-semibold mb-2">Type:</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Types</option>
            <option value="returnable">Returnable</option>
            <option value="non-returnable">Non-returnable</option>
          </select>
        </div>

        {/* Sorting Section */}
        <div className="mb-6 flex items-center gap-2">
          <label className="block font-semibold mb-2">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Default</option>
            <option value="low">Quantity - Low to High</option>
            <option value="high">Quantity - High to Low</option>
          </select>
        </div>
      </div>

      {/* List Section */}
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
                Availability
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date Added
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {assets &&
              assets.map((asset) => (
                <tr key={asset._id} className="border-b border-gray-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <img
                      className="size-14"
                      src={asset.productImage}
                      alt={asset.productName}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.productName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.productType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {asset.productQuantity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(asset.productAddedDate).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      disabled={asset.productQuantity === 0}
                      className={`${
                        asset.productQuantity === 0
                          ? "text-blue-300"
                          : "text-blue-500 hover:text-blue-600"
                      }`}
                      onClick={() => handleRequestModal(asset)}
                    >
                      Request
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <RequestModal
          title="Confirmation"
          onClose={handleCancelDelete}
          onConfirm={handleConfirmRequest}
          setAdditionalInfo={setAdditionalInfo}
        >
          Are you sure you want to delete this asset?
        </RequestModal>
      )}
    </div>
  );
};

export default AssetRequest;
