import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAuth from "../../../hooks/useAuth";


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
  const {user} = useAuth();
  const [addLaoding, setAddLoading] = useState(false);

  const onSubmit = async (data) => {
    setAddLoading(true)
    const formData = new FormData();
    formData.append("image", data.productImage[0]);
    const imageResponse = await axiosPublic.post(
      image_hosting_api,formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (imageResponse.data.success) {
      const productImageUrl = imageResponse.data.data.url;

      const asset = {
        productName: data.productName,
        productType: data.productType,
        productImage: productImageUrl,
        productQuantity: data.productQuantity,
        productProvider: user?.email,
        productAddedDate: new Date(),
      };

      const res = await axiosSecure.post("/assets", asset);

      if (res.data.insertedId) {
        toast.success("Product added");
        reset();
        setAddLoading(false)
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
            {...register("productType",{
              required: "Product Type is required",
            })}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option selected disabled value="">Select Type</option>
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
              className=" size-40 object-cover rounded-lg"
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

        <button disabled={addLaoding}
          type="submit"
          className={`w-full flex justify-center items-center  text-white py-2 rounded-lg font-semibold hover:bg-indigo-600 transition duration-300 ${addLaoding ? 'bg-indigo-400 cursor-wait' : 'bg-indigo-500 '}`}
        >
          {!addLaoding ? 'Add' : <><div role="status">
    <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-indigo-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div> </>}
        </button>

        
        
      </form>
    </div>
  );
};

export default AddAsset;
