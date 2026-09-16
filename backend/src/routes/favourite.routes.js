import express from "express";
import favouriteController from "../controller/favouriteController.js";

const favouriteRouter = express.Router();

favouriteRouter.post(
  "/add",
  favouriteController.addFavourite
);

favouriteRouter.delete(
  "/remove/:productId",
  favouriteController.removeFavourite
);

favouriteRouter.get(
  "/get",
  favouriteController.getFavourites
);

favouriteRouter.get(
  "/check/:productId",
  favouriteController.checkFavourite
);

export default favouriteRouter;