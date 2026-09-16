import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const createRazorpayOrder = (data) => {
  return API.post("/payment/create-order", data);
};

export const verifyRazorpayPayment = (data) => {
  return API.post("/payment/verify", data);
};