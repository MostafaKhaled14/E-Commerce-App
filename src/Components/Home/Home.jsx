import React from "react";
import styles from "./Home.module.css";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
export default function Home() {
  return (
    <>
      <MainSlider />
      <CategorySlider />
      <FeaturedProducts />
    </>
  );
}
