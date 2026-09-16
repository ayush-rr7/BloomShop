import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createOrder = (data) => {
  return API.post("/order/create", data);
};

export const getOrders = () => {
  return API.get("/order/get");
};

export const getOrderById = (orderId) => {
  return API.get(`/order/get/${orderId}`);
};

export const cancelOrder = (orderId) => {
  return API.put(`/order/cancel/${orderId}`);
};

// Owner - Get all orders
export const getAllOrders = () => {
  return API.get("/order/all");
};

// Owner - Update order status
export const updateOrderStatus = (orderId, orderStatus) => {
  return API.put(`/order/status/${orderId}`, {
    orderStatus,
  });
};
