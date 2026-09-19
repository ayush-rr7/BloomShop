import Order from "../models/Order.js";

// // Create Order

const createOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      items,
      Name,
      Phone,
      Address,
      City,
      State,
      Pincode,
      paymentMethod,
      orderType,
      customizationNote,
    } = req.body;

    console.log("Order Items:", items);

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No items to order",
      });
    }

    const orderItems = items.map((item) => ({
      product: item.productId._id,
      name: item.productId.Name,
      image: item.productId.Images?.[0],
      price: item.productId.Price,
      quantity: item.quantity,
    }));

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

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

      paymentMethod: paymentMethod || "COD",

      paymentStatus: "Pending",

      orderStatus: "Placed",
    });

    console.log("Order:", order);

    await order.save();

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.log("Create Order Error:", error);

    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

export { createOrder };
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.userId;

//     const {
//       items,
//       Name,
//       Phone,
//       Address,
//       City,
//       State,
//       Pincode,
//       paymentMethod,
//     } = req.body;

//     console.log("Order Items:", items);

//     // Check items
//     if (!items || items.length === 0) {
//       return res.status(400).json({
//         message: "No items to order",
//       });
//     }

//     // Create order items
//     const orderItems = items.map((item) => ({
//       product: item.product,
//       name: item.name,
//       image: item.image,
//       price: item.price,
//       quantity: item.quantity,
//     }));

//     // Calculate total
//     const totalAmount = orderItems.reduce(
//       (total, item) =>
//         total + item.price * item.quantity,
//       0
//     );

//     const order = new Order({
//       user: userId,

//       items: orderItems,

//       shippingAddress: {
//         Name,
//         Phone,
//         Address,
//         City,
//         State,
//         Pincode,
//       },

//       totalAmount,

//       paymentMethod: paymentMethod || "COD",

//       paymentStatus: "Pending",

//       orderStatus: "Placed",
//     });

//     console.log("Order:", order);

//     await order.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     console.log("Create Order Error:", error);

//     res.status(500).json({
//       message: "Failed to create order",
//       error: error.message,
//     });
//   }
// };


// Get all orders of logged-in user
const getOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      user: userId,
    })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("Get Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};


// Get single order
const getOrderById = async (req, res) => {
  try {
    const userId = req.userId;

    const order = await Order.findOne({
      _id: req.params.orderId,
      user: userId,
    }).populate("items.product");

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order fetched successfully",
      order,
    });
  } catch (error) {
    console.log("Get Order Error:", error);

    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};


// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const userId = req.userId;

    const order = await Order.findOne({
      _id: req.params.orderId,
      user: userId,
    });

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    if (
      order.orderStatus === "Delivered" ||
      order.orderStatus === "Cancelled"
    ) {
      return res.status(400).json({
        message: "Order cannot be cancelled",
      });
    }

    order.orderStatus = "Cancelled";

    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.log("Cancel Order Error:", error);

    res.status(500).json({
      message: "Failed to cancel order",
      error: error.message,
    });
  }
};
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user")
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.log("Get All Orders Error:", error);

    res.status(500).json({
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Placed",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.orderStatus = orderStatus;

    await order.save();

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.log("Update Order Status Error:", error);

    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
};


const orderController = {
  createOrder,
  getOrders,
  getOrderById,
  cancelOrder,
  getAllOrders,
  updateOrderStatus,
};

export default orderController;