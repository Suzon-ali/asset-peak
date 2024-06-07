import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from "../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

function JoinasHr() {
  const { user, createUser, updateUserProfile, setLoading, loading } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset, formState: { errors }, watch } = useForm();

  const imageFile = watch("company_logo");

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        setPreviewImageUrl(fileReader.result);
      };
      fileReader.readAsDataURL(imageFile[0]);
    } else {
      setPreviewImageUrl("");
    }
  }, [imageFile]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      // Upload the image to the hosting service
      const formData = new FormData();
      formData.append('image', data.company_logo[0]);
      const imageResponse = await axiosPublic.post(image_hosting_api, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (imageResponse.data.success) {
        const imageUrl = imageResponse.data.data.url;

        await updateUserProfile(data.name, imageUrl);

        // Create user entry in the database
        const userInfo = {
          name: data.name,
          email: data.email.toLowerCase(),
          birthday: data.birthday,
          company_name: data.company_name,
          company_logo: imageUrl,
          role: 'hr',
          package: data.package,
          
        };
        const res = await axiosPublic.post('/users', userInfo);
        if (res.data.insertedId) {
          reset();
          toast.success("Registered successfully!");
          navigate('/checkout');
        } else {
          setLoginError("User registration failed.");
        }
      }
    } catch (error) {
      setLoginError(error.message || "An error occurred during registration.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>AssetPeak | Join as HR</title>
      </Helmet>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign up to AssetPeak
            </h1>
            <div className="w-full flex-1 mt-8">
              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
                <div>
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Full name"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-2">{errors.name.message}</p>}
                </div>

                <div className="mt-5">
                  <input
                    {...register("company_name", { required: "Company is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Company name"
                  />
                  {errors.company_name && <p className="text-red-600 text-xs mt-2">{errors.company_name.message}</p>}
                </div>

                <div className="mt-5">
                  <div className="flex items-center w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                    <input
                      {...register("company_logo", { required: "Company logo is required" })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="file"
                    />
                    <div className="flex justify-center items-center p-4 w-20 h-full border-l text-center">
                      {previewImageUrl ? <img src={previewImageUrl} alt="Company Logo" className="w-full h-auto" /> : "Company logo"}
                    </div>
                  </div>
                  {errors.company_logo && <p className="text-red-600 text-xs mt-2">{errors.company_logo.message}</p>}
                </div>

                <div className="mt-5">
                  <input
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" } })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-2">{errors.email.message}</p>}
                </div>

                <div className="mt-5">
                  <input
                    {...register("password", { required: "Password is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  {errors.password && <p className="text-red-600 text-xs mt-2">{errors.password.message}</p>}
                </div>

                <div className="mt-5">
                    <select
                      {...register("package", { required: "Package selection is required" })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    >
                      <option value="">Select Package</option>
                      <option value="5">5 Members for $5</option>
                      <option value="8">10 Members for $8</option>
                      <option value="15">20 Members for $15</option>
                    </select>
                    {errors.package && <p className="text-red-600 text-xs mt-2">{errors.package.message}</p>}
                  </div>

                <div className="mt-5">
                  <div className="flex items-center w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                    <input
                      {...register("birthday", { required: "Date is required" })}
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      type="date"
                      placeholder="Date"
                    />
                    <div className="flex justify-center items-center p-4 w-20 h-full border-l">
                      Birthday
                    </div>
                  </div>
                  {errors.birthday && <p className="text-red-600 text-xs mt-2">{errors.birthday.message}</p>}
                </div>

                <div className="mt-5 flex items-center">
                  <input
                    id="showPassword"
                    type="checkbox"
                    className="mr-2"
                    checked={showPassword}
                    onChange={handleShowPassword}
                  />
                  <label htmlFor="showPassword" className="text-sm text-gray-600">Show Password</label>
                </div>

                <button
                  type="submit" disabled={loading}
                  className={`mt-5 tracking-wide font-semibold bg-indigo-600 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none ${loading && 'bg-indigo-700'}`}
                >
                  {!loading ? (
                    <>
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Sign Up</span>
                    </>
                  ) : (
                    <div
                      className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                      role="status"
                    >
                      <span
                        className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                      >Loading...</span>
                    </div>
                  )}
                </button>

                {loginError && (
                  <p className="mt-6 text-xs text-red-600 text-center">{loginError}</p>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-indigo-50 text-center hidden lg:flex">
          <div
            className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default JoinasHr;
