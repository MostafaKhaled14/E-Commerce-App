import React, { useContext } from "react";
import styles from "./WishList.module.css";
import { CartContexst } from "../../Context/CartContext";
import Loading from "../Loading/Loading";
import { TokenContext } from "../../Context/TokenContext";

export default function WishList() {
  const { addToCart, wishListItems, removeWishListItems } =
    useContext(CartContexst);
  const { isLoading } = useContext(TokenContext);

  return (
    <>
      <div className="my-12 flex justify-center">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="relative md:w-2/3 overflow-x-auto shadow-xl sm:rounded-lg">
            <div className="flex justify-between border-2 border-b-0 p-3">
              <h2 className="font-extrabold text-2xl ">My wish List</h2>
            </div>
            <table className="w-full text-gray-500 dark:text-gray-400">
              <tbody>
                {wishListItems.map((item) => (
                  <tr
                    key={item._id}
                    className="flex border-2 items-center justify-between dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-3">
                      <img
                        src={item.imageCover}
                        className="w-[80px] h-[100px]"
                        alt="Apple Watch"
                      />
                    </td>
                    <td className="flex flex-col justify-center w-40">
                      <p className=" font-semibold text-xl text-gray-900 dark:text-white">
                        {item.title.split(" ").slice(0, 2).join(" ")}
                      </p>
                      <p className=" font-semibold py-2 text-main dark:text-white">
                        {item.price} EGP
                      </p>
                      <div className="">
                        <a
                          onClick={() => removeWishListItems(item._id)}
                          className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                        >
                          Remove
                        </a>
                      </div>
                    </td>
                    {/* </tr> */}
                    <td>
                      <button
                        onClick={() => addToCart(item._id)}
                        className="me-3 text-white hover:text-white duration-150 bg-[#1cb31c] btn hover:bg-[#0f6e0f] font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        Add to cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
