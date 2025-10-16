import React, { useContext, useState } from "react";
import styles from "./Register.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [userMessage, setUserMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let mySchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be greater than 3 characters")
      .max(20, "Name must be less than 20 characters"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(
        /^(002)?01[0125][0-9]{8}$/i,
        "Invalid phone, Enter egyptian number"
      ),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9@_-]{7,}/,
        "First letter must be capital, and 8 characters required"
      ),
    rePassword: Yup.string()
      .required("Password is required")
      .oneOf([Yup.ref("password")]),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      registerForm(values);
    },
  });

  async function registerForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .then((data) => {
        setUserMessage(data.data.message);
        setIsLoading(false);
        navigate("/login");
      })
      .catch((error) => {
        setUserMessage(error.response.data.message);
        setIsLoading(false);
      });
  }

  return (
    <>
      <div className="container pt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="container w-2/3 grid *:mb-3">
            <h2 className="text-2xl text-main">Register Now :</h2>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium capitalize text-gray-900 dark:text-white"
              >
                name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.name && formik.errors.name ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium capitalize text-gray-900 dark:text-white"
              >
                email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.email && formik.errors.email ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm capitalize font-medium text-gray-900 dark:text-white"
              >
                phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.phone && formik.errors.phone ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.phone}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm capitalize font-medium text-gray-900 dark:text-white"
              >
                password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.password && formik.errors.password ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="rePassword"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                rePassword
              </label>
              <input
                type="password"
                id="rePassword"
                name="rePassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.rePassword}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.rePassword && formik.errors.rePassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.rePassword}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="flex items-center">
              {isLoading ? (
                <button
                  type="submit"
                  className=" ms-2 text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  <i className="fa fa-spinner fa-spin"></i>
                </button>
              ) : (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  Register
                </button>
              )}

              {userMessage === "success" ? (
                <div
                  className="p-4 ml-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                  role="alert"
                >
                  {userMessage}
                </div>
              ) : null}
              {userMessage === "Account Already Exists" ? (
                <div
                  className="p-3 ml-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {userMessage}
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
