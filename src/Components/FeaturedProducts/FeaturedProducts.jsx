import React, { useContext } from "react";
import styles from "./FeaturedProducts.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { CartContexst } from "../../Context/CartContext";

export default function FeaturedProducts() {
  const { addToCart, addToWishList } = useContext(CartContexst);

  function getFeaturedProducts() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["FeaturedProducts"],
    queryFn: getFeaturedProducts,
  });

  return (
    <>
      <div className="container mx-auto">
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap">
            {data?.data?.data.map((product) => (
              <div
                key={product._id}
                className="contener max-w-sm bg-white dark:bg-gray-800 lg:w-1/4 flex flex-col items-center p-2 m-auto"
              >
                <div className="hover:scale-105 duration-150 rounded-lg cursor-pointer flex flex-col items-center justify-center border shadow-xl w-full">
                  <Link
                    to={`/productdetails/${product.id}/${product.category.name}`}
                  >
                    <img
                      className="p-2 rounded-t-lg w-[200px]"
                      src={product.imageCover}
                      alt={product.title.split(" ").slice(0, 2).join(" ")}
                    />
                    <div className="text-center">
                      <p className="text-main text-sm py-2">
                        {product.category.name}
                      </p>
                      <h5 className="text-sm font-semibold tracking-tight text-gray-900 dark:text-white">
                        {product.title.split(" ").slice(0, 2).join(" ")}
                      </h5>
                      <div className="flex items-center justify-center mt-2.5">
                        <div className="flex items-center space-x-1 rtl:space-x-reverse">
                          {[...Array(Math.trunc(product.ratingsAverage))].map(
                            (_, id) => (
                              <i
                                key={id}
                                className="fa fa-star rating-color"
                              ></i>
                            )
                          )}
                          {/* {getStars(product.ratingsAverage)} */}
                          {product.ratingsAverage % 1 === 0 ? null : (
                            <i className="fa fa-star-half-stroke rating-color"></i>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-center items-center">
                        <p className="text-gray-900 dark:text-white py-2">
                          {product.price} LE
                        </p>
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                          {product.ratingsQuantity} Reviews
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className=" pb-5 flex items-center justify-center">
                    <button
                      onClick={() => addToCart(product._id)}
                      className="mr-4 text-white hover:text-white duration-150 bg-[#1cb31c] btn hover:bg-[#0f6e0f] font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Add to cart
                    </button>
                    <i
                      onClick={() => addToWishList(product._id)}
                      className="fa-solid fa-heart text-2xl block text-center text-main btn hover:text-[#0f6e0f]"
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
