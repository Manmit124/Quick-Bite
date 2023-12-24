"use client";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
export const CartContext = createContext({});
const Authprovider = ({ children }) => {
  const [cartProducts, setcartProducts] = useState([]);
  const ls = typeof window !== "undefined" ? window.localStorage : null;

  useEffect(() => {
    if (ls && ls.getItem("cart")) {
      setcartProducts(JSON.parse(ls.getItem("cart")));
    }
  }, []);

  function clearCart() {
    setcartProducts([]);
    saveCartProductToLocalStorage([]);
  }
  function removeCartProduct(indexToRemove) {
    setcartProducts((prevCartproduct) => {
      const newCartProduct = prevCartproduct.filter(
        (v, index) => index !== indexToRemove
      );
      saveCartProductToLocalStorage(newCartProduct);
      return newCartProduct;
    });
  }
  function saveCartProductToLocalStorage(cartProducts) {
    if (ls) {
      ls.setItem("cart", JSON.stringify(cartProducts));
    }
  }

  function addToCart(product, size = null, extras = []) {
    setcartProducts((prevProduct) => {
      const cartProduct = { ...product, size, extras };
      const newProducts = [...prevProduct, cartProduct];
      saveCartProductToLocalStorage(newProducts);
      return newProducts;
    });
  }
  return (
    <SessionProvider>
      <CartContext.Provider
        value={{ cartProducts, setcartProducts, addToCart,removeCartProduct,clearCart }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default Authprovider;
