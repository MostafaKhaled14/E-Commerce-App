import React from "react";
import styles from "./CategorySlider.module.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Slider from "react-slick";

export default function CategorySlider() {
  const { data } = useQuery({
    queryKey: ["categorySlider"],
    queryFn: getCategorySlider,
  });

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 4,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  function getCategorySlider() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/categories");
  }

  return (
    <>
      <div className="container mx-auto">
        <h2 className="text-main text-2xl p-3 pl-0">Show Popular Categories :</h2>
        <Slider {...settings}>
          {data?.data.data.map((category) => (
            <div className="text-center" key={category._id}>
              <img src={category.image} className="h-[200px]" alt="img" />
              <p>{category.name}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="pb-10"></div>
    </>
  );
}
