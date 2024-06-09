import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAuth from '../../hooks/useAuth';
import useAxiosPublic from "../../hooks/useAxiosPublic";

function JoinasEmployee() {
  const { user,
    createUser,
    updateUserProfile,
    googleSignIn,
    setLoading,
    loading
 } = useAuth();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const result = await createUser(data.email, data.password);
      console.log(result);
  
      const loggedUser = result.user;
      console.log(loggedUser);
  
      await updateUserProfile(data.name, data.photoURL);
  
      // Create user entry in the database
      const userInfo = {
        name: data.name,
        email: data.email.toLowerCase(),
        birthday: data.birthday,
        role: 'employee'
      };
  
      const res = await axiosPublic.post('/users', userInfo);
  
      if (res.data.insertedId) {
        reset();
        toast.success("Registered successfully!");
        navigate('/');
      } else {
        setLoginError("User registration failed.");
      }
    } catch (error) {
      setLoginError(error.message || "An error occurred during registration.");
    } finally {
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

            <div className="flex flex-col items-center">
                <button
                  className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline"
                  onClick={handleGoogleSignIn}
                >
                  <div className="bg-white p-2 rounded-full">
                    <svg className="w-4" viewBox="0 0 533.5 544.3">
                      <path
                        d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                        fill="#4285f4"
                      />
                      <path
                        d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                        fill="#34a853"
                      />
                      <path
                        d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                        fill="#fbbc04"
                      />
                      <path
                        d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                        fill="#ea4335"
                      />
                    </svg>
                  </div>
                  <span className="ml-4">Sign In with Google</span>
                </button>
              </div>

              <div className="mt-4 mb-7 border-b text-center">
                <div
                  className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2"
                >
                  Or sign up with email
                </div>
              </div>

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
                  <div className="flex items-center w-full rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white">
                  <input
                    {...register("birthday", { required: "Birthday is required" })}
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

export default JoinasEmployee;
