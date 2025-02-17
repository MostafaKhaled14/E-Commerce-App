import React, { useContext, useState } from "react";
import styles from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import Slider from "react-slick";
import { TokenContext } from "../../Context/TokenContext";
import { CartContexst } from "../../Context/CartContext";

export default function ProductDetails() {
  const { id, category } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const { handlescroll, isLoading, setIsLoading } = useContext(TokenContext);
  const { addToCart } = useContext(CartContexst);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  async function getProductDetails() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((data) => {
        setProductDetails(data?.data.data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }

  async function getRelatedProducts() {
    return await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((data) => {
        let relatedProducts = data?.data.data;
        relatedProducts = relatedProducts.filter(
          (product) => product.category.name === category
        );
        setRelatedProducts(relatedProducts);
      })
      .catch(() => {});
  }

  useEffect(() => {
    getProductDetails();
    getRelatedProducts();
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [id]);

  return (
    <>
      <>
        <div className="container mx-auto">
          {isLoading ? <Loading /> : null}
          <div className="flex">
            <div className="w-1/4">
              <Slider {...settings}>
                {productDetails?.images?.map((src) => (
                  <img src={src} className="p-5" key={id} alt="img" />
                  // <h1>mostafa</h1>
                ))}
              </Slider>
            </div>
            <div className="w-3/4 mt-10">
              <h2 className="text-black font-bold text-2xl my-5">
                {productDetails.title}
              </h2>
              <h4 className="text-gray-700 my-5">
                {productDetails.description}
              </h4>
              <p className="my-5">{productDetails.category?.name}</p>
              <div className="flex justify-between items-center">
                <p className="my-5">{productDetails.price} EGP</p>
                <div>
                  <i className="fa fa-star rating-color"></i>
                  {productDetails.ratingsQuantity}
                </div>
              </div>
              <div>
                <button
                  onClick={() => addToCart(productDetails._id)}
                  className="bg-main btn w-full rounded-lg text-white p-3 py-2 mt-2"
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container mx-auto pt-10">
          <h2 className="text-main text-2xl">Related Products</h2>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-wrap ">
              {relatedProducts.map((product) => (
                <div
                  key={product._id}
                  className="contener max-w-sm bg-white dark:bg-gray-800 w-1/4 flex flex-col items-center p-2"
                >
                  <div className="hover:scale-105 duration-150 rounded-lg cursor-pointer flex flex-col items-center border shadow-xl w-full">
                    <Link
                      onClick={handlescroll}
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
    </>
  );
}
