import React, { useContext, useEffect } from "react";
import styles from "./Cart.module.css";
import { CartContexst } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { TokenContext } from "../../Context/TokenContext";
import { Link } from "react-router-dom";
export default function Cart() {
  const { removeCartItems, updateCartItems, cartItems, clearCart, totalPrice } = useContext(CartContexst);
  const { isLoading } = useContext(TokenContext);

 
  

  return (
    <>
      <div className="my-12 flex justify-center items-center">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => clearCart()}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Clear Cart
              </button>
            </div>
            <table className="text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr className="bg-main text-white border border-green-600">
                  <th scope="col" className="px-6 py-3">
                    <span>Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Unit Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr
                    key={item._id}
                    className="bg-white border border-green-600 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4">
                      <img src={item?.product?.imageCover} className="w-10 md:w-32 max-w-full max-h-full" alt="image" />
                    </td>
                    <td className=" font-semibold text-gray-900 dark:text-white">{item?.product?.title?.split(" ").slice(0, 2).join(" ")}</td>
                    <td className="">
                      <div className="flex items-center">
                        <button
                          className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => updateCartItems(item.product.id, item.count - 1)}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                          </svg>
                        </button>
                        <div>
                          <span className=" bg-main bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            {item.count}
                          </span>
                        </div>
                        <button
                          className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          type="button"
                          onClick={() => updateCartItems(item.product.id, item.count + 1)}
                        >
                          <span className="sr-only">Quantity button</span>
                          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                    <td className=" font-semibold text-gray-900 dark:text-white text-center">{item.price} EGP</td>
                    <td className=" font-semibold text-gray-900 dark:text-white text-center">{item.price * item.count} EGP</td>
                    <td className="">
                      <a
                        onClick={() => removeCartItems(item.product.id)}
                        className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      >
                        Remove
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="text-xs bg-main text-white border border-green-600 dark:bg-gray-700 dark:text-gray-400">
                <tr className="">
                  <th></th>
                  <th className="px-6 uppercase py-3">Total Price :</th>
                  <th></th>
                  <th className="px-6 py-3">{totalPrice} LE</th>
                  <th></th>
                  <th><Link to="/Payment" className="text-main hover:text-[#0aad0a] hover:underline hover:bg-gray-200 duration-150 p-2 bg-white px-5 rounded-2xl">CheckOut</Link></th>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
