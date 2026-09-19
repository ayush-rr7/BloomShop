import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    image: {
      type: String,
    },

    price: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Product or Service
    orderType: {
      type: String,
      enum: ["product", "service"],
      default: "product",
    },

    items: {
      type: [orderItemSchema],
      required: true,
    },

    // Works for both products and services
    customizationNote: {
      type: String,
      trim: true,
      default: "",
    },

    shippingAddress: {
      name: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      address: {
        type: String,
        required: true,
      },

      city: {
        type: String,
        required: true,
      },

      state: {
        type: String,
        required: true,
      },

      pincode: {
        type: String,
        required: true,
      },
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "RAZORPAY"],
      default: "COD",
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: [
        "Placed",
        "Confirmed",
        "Preparing",
        "Out for Delivery",
        "Delivered",
        "Cancelled",
      ],
      default: "Placed",
    },

    // // Used to track who cancelled the order
    // cancelledBy: {
    //   type: String,
    //   enum: ["customer", "owner", null],
    //   default: null,
    // },

    // cancelledAt: {
    //   type: Date,
    //   default: null,
    // },

    razorpayOrderId: {
      type: String,
    },

    razorpayPaymentId: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);


// import mongoose from "mongoose";

// const orderItemSchema = new mongoose.Schema(
//   {
//     product: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Product",
//       required: true,
//     },

//     name: {
//       type: String,
//       required: true,
//     },

//     image: {
//       type: String,
//     },

//     price: {
//       type: Number,
//       required: true,
//     },

//     quantity: {
//       type: Number,
//       required: true,
//       min: 1,
//     },
//   },
//   { _id: false }
// );

// const orderSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     items: {
//       type: [orderItemSchema],
//       required: true,
//     },

//     shippingAddress: {
//       name: {
//         type: String,
//         required: true,
//       },

//       phone: {
//         type: String,
//         required: true,
//       },

//       address: {
//         type: String,
//         required: true,
//       },

//       city: {
//         type: String,
//         required: true,
//       },

//       state: {
//         type: String,
//         required: true,
//       },

//       pincode: {
//         type: String,
//         required: true,
//       },
//     },

//     totalAmount: {
//       type: Number,
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       enum: ["COD", "RAZORPAY"],
//       default: "COD",
//     },

//     paymentStatus: {
//       type: String,
//       enum: ["Pending", "Paid", "Failed"],
//       default: "Pending",
//     },

//     orderStatus: {
//       type: String,
//       enum: [
//         "Placed",
//         "Confirmed",
//         "Preparing",
//         "Out for Delivery",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Placed",
//     },

    

// //     cancelledBy: {
// //   type: String,
// //   enum: ["customer", "owner", null],
// //   default: null,
// // },

// // cancelledAt: {
// //   type: Date,
// //   default: null,
// // },

//     razorpayOrderId: {
//       type: String,
//     },

//     razorpayPaymentId: {
//       type: String,
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// export default mongoose.model("Order", orderSchema);