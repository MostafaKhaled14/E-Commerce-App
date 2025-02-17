import { useEffect, useState } from "react";
import { createContext } from "react";

export let TokenContext = createContext();

export default function TokenContextProvider(props) {
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  function handlescroll() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <TokenContext.Provider
      value={{ token, setToken, handlescroll, isLoading, setIsLoading }}
    >
      {props.children}
    </TokenContext.Provider>
  );
}
