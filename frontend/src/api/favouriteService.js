import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const addFavourite = (productId) => {
  return axios.post(
    `${API}/favourite/add`,
    { productId },
    { withCredentials: true }
  );
};

export const removeFavourite = (productId) => {
  return axios.delete(
    `${API}/favourite/remove/${productId}`,
    { withCredentials: true }
  );
};

export const getFavourites = () => {
  return axios.get(
    `${API}/favourite/get`,
    { withCredentials: true }
  );
};

export const checkFavourite = (productId) => {
  return axios.get(
    `${API}/favourite/check/${productId}`,
    { withCredentials: true }
  );
};