import express from "express";
import cartController from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post(
  "/add",
  cartController.addToCart
);

cartRouter.get(
  "/get",
  cartController.getCart
);

cartRouter.put(
  "/update/:productId",
  cartController.updateQuantity
);

cartRouter.delete(
  "/remove/:productId",
  cartController.removeFromCart
);

export default cartRouter;