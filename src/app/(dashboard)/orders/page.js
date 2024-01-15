"use client";
import OrderItem from "@/app/component/layout/OrderItem";
import Userprofile from "@/app/hook/userprofile";

import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const { loading, data: profile } = Userprofile();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoadingOrders(true);

    try {
      const response = await fetch('/api/orders');
      const orders = await response.json();

      setOrders(orders.reverse());
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoadingOrders(false);
    }
  };

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <div className="lg:py-5 mx-auto text-center flex flex-col items-center">
        <h1 className="text-3xl font-bold sm:text-6xl lg:my-3">Orders</h1>
      </div>
      <div className="mt-8">
        {loadingOrders ? (
          <div>Loading orders...</div>
        ) : (
          orders.length > 0 &&
          orders.map((order) => <OrderItem key={order._id} order={order} />)
        )}
      </div>
    </section>
  );
};

export default OrdersPage;
