// // import "./config/cloudinary.js";

import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import http from 'http'
import mongoose from 'mongoose';
import cors from 'cors';
import  authRouter from './routes/auth.routes.js' ;
import  productRouter from './routes/product.routes.js' ;
// import matchRouter from './routes/match.routes.js';
// import  connectionRouter from './routes/connection.routes.js' ;
// import  messageRouter from  './routes/message.routes.js' ;
import authenticateJWT from './middleware/jwt.js';
import cookieParser from "cookie-parser";
import favouriteRouter from './routes/favourite.routes.js';
import cartRouter from './routes/cart.routes.js';
import paymentRouter from "./routes/payment.routes.js";
import orderRoutes from "./routes/order.routes.js";


const app= express();

mongoose.connect(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 5000, // Keep the server attempting to connect for 5 seconds
    socketTimeoutMS: 45000,
})
  .then(() => console.log("Connected to MongoDB!"))
  .catch(err => console.error("Connection error:", err));
  
  console.log("here");
app.use(cors({
  origin: ["http://localhost:5173","https://bloomShop.vercel.app" ],
  credentials: true
}));
// app.options("*", cors()); 


app.use(express.json());  //for parsing json data
app.use(express.urlencoded({ extended: true }));//for parsing form data 
app.use(cookieParser());  //for parsing jwt 


app.use('/auth',authRouter);
//protected route
app.use('/api',authenticateJWT, productRouter);
// app.use('/api', userRouter);
app.use('/favourite',authenticateJWT, favouriteRouter);
app.use('/cart',authenticateJWT, cartRouter);
app.use("/payment",authenticateJWT, paymentRouter);
app.use("/order",authenticateJWT, orderRoutes);
// app.use('/messages', messageRouter);



export default app;
