import React from "react";
import styles from "./MainSlider.module.css";
import Slider1 from "./../../assets/slider-2.jpeg";
import Slider2 from "./../../assets/slider-image-1.jpeg";
import Slider3 from "./../../assets/slider-image-2.jpeg";
import Slider4 from "./../../assets/slider-image-3.jpeg";
import Slider5 from "./../../assets/grocery-banner-2.jpeg";
import Slider6 from "./../../assets/grocery-banner.png";
import Slider from "react-slick";
export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };
  return (
    <>
      <div className="container mx-auto py-3">
        <div className="flex">
          <div className="w-3/4">
            <Slider {...settings}>
              <img src={Slider1} className="h-[18.75rem]" alt="img" />
              <img src={Slider2} className="h-[18.75rem]" alt="img" />
              <img src={Slider3} className="h-[18.75rem]" alt="img" />
              <img src={Slider4} className="h-[18.75rem]" alt="img" />
            </Slider>
          </div>
          <div className="w-1/4">
            <img src={Slider5} className="h-[9.375rem]" alt="img" />
            <img src={Slider6} className="h-[9.375rem]" alt="img" />
          </div>
        </div>
      </div>
    </>
  );
}
