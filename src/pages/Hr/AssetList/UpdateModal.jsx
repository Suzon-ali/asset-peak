import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../utility/Loaders/Spinner";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const EditAssetModal = ({ setShowUpdateModal, assetId , productListRefetch }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [editLoading, setEditLoading] = useState(false);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const res = await axiosSecure.get(`/assets/${assetId}`);
        setAsset(res.data);
        setValue("productName", res.data.productName);
        setValue("productType", res.data.productType);
        setValue("productQuantity", res.data.productQuantity);
        setImagePreview(res.data.productImage);
      } catch (error) {
        console.error("Error fetching asset:", error);
      }
    };
    fetchAsset();
  }, [axiosSecure, assetId, setValue]);

  const onSubmit = async (data) => {
    setEditLoading(true);
    const formData = new FormData();
    formData.append("image", data.productImage[0]);
    const imageResponse = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (imageResponse.data.success) {
      const productImageUrl = imageResponse.data.data.url;

      const updatedAsset = {
        productName: data.productName,
        productType: data.productType,
        productImage: productImageUrl,
        productQuantity: parseInt(data.productQuantity),
        productProvider: user?.email,
        productUpdated: new Date(),
      };

      try {
        const res = await axiosSecure.put(`/assets/${assetId}`, updatedAsset);
        if (res.status === 200) {
          console.log(res)
          toast.success("Asset updated");
          productListRefetch();
          reset();
          setEditLoading(false);
          setShowUpdateModal(false);
        }
      } catch (error) {
        console.error("Error updating asset:", error);
        toast.error("Failed to update asset");
        setEditLoading(false);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-gray-300/50 z-10 flex items-center justify-center min-h-screen py-5 ">
      <div className="p-4 relative">
        <button
          onClick={() => setShowUpdateModal(false)}
          className="absolute right-8 top-8 bg-red-500 hover:bg-red-700 size-6 text-white rounded-full cursor-pointer flex justify-center items-center text-sm"
        >
          x
        </button>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full max-h-[85dvh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Edit Asset Details
          </h2>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              {...register("productName", {
                required: "Product Name is required",
              })}
              placeholder="Product name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productName.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Type
            </label>
            <select
              {...register("productType", {
                required: "Product Type is required",
              })}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option selected disabled value="">
                Select Type
              </option>
              <option value="returnable">Returnable</option>
              <option value="non-returnable">Non-Returnable</option>
            </select>
            {errors.productType && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productType.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("productImage", {
                required: "Product Image is required",
              })}
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.productImage && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productImage.message}
              </p>
            )}
          </div>

          {imagePreview && (
            <div className="mb-4 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Product Preview"
                className="w-full h-auto max-h-20 object-cover rounded-lg"
              />
            </div>
          )}

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Quantity
            </label>
            <input
              type="number"
              {...register("productQuantity", {
                required: "Product Quantity is required",
                min: 1,
              })}
              placeholder="Product QTY"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.productQuantity && (
              <p className="text-red-500 text-sm mt-1">
                {errors.productQuantity.message}
              </p>
            )}
          </div>

          <button
            disabled={editLoading}
            type="submit"
            className={`w-full flex justify-center items-center  text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 ${
              editLoading ? "bg-indigo-400 cursor-wait" : "bg-indigo-500 "
            }`}
          >
            {!editLoading ? "Update" : <Spinner />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAssetModal;
