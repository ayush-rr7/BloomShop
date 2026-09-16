import express from "express";

import orderController from "../controller/orderController.js";
import ownerMiddleware from "../middleware/ownerMiddleware.js";

const orderRouter = express.Router();

orderRouter.post(
  "/create",
  orderController.createOrder
);

orderRouter.get(
  "/get",
  orderController.getOrders
);

orderRouter.get(
  "/get/:orderId",
  orderController.getOrderById
);

orderRouter.put(
  "/cancel/:orderId",
  orderController.cancelOrder
);
orderRouter.get(
  "/all",
  ownerMiddleware,
  orderController.getAllOrders
);

orderRouter.put(
  "/status/:orderId",
  ownerMiddleware,
  orderController.updateOrderStatus
);

export default orderRouter;

