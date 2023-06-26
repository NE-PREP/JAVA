import { createContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { API_URL } from "../services";
import axios from "axios";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {

  // // Sign out
  const { item: signOut, saveItem: saveSignOut } = useLocalStorage(
    "sign-out",
    false
  );

  // Product Detail · Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);

  // Checkout Side Menu · Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);

  // Product Detail · Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart · Add products to cart
  const [cartProducts, setCartProducts] = useState([]);

  // Shopping Cart · Order
  const [order, setOrder] = useState([]);

  // Get products
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  // Get products by title
  const [searchByTitle, setSearchByTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${API_URL}/v1/products/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        const data = response.data.data;
        setItems(data);
      })
      .catch((error) => {
        // Handle error
      });
  }, []);

  const filteredItemsByTitle = (items, searchByTitle) => {
    return items?.filter((item) =>
      item.name.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  useEffect(() => {
    if (searchByTitle.length > 0) {
      setFilteredItems(filteredItemsByTitle(items, searchByTitle));
    } else {
      setFilteredItems(items);
    }
  }, [items, searchByTitle]);

  return (
    <ShoppingCartContext.Provider
      value={{
        isProductDetailOpen,
        setIsProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        isCheckoutSideMenuOpen,
        setIsCheckoutSideMenuOpen,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        setFilteredItems,
        signOut,
        saveSignOut,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
