import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useSelector,useDispatch} from 'react-redux'
import {loginUser} from '../Store/patient/authslice'

const Login = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handleSubmit = async (values) => {
    try {
      const response = await dispatch(loginUser(values))
      console.log(response);
      
      if (response.payload.success) {
        toast.success(response.payload.message);
        setTimeout(()=>navigate("/"),2000)
        
      } else {
        toast.error(response.payload.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <Formik
          initialValues={{ identifier: "", password: "" }}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-4">
                <label
                  htmlFor="identifier"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <Field
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="Enter Your Email"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="identifier"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter Your Password"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? "Submitting..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default Login;
