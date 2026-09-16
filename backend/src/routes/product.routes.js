import express from "express";
import productController from "../controller/productController.js";
import upload from "../config/cloudinary.js";

const productRouter = express.Router();

console.log("Product router coming");

// CREATE PRODUCT / SERVICE
productRouter.post(
  "/createProduct",
  upload.array("imageURL", 5),
  productController.addProduct
);

// GET PRODUCTS / SERVICES
// Example: /getProduct?page=1&limit=12
productRouter.get(
  "/getProduct/:profileId",
  productController.getProduct
);

// GET SINGLE PRODUCT / SERVICE
// Example: /productDetail/64abc123...
productRouter.get(
  "/productDetail/:id",
  productController.getProductById
);

// UPDATE PRODUCT / SERVICE
productRouter.put(
  "/editProduct/:id",
  upload.array("imageURL", 5),
  productController.updateProduct
);

// DELETE PRODUCT / SERVICE
productRouter.delete(
  "/deleteproduct/:id",
  productController.deleteProduct
);
productRouter.patch( "/ProductAvailability/:id", productController.updateAvailability );

export default productRouter;


// import express from 'express'
// import productController from '../controller/productController.js'
// import upload from "../config/cloudinary.js";

// const productRouter = express.Router();


// console.log("coming");
// productRouter.post('/createProduct',upload.array("imageURL", 5),productController.addProduct);

// // productRouter.get('/pref/:profileId',productController.getPreferences);
// // productRouter.put('/pref/:profileId',productController.savePreferences);

// productRouter.get('/getProduct/:profileId',productController.getProduct);
// // productRouter.put('/editProfile/:id',productController.updateProduct);
// // productRouter.get('/profileDetail/:id',productController.getProductById);
// // productRouter.delete('/Product/:id',productController.deleteProduct);
// // productRouter.put('/Product',productController.updateProduct);

// export default productRouter;