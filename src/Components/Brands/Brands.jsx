import React from "react";
import styles from "./Brands.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

export default function Brands() {
  function getAllBrands() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }

  const { data, isLoading } = useQuery({
    queryKey: ["AllBrands"],
    queryFn: getAllBrands,
  });

  function myAleart(name, image) {
    Swal.fire({
      title: name,
      text: name,
      imageUrl: image,
      confirmButtonText: "OK",
    });
  }

  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-2xl text-main font-bold text-center">All Brands</h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap mt-5">
            {data?.data.data.map((brand) => (
              <div key={brand._id} className="md:w-1/4 w-full flex flex-col m-auto p-2">
                <div
                  onClick={() => myAleart(brand.name, brand.image)}
                  className="hover:scale-105 duration-150 cursor-pointer flex flex-col items-center border shadow-xl"
                >
                  <img src={brand.image} className="w-[100px] mb-5" alt="img" />
                  <h2 className="py-2 ">{brand.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
