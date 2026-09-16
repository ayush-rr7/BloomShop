import express from "express";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../controller/paymentController.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", createRazorpayOrder);

paymentRouter.post("/verify", verifyRazorpayPayment);

export default paymentRouter;