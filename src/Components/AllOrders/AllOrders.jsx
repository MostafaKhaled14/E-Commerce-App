import React from "react";
import styles from "./AllOrders.module.css";
import { Link } from "react-router-dom";
export default function AllOrders() {
  return (
    <>
      <div className="h-32 flex flex-col justify-center items-center">
        <h2 className="p-8  text-main font-extrabold text-2xl ">
          Payment completed successfully
        </h2>
        <h2 className="">
          Click{" "}
          <Link
            to="/home"
            className="underline text-main cursor-pointer hover:text-[#544] hover:underline text-lg"
          >
            here
          </Link>{" "}
          to go to the Home pagey
        </h2>
      </div>
    </>
  );
}
