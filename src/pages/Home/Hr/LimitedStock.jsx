import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "../../Hr/AssetList/Modal";
import EditAssetModal from "../../Hr/AssetList/UpdateModal";

const LimitedStock = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [assetId, setAssetId] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [assetIdToDelete, setAssetIdToDelete] = useState(null);

  const {
    data: limitedAssets,
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
          `/assets/admin/limited-stock?productProvider=${user.email}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }
    },
  });

  console.log(limitedAssets, "limitedAssets");

  const handleUpdateAsset = (assetId) => {
    setShowUpdateModal(true);
    setAssetId(assetId);
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
    <div className="max-w-6xl mx-auto py-8 px-2 lg:px-4">
      <h2 className="text-xl font-semibold mb-6">Limited Stocks</h2>

      {/* List Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-200">
             
              <th className="px-4 py-2">Product Image</th>
              <th className="px-4 py-2">Product Name</th>
              <th className="px-4 py-2">Product Type</th>
              <th className="px-4 py-2">Product Quantity</th>
              <th className="px-4 py-2">Date Added</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {limitedAssets &&
              limitedAssets.map((asset) => (
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

      {showUpdateModal && (
        <EditAssetModal
          productListRefetch={refetch}
          assetId={assetId}
          setShowUpdateModal={setShowUpdateModal}
        />
      )}
    </div>
  );
};

export default LimitedStock;
