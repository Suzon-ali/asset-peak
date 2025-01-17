import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "./Modal";
import UpdateModal from "./UpdateModal";
import { Helmet } from "react-helmet";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [assetId, setAssetId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [assetIdToDelete, setAssetIdToDelete] = useState(null);

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

  
  const handleUpdateAsset = (assetId) => {
    setShowUpdateModal(true);
    setAssetId(assetId)
    console.log("Update Asset:", assetId);
  };


  const handleDeleteAsset = async (assetId) => {
    setAssetIdToDelete(assetId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const res = await axiosSecure.delete(`/assets/${assetIdToDelete}`);
      console.log(res);
      if (res.status === 200) {
        toast.success("Deleted");
        refetch();
      } else {
        toast.error("Failed to delete asset");
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      toast.error("Failed to delete asset");
    } finally {
      setShowModal(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setAssetIdToDelete(null);
  };


  return (
    <div className="max-w-5xl mx-auto py-8 px-2 lg:px-0">

<Helmet>
        <title>AssetPeak | Asset List</title>
      </Helmet>


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
                Product Quantity
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
                    <img className="size-14" src={asset.productImage} alt="" />
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
                      className="text-blue-500 hover:text-blue-600"
                      onClick={() => handleUpdateAsset(asset._id)}
                    >
                      Update
                    </button>

                    <button
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleDeleteAsset(asset._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Delete conrim Modal */}

      {showModal && (
        <Modal
          title="Confirmation"
          onClose={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        >
          Are you sure you want to delete this asset?
        </Modal>
      )}

      {showUpdateModal  && <UpdateModal productListRefetch={refetch} assetId={assetId} setShowUpdateModal={setShowUpdateModal} />}
    </div>
  );
};

export default AssetList;
