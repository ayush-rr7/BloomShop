import api from "./axios";

export const getProductDetail = (id) => {
  console.log(id);
  return api.get(`/api/ProductDetail/${id}`);
};

export const createProducts = (data) => {
  return api.post("/api/createProduct", data);
};

export const updateAvailability = (id, Available) => {
  return api.patch(
    `/api/ProductAvailability/${id}`,
    { Available }
  );
};

export const editProducts = (id, data) => {
  return api.put(
    `/api/editProduct/${id}`,
    data
  );
};

export const deleteProduct = (id) => {
  return api.delete(
    `/api/deleteProduct/${id}`
  );
};

export const getProducts = (id, page = 1) => {
  return api.get(
    `/api/getProduct/${id}?page=${page}&limit=12`
  );
};

