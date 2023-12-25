"use client";
import { CartContext, cartProductprice } from "@/app/component/Authprovider";
import Addressinput from "@/app/component/layout/Addressinput";
import CartProduct from "@/app/component/layout/CartProduct";
import { toast } from "@/app/component/ui/use-toast";
import userprofile from "@/app/hook/userprofile";
import React, { useContext, useEffect, useState } from "react";

const page = () => {
  const { cartProducts, removeCartProduct } = useContext(CartContext);
  const [address, setAddress] = useState({});
  const { data: profileData } = userprofile();
  useEffect(() => {
    if (profileData?.city) {
      const { phone, streetAdress, postalcode, city, country } = profileData;
      const addressFromProfile = {
        phone,
        streetAdress,
        postalcode,
        city,
        country,
      };
      setAddress(addressFromProfile);
    }
  }, [profileData]);

  let subtotal = 0;
  for (const p of cartProducts) {
    const productPrice = cartProductprice(p);

    if (isNaN(productPrice)) {
      console.error(`Invalid price for product:`, p);
    } else {
      subtotal += Number(productPrice);
    }
  }
  function handleAddressChange(propName, value) {
    setAddress((prevAddress) => ({ ...prevAddress, [propName]: value }));
  }

  async function proceedToCheckout(ev) {
    ev.preventDefault();
    // address and shopping cart products

    const promise = new Promise((resolve, reject) => {
      fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          cartProducts,
        }),
      }).then(async (response) => {
        if (response.ok) {
          resolve();
          toast({
            title: "Please make your Payment",
            variant: "outline",
          });
          window.location = await response.json();
        } else {
          reject();
        }
      });
    });
  }

  if (cartProducts?.length === 0) {
    return (
      <section className="mt-8 text-center">
        <h1>Cart</h1>
        <p className="mt-4">Your shopping cart is empty 😔</p>
      </section>
    );
  }
  console.log(subtotal);

  return (
    <>
      <div className="container mx-auto mt-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Cart Page</h1>
        </div>

        <div className="mt-8 flex">
          <div className="grid gap-8 grid-cols-2  w-full">
            <div>
              {cartProducts?.length === 0 && (
                <div className="text-gray-500">
                  No products in your shopping cart
                </div>
              )}
              {cartProducts?.length > 0 &&
                cartProducts.map((product, index) => (
                  <CartProduct
                    key={index}
                    product={product}
                    onRemove={removeCartProduct}
                    index={index}
                  />
                ))}

              <div className="py-2 pr-16 flex justify-end items-center">
                <div className="text-gray-500">
                  Subtotal:
                  <br />
                  Delivery:
                  <br />
                  Total:
                </div>
                <div className="font-semibold pl-2 text-right">
                  ${subtotal}
                  <br />
                  $5
                  <br />${subtotal + 5}
                </div>
              </div>
            </div>
          </div>

          <div className="border p-4 rounded-lg mr-5  sticky h-[32rem] ">
            <h2 className="text-xl font-bold mb-4 ">Checkout</h2>
            <form onSubmit={proceedToCheckout}>
              <div className="  w-96">
                <Addressinput
                  addressProps={address}
                  setadressProps={handleAddressChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
              >
                Pay ${subtotal + 5}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
