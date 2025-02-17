import React, { useEffect } from "react";
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

  function handleLogout() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
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
          <Link
            to="home"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src={imageLogo} className="h-8" alt="logo" />
            <span className="self-center text-2xl !ml-0 font-semibold whitespace-nowrap dark:text-white">
              FreshCart
            </span>
          </Link>
          <div className="flex space-x-3 md:space-x-0 rtl:space-x-reverse">
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky"
          >
            {token ? (
              <>
                <ul className="flex flex-col *:m-auto p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li>
                    <NavLink
                      to="home"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="cart"
                      className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Cart
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="wishlist"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Wish List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="categories"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="products"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="Brands"
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#0aad0a] duration-150 md:p-0 md:dark:hover:text-[#0aad0a] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      Brands
                    </NavLink>
                  </li>
                </ul>
              </>
            ) : null}
            <ul className="md:ml-16 *:m-auto flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {token ? (
                <div className="flex justify-center items-center">
                  <a
                    href="cart"
                    className="fa-solid hover:text-gray-700 duration-150 fa-cart-shopping fs-3 p-3 text-xl relative"
                  >
                    <span className="absolute bg-main px-2 text-sm rounded-md right-5 text-white bottom-8">
                      {itemsLength}
                    </span>
                  </a>
                  <li className="bg-[#0aad0a] *:cursor-pointer hover:bg-[#058b05] duration-150 rounded-2xl p-5 py-2">
                    <a
                      onClick={() => handleLogout()}
                      className="block py-2 px-3 text-white hover:text-white duration-150 md:p-0"
                    >
                      Logout
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
