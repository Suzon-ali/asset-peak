import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';

function JoinasHr() {
  const { user,
    signIn,
    googleSignIn,
    setLoading,
    loading
 } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoginError('');
    setLoading(true);
    try {
      await signIn(data.email, data.password);
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      setLoginError(error.message);
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setLoading(true);
    googleSignIn()
      .then(() => {
        navigate("/");
        toast.success("Logged in successfully!");
      })
      .catch((error) => {
        setLoginError(error.message);
        setLoading(false);
      });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Helmet>
        <title>AssetPeak | Login</title>
      </Helmet>
      <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
        <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign up to AssetPeak
            </h1>
            <div className="w-full flex-1 mt-8">

              <form onSubmit={handleSubmit(onSubmit)} className="mx-auto max-w-xs">
              <div >
                  <input
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Full name"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-2">{errors.name.message}</p>}
                </div>

                <div className="mt-5" >
                  <input
                    {...register("company_name", { required: "Company is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Company name"
                  />
                  {errors.name && <p className="text-red-600 text-xs mt-2">{errors.company_name.message}</p>}
                </div>

                <div className="mt-5">
                  <div className="flex items-center w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                  <input
                    {...register("company_logo", { required: "Company logo is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={"file"}
                    placeholder="Company logo"
                  />
                  <div className="flex justify-center items-center p-4 w-20 h-full border-l text-center">
                    Company logo
                  </div>
                  </div>
                  {errors.date && <p className="text-red-600 text-xs mt-2">{errors.date.message}</p>}
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
                  <input
                    {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Enter a valid email" } })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    placeholder="Email"
                  />
                  {errors.email && <p className="text-red-600 text-xs mt-2">{errors.email.message}</p>}
                </div>

                
                <div className="mt-5">
                  <div className="flex items-center w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                  <input
                    {...register("date", { required: "Date is required" })}
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type={"date"}
                    placeholder="Date"
                  />
                  <div className="flex justify-center items-center p-4 w-20 h-full border-l">
                    BirthDay
                  </div>
                  </div>
                  {errors.date && <p className="text-red-600 text-xs mt-2">{errors.date.message}</p>}
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
                  {!loading ? <><svg
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
                  <span className="ml-3">Sign Up</span></> : <div
                  className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status">
                  <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                  >
                </div>}

                  
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
