import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TokenContext } from "./TokenContext";
export const CartContexst = createContext();

export default function CartContextProvider(props) {
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  const [wishListColor, setWishListColor] = useState([]);
  const [cartId, setCartId] = useState([]);
  const [itemsLength, setItemsLength] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const headers = { token: localStorage.getItem("userToken") };
  const { setIsLoading } = useContext(TokenContext);

  async function addToCart(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )
      .then((response) => {
        toast.success(response.data.message);
        setItemsLength(response.data.numOfCartItems);
        setCartId(response.data.data._id);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        toast.error(err.message);
        return err;
      });
  }

  async function addToWishList(productId) {
    return await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { productId },
        { headers }
      )
      .then((response) => {
        toast.success(response.data.message);
        // console.log(...wishListItems);
        // console.log(response.data.data);
        // setWishListColor(response.data.data)
        // wishListItems.
        
        return response;
      })
      .catch((err) => {
        toast.error(err.message);
        return err;
      });
  }

  async function getCart() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        setItemsLength(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartItems(response.data.data.products);
        setCartId(response.data.data._id);
        setIsLoading(false);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function getWishList() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/wishlist", { headers })
      .then((response) => {
        setWishListItems(response.data.data);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function removeCartItems(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) => {
        setCartItems(response.data.data.products);
        setItemsLength(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function removeWishListItems(productId) {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function updateCartItems(productId, count) {
    return await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      )
      .then((response) => {
        setCartItems(response.data.data.products);
        setItemsLength(response.data.numOfCartItems);
        setTotalPrice(response.data.data.totalCartPrice);
        setCartId(response.data.data._id);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  async function onlinePayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
        { shippingAddress },
        { headers }
      )
      .then((response) => {
        window.location.href = response.data.session.url;
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function cashPayment(shippingAddress) {
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
        { shippingAddress },
        { headers }
      )
      .then((response) => {
        window.location.href = "http://localhost:5173/allorders";
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  async function clearCart() {
    return await axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((response) => {
        setCartItems([]);
        setItemsLength(0);
        setTotalPrice(0);
        return response;
      })
      .catch((err) => {
        return err;
      });
  }

  useEffect(() => {
    getWishList();
  }, [wishListItems]);

  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContexst.Provider
      value={{
        addToCart,
        cartId,
        getWishList,
        cashPayment,
        onlinePayment,
        removeWishListItems,
        addToWishList,
        wishListItems,
        itemsLength,
        totalPrice,
        getCart,
        clearCart,
        removeCartItems,
        updateCartItems,
        cartItems,
        wishListColor,
        setCartItems,
      }}
    >
      {props.children}
    </CartContexst.Provider>
  );
}
