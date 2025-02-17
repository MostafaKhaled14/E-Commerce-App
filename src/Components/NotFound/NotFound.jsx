import React from "react";
import styles from "./NotFound.module.css";
import NotFoundImage from "./../../assets/error-404.avif";
export default function NotFound() {
  return (
    <>
      <div className="container">
        <img className="w-1/2 mx-auto" src={NotFoundImage} alt="error404" />
      </div>
    </>
  );
}
