import React, { useState } from "react";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";

export default function Login() {
  let { setToken } = useContext(TokenContext);
  const [userMessage, setUserMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  let mySchema = Yup.object({
    email: Yup.string().required("Email is required").email("Invalid email"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9@_-]{7,}/,
        "First letter must be capital, and 8 characters required"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      loginForm(values);
    },
  });

  async function loginForm(values) {
    setIsLoading(true);
    return await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .then((data) => {
        console.log(data.data.token);
        localStorage.setItem("userToken", data.data.token);
        setToken(data.data.token);
        setUserMessage(data.data.message);
        setIsLoading(false);
        navigate("/home");
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
            <h2 className="text-2xl text-main">Login Now :</h2>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
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

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
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

            <div className="flex items-center">
              {!isLoading ? (
                <button
                  disabled={!(formik.isValid && formik.dirty)}
                  type="submit"
                  className="text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  Login
                </button>
              ) : (
                <button
                  type="submit"
                  className=" ms-2 text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                >
                  <i className="fa fa-spinner fa-spin"></i>
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
              {userMessage === "Incorrect email or password" ? (
                <div
                  className="p-3 ml-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  {userMessage}{" "}
                  <Link
                    to="/register"
                    className="ps-2 hover:underline underline text-gray-950 hover:text-green-600 duration-100"
                  >
                    {" "}
                    Register a new email?
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
