import React, { useState } from 'react';
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import toast from "react-hot-toast";
import useMyInfo from "../../../hooks/useMyInfo";

import { PDFViewer } from '@react-pdf/renderer';
import AssetPDF from './AssetPDF';

const MyAsset = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [selectedAsset, setSelectedAsset] = useState(null); // To store the selected asset

  let query = "";
  if (type !== "") {
    query += `&productType=${type}`;
  }
  if (status !== "") {
    query += `&requestStatus=${status}`;
  }
  if (search !== "") {
    query += `&productName=${search}`;
  }

  const {
    data: assets,
    isLoading: isAssetsLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "requests"],
    enabled: user?.email !== undefined && !loading,
    queryFn: async () => {
      try {
        if (!user?.email) {
          throw new Error("User email is not available.");
        }
        const res = await axiosSecure.get(
          `/requests?requestedBy=${user?.email}${query}`
        );
        return res.data;
      } catch (error) {
        console.error("Error fetching assets:", error);
        throw error;
      }
    },
  });

  const handleCancelRequest = async (assetId) => {
    if (!assetId) {
      return;
    }
    try {
      const res = await axiosSecure.delete(`/requests/${assetId}`);
      if (res.status === 200) {
        toast.success("Request Canceled");
        refetch();
      } else {
        toast.error("Failed to cancel request");
      }
    } catch (error) {
      console.error("Error canceling request:", error);
      toast.error("Failed to cancel request");
    }
  };

  const handleRequestReturn = async (assetId) => {
    console.log(assetId)
    const requestInfo = {
      requestStatus: 'returned'
    }
    if (!assetId) {
      return;
    }
    try {
      const res = await axiosSecure.put(`/requests/${assetId}`, requestInfo);
      if (res.status === 200) {
        toast.success("Request Canceled");
        refetch();
      } else {
        toast.error("Failed to cancel request");
      }
    } catch (error) {
      console.error("Error canceling request:", error);
      toast.error("Failed to cancel request");
    }
  };

  const handlePrint = (asset) => {
    setSelectedAsset(asset); // Set the selected asset when the print button is clicked
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
          <label className="block font-semibold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">Default</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Request Date
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
                    {asset.requestStatus}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {moment(asset.requestedDate).format("YYYY-MM-DD")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    {asset.requestStatus === "pending" && (
                      <button
                        className={`text-yellow-600 hover:text-blue-600`}
                        onClick={() => handleCancelRequest(asset._id)}
                      >
                        Cancel
                      </button>
                    )}

                    {asset.requestStatus === "approved" &&
                      asset.productType === "returnable" && (
                        <button
                          className={`text-violet-500 hover:text-blue-600`}
                          onClick={() => handleRequestReturn(asset._id)}
                        >
                          Return
                        </button>
                      )}

                    {asset.requestStatus === "approved" &&
                      asset.productType !== "returnable" && (
                        <button
                          className={`text-violet-500 hover:text-blue-600`}
                          onClick={() => handlePrint(asset)}
                        >
                          Print
                        </button>
                      )}

                    {/* Display the PDF viewer only when the selected asset matches the current asset */}
                    {selectedAsset && selectedAsset._id === asset._id && (
                      <PDFViewer width="100%" height={600}>
                        <AssetPDF asset={asset} />
                      </PDFViewer>
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAsset;

