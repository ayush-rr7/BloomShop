import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const addToCart = (
  productId,
  quantity = 1,
  customizationNote = ""
) => {
  return axios.post(
    `${API}/cart/add`,
    {
      productId,
      quantity,
      customizationNote,
    },
    {
      withCredentials: true,
    }
  );
};


export const getCart = () => {
  return axios.get(
    `${API}/cart/get`,
    {
      withCredentials: true,
    }
  );
};


export const updateCartQuantity = (
  productId,
  quantity
) => {
  return axios.put(
    `${API}/cart/update/${productId}`,
    {
      quantity,
    },
    {
      withCredentials: true,
    }
  );
};


export const removeFromCart = (productId) => {
  return axios.delete(
    `${API}/cart/remove/${productId}`,
    {
      withCredentials: true,
    }
  );
};