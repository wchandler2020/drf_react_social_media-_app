import React, { useEffect, useState } from "react";
import login_bg_img from "../../assets/images/login_bg.png";
import logo from "../../assets/images/logo_2.jpg";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/api"; // Assuming you have an api.js file for API calls
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirm_password: "",
  });

  const reset = () => {
    setFormData({
      email: "",
      password: "",
      confirm_password: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // updates the corresponding field
    });
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    console.log("da data: ", formData);
    setLoader(true);
    if(formData.password !== formData.confirm_password) {
      toast.error("Passwords do not match!");
      setLoader(false);
      return;
    }

    if(formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long!");
      setLoader(false);
      return
    }

    const { email, password, confirm_password } = formData;
    const dataToSend = {
        email,
        password,
        confirm_password
    }

    console.log("Data to send:", dataToSend);

    try {
      const { data: response } = await api.post("/register/", dataToSend);
      reset();
      navigate("/login");
      toast.success("Users Registered Successfully");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      <div className="h-[100vh] text-gray-900 flex justify-center rounded-lg">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1 shadow-xl">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex flex-row items-center justify-center">
              <img
                src={logo}
                alt="Logo"
                className="w-[56px] h-[56px] rounded-full w-mx-auto"
              />
              <p className="font-bold text-4xl text-gray-600">chattr</p>
            </div>
            <div className="mt-12 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  <button className="w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-purple-200 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
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
                    <span className="ml-4 text-white">Sign up with Google</span>
                  </button>
                </div>

                <div className="my-12 border-b text-center">
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Or sign up with your email
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <form
                    onSubmit={registerHandler}
                    className="flex flex-col items-center"
                  >
                    {/* <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                      value={formData.username}
                      type="text"
                      placeholder="Full Name"
                      onChange={handleChange}
                      name="username"
                    /> */}
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      type="email"
                      placeholder="Email Address"
                      onChange={handleChange}
                      name="email"
                      value={formData.email}
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      value={formData.password}
                      type="password"
                      placeholder="Password | 8 characters minimum"
                      onChange={handleChange}
                      name="password"
                    />
                    <input
                      className="w-full px-8 py-4 rounded-lg font-medium bg-gray-50 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                      value={formData.confirm_password}
                      type="password"
                      placeholder="Confirm Password | must match"
                      onChange={handleChange}
                      name="confirm_password"
                    />
                    <button className="mt-5 tracking-wide font-semibold bg-purple-500 text-white w-full py-4 rounded-lg hover:bg-purple-600 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none">
                      <PersonAddAltIcon className="w-6 h-6 -ml-2" />
                      <span className="ml-2">Create Account</span>
                    </button>
                  </form>
                  <p className="mt-6 text-sm text-gray-600 text-center">
                    Already have an account?{" "}
                    <Link
                      to={"/login"}
                      className="border-b border-gray-500 border-dotted text-purple-700"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 hidden lg:flex overflow-hidden sm:rounded-r-lg">
            <img
              src={login_bg_img}
              alt="Register background"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
