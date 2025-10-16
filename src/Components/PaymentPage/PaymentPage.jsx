import React, { useContext, useState } from "react";
import styles from "./PaymentPage.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TokenContext } from "../../Context/TokenContext";
import { CartContexst } from "../../Context/CartContext";

export default function PaymentPage() {
  const [isChecked, setIsChecked] = useState(false);
  const { isLoading } = useContext(TokenContext);
  const { onlinePayment, cashPayment } = useContext(CartContexst);

  let mySchema = Yup.object({
    details: Yup.string().required("name is required"),
    phone: Yup.string()
      .required("phone is required")
      .matches(
        /^(002)?01[0125][0-9]{8}$/i,
        "Invalid phone, Enter egyptian number"
      ),
    city: Yup.string().required("name is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => {
      if (isChecked) {
        cashPayment(values);
      } else {
        onlinePayment(values);
      }
    },
  });

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <>
      <div className="container pt-4">
        <form onSubmit={formik.handleSubmit}>
          <div className="container w-2/3 grid *:mb-3">
            <h2 className="text-2xl text-main">Payment Page :</h2>
            <div>
              <label
                htmlFor="details"
                className="block text-sm font-medium capitalize text-gray-900 dark:text-white"
              >
                Details
              </label>
              <input
                type="text"
                id="details"
                name="details"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.details}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.details && formik.errors.details ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.details}
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

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium capitalize text-gray-900 dark:text-white"
              >
                city
              </label>
              <input
                type="text"
                id="city"
                name="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.city}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <div>
                {formik.touched.city && formik.errors.city ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    role="alert"
                  >
                    {formik.errors.city}
                  </div>
                ) : null}
              </div>
            </div>

            <div>
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="me-2"
                />
                Choose how to pay
              </label>
              <p className="pt-2">
                {isChecked ? (
                  !isLoading ? (
                    <button
                      disabled={!(formik.isValid && formik.dirty)}
                      type="submit"
                      className="text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                    >
                      Payment cash
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className=" ms-2 text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                    >
                      <i className="fa fa-spinner fa-spin"></i>
                    </button>
                  )
                ) : !isLoading ? (
                  <button
                    // onSubmit={}
                    disabled={!(formik.isValid && formik.dirty)}
                    type="submit"
                    className="text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                  >
                    Payment Online
                  </button>
                ) : (
                  <button
                    type="submit"
                    className=" ms-2 text-white bg-green-500 hover:bg-green-400 font-bold rounded-lg w-fit px-4 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 "
                  >
                    <i className="fa fa-spinner fa-spin"></i>
                  </button>
                )}
              </p>
            </div>

            <div className="flex items-center"></div>
          </div>
        </form>
      </div>
    </>
  );
}
