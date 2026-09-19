import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Order from "../models/Order.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount",
      });
    }

    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Razorpay order error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to create payment order",
    });
  }
};


export const verifyRazorpayPayment = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,

      items,
      Name,
      Phone,
      Address,
      City,
      State,
      Pincode,
      totalAmount,
       orderType,
  customizationNote,
    } = req.body;


    // 1. Create signature
    const body =
      razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      )
      .update(body)
      .digest("hex");


    // 2. Verify payment
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }


    // 3. Convert frontend cart items into Order items
    const orderItems = items.map((item) => ({
      product: item.productId._id,
      name: item.productId.Name,
      image: item.productId.Images?.[0],
      price: item.productId.Price,
      quantity: item.quantity,
      customizationNote: item.customizationNote || "",
    }));


    // 4. Create MongoDB Order
    const order = new Order({
      user: userId,

      orderType: orderType || "product",
      items: orderItems,
      customizationNote: customizationNote || "",
      shippingAddress: {
        name: Name,
        phone: Phone,
        address: Address,
        city: City,
        state: State,
        pincode: Pincode,
      },

      totalAmount,

      paymentMethod: "RAZORPAY",

      paymentStatus: "Paid",

      orderStatus: "Placed",
    });


    // 5. Save order
    await order.save();


    // 6. Send response
    res.status(200).json({
      success: true,
      message: "Payment verified and order created successfully",
      paymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      order,
    });

  } catch (error) {
    console.error(
      "Payment verification error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
};


// import crypto from "crypto";
// import razorpay from "../config/razorpay.js";

// export const createRazorpayOrder = async (req, res) => {
//   try {
//     const { amount } = req.body;

//     if (!amount || amount <= 0) {
//       return res.status(400).json({
//         message: "Invalid amount",
//       });
//     }

//     const options = {
//       amount: Math.round(amount * 100),
//       currency: "INR",
//       receipt: `receipt_${Date.now()}`,
//     };

//     const order = await razorpay.orders.create(options);

//     res.status(200).json({
//       success: true,
//       order,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error) {
//     console.error("Razorpay order error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Unable to create payment order",
//     });
//   }
// };

// export const verifyRazorpayPayment = async (req, res) => {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;

//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body)
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return res.status(400).json({
//         success: false,
//         message: "Payment verification failed",
//       });
//     }

//     // Payment is genuine
//     // Update your database order here

//     res.status(200).json({
//       success: true,
//       message: "Payment verified successfully",
//       paymentId: razorpay_payment_id,
//       orderId: razorpay_order_id,
//     });
//   } catch (error) {
//     console.error("Payment verification error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Payment verification failed",
//     });
//   }
// };