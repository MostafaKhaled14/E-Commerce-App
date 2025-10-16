import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import imageLogo from "./../../assets/logo.jpg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { TokenContext } from "../../Context/TokenContext";
import { CartContexst } from "../../Context/CartContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { itemsLength, getCart } = useContext(CartContexst);
  const { token, setToken } = useContext(TokenContext);
  const [showList, setShowList] = useState(false);

  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }
  function handleList() {
    if (showList) {
      setShowList(false);
    } else {
      setShowList(true);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      getCart();
    }
  }, []);

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="home" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={imageLogo} className="h-8" alt="logo" />
            <span className="self-center text-2xl !ml-0 font-semibold whitespace-nowrap dark:text-white">FreshCart</span>
          </Link>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div
              onClick={() => handleList()}
              className="hover:bg-slate-100 h-9 px-3 md:hidden rounded-lg *:w-5 *:h-0.5 *:bg-gray-500 flex flex-col justify-center items-center *:mt-1 *:rounded-3xl"
            >
              <span className="!mt-0"></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${showList ? "block" : "hidden"}`} id="navbar-sticky">
            {token ? (
              <>
                <ul
                  onClick={() => handleList()}
                  className="flex flex-col *:m-auto p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
                >
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="home"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="cart"
                      className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="wishlist"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Wish List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="categories"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="products"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={() => handleList()}
                      to="Brands"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
            <ul
              onClick={() => handleList()}
              className="md:ml-16 *:m-auto flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700"
            >
              {token ? (
                <div className="flex justify-center items-center">
                  <Link
                    onClick={() => handleList()}
                    to="cart"
                    className="fa-solid hover:text-gray-700 duration-150 fa-cart-shopping fs-3 p-3 text-xl relative"
                  >
                    <span className="absolute bg-main px-2 text-[0.75rem] rounded-md right-5 text-white bottom-8">{itemsLength}</span>
                  </Link>
                  <li className="bg-[#0aad0a] *:cursor-pointer hover:bg-[#058b05] duration-150 rounded-2xl p-5 py-2">
                    <a onClick={() => handleLogout()} className="block py-0 px-2 text-white hover:text-white duration-150 md:p-0">
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <>
                  <li>
                    <NavLink
                      to="login"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="register"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <div className="pb-[6.25rem]"></div>
    </>
  );
}
