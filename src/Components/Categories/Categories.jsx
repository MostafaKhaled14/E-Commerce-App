import React, { useContext, useState } from "react";
import styles from "./Categories.module.css";
import axios from "axios";
import Loading from "../Loading/Loading";
import { TokenContext } from "../../Context/TokenContext";
import { CategoryContext } from "../../Context/CategoryContext";

export default function Categories() {
  const [supCategories, setSupCategories] = useState([]);
  const { AllCategory } = useContext(CategoryContext);
  const { isLoading } = useContext(TokenContext);

  async function getAllSupCategories(id) {
    return await axios
      .get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      )
      .then((response) => {
        setSupCategories(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <div className="container mx-auto mt-5">
        <h2 className="text-2xl text-main font-bold text-center">
          All Categories
        </h2>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="flex flex-wrap">
            {AllCategory.map((category) => (
              <div onClick={() => getAllSupCategories(category?._id)} key={category._id} className="md:w-1/4 m-auto flex flex-col items-center p-2">
                <div className="hover:scale-105 rounded-lg duration-150 cursor-pointer border shadow-xl w-full">
                  <img src={category.image} className="rounded-t-lg w-[200px] h-[250px] " alt="img" />
                  <h2 className="p-2 border-t-2 w-full text-center">{category.name}</h2>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="container mx-auto my-5">
        <h2 className="text-2xl text-main font-bold text-center">
          Sup Categories
        </h2>
        <div className="flex flex-wrap">
          {supCategories.map((supCategory) => (
            <div
              key={supCategory._id}
              className="md:w-1/4 m-auto flex flex-col items-center p-5"
            >
              <div className="hover:scale-105 duration-150 cursor-pointer flex flex-col items-center border-2 shadow-xl w-full">
                <h2 className="py-5 px-2 text-center">{supCategory.name}</h2>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
