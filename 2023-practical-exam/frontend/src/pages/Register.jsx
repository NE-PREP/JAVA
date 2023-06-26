import { useState } from "react";
import { errorToast, successToast } from "../utils/Toast";
import { Input } from "../components/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/Api";

export const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    phone: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormDataFilled = Object.values(formData).every(
      (value) => value !== ""
    );

    if (!isFormDataFilled) {
      errorToast("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(API_URL + "/users/register/as-customer", formData);
      if (response?.status == 201) {
        successToast("Successfully registered");

        setFormData({
          firstname: "",
          phone: "",
          email: "",
          password: "",
        });

        navigate("/login");

        setLoading(false);
      } else {
        errorToast(response?.message || "Error occurred while registering");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      errorToast(error?.response?.data?.message || "An error occurred");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="pb-12">
      <h1 className="text-xl text-[#2272C3] font-extrabold text-center my-12">
        Kalim's Binary Supermarket
      </h1>
      <div className="flex flex-col items-center mt-8 border w-full md:w-[35vw] mx-auto py-8 px-16">
        <h1 className="font-black text-black mb-4 text-xl">Register</h1>
        <p className="text-xs font-light text-gray-400 mb-8">
          To start shopping in Kalim's Binary Supermarket, you need to register.
        </p>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-6">
            <Input
              type="text"
              name="firstname"
              placeholder="Firstname"
              value={formData.firstname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-8">
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full mb-6 flex justify-center mx-auto text-base px-4 py-3 text-white rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-[#2272C3] font-bold">
            Login
          </Link>
          .
        </p>
      </div>
    </div>
  );
};
