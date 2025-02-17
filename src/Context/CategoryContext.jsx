import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const CategoryContext = createContext();

export default function CategoryContextProvider(props) {
  const [AllCategory, setAllCategory] = useState([]);
  async function getAllCategories() {
    return await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((response) => {
        setAllCategory(response.data.data);
        return response;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ AllCategory }}>
      {props.children}
    </CategoryContext.Provider>
  );
}
