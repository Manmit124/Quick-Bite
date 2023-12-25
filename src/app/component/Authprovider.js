"use client";
import { SessionProvider } from "next-auth/react";
import React, { createContext, useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
export const CartContext = createContext({});

export function cartProductprice(cartProduct){
  let price = Number(cartProduct.basePrice);
  if (cartProduct.size) {
    price += cartProduct.size.price;
  }
  if (cartProduct.extras?.length > 0) {
    for (const extra of cartProduct.extras) {
      price += extra.price;
    }
  }
  return Number(price);
}

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
    toast({
      title: 'Product Removed',
      description:'prodcut removed from your Bucket',
      variant:"outline"
    })
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
        value={{
          cartProducts,
          setcartProducts,
          addToCart,
          removeCartProduct,
          clearCart,
        }}
      >
        {children}
      </CartContext.Provider>
    </SessionProvider>
  );
};

export default Authprovider;
