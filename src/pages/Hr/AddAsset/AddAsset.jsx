import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../utility/Loaders/Spinner";
import useMyInfo from "../../../hooks/useMyInfo";
import { Helmet } from "react-helmet";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddAsset = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [imagePreview, setImagePreview] = useState(null);
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const [addLaoding, setAddLoading] = useState(false);
  const [myInfo] = useMyInfo();


  const onSubmit = async (data) => {
    setAddLoading(true);
    const formData = new FormData();
    formData.append("image", data.productImage[0]);
    const imageResponse = await axiosPublic.post(image_hosting_api, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (imageResponse.data.success) {
      const productImageUrl = imageResponse.data.data.url;

      const asset = {
        productName: data.productName,
        productType: data.productType,
        productImage: productImageUrl,
        productQuantity: parseInt(data.productQuantity),
        productProvider: user?.email,
        productAddedDate: new Date(),
        productCompanyName: myInfo?.company_name
      };

      const res = await axiosSecure.post("/assets", asset);

      if (res.data.insertedId) {
        toast.success("Product added");
        reset();
        setAddLoading(false);
      }

      reset();
      setImagePreview(null);
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
    <div className="flex items-center justify-center min-h-screen py-5 ">

<Helmet>
        <title>AssetPeak | Add asset</title>
      </Helmet>


      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Add New Asset</h2>

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
              className="w-full size-40 object-cover rounded-lg"
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
          disabled={addLaoding}
          type="submit"
          className={`w-full flex justify-center items-center  text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 ${
            addLaoding ? "bg-indigo-400 cursor-wait" : "bg-indigo-500 "
          }`}
        >
          {!addLaoding ? (
            "Add"
          ) : (
            <>
              <Spinner />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddAsset;
