import Product from "../models/Product.js";
import Order from "../models/Order.js";

const getDashboardStats = async (req, res) => {
try {
  console.log("hello");
// Total products
const totalProducts = await Product.countDocuments();


// Total orders
const totalOrders = await Order.countDocuments();

// Get all orders
const orders = await Order.find()
  .populate("user", "name email")
  .sort({ createdAt: -1 });

// Unique customers
const customerIds = new Set(
  orders
    .filter((order) => order.user)
    .map((order) => order.user._id.toString())
);

const totalCustomers = customerIds.size;

// Total sales
// Cancelled orders are excluded
const totalSales = orders
  .filter((order) => order.orderStatus !== "Cancelled")
  .reduce((total, order) => {
    return total + order.totalAmount;
  }, 0);

// Total flower products
const totalFlowers = await Product.countDocuments({
  Type: "product",
});

// Total services
const totalServices = await Product.countDocuments({
  Type: "service",
});

// Available products/services
const availableProducts = await Product.countDocuments({
  Available: true,
});

// Recent 5 orders
const recentOrders = orders.slice(0, 5).map((order) => ({
  _id: order._id,

  orderNumber:
    "#" + order._id.toString().slice(-6).toUpperCase(),

  customerName: order.user?.name || "Customer",

  items: order.items.map((item) => ({
    name: item.name,
    quantity: item.quantity,
    price: item.price,
    image: item.image,
  })),

  totalAmount: order.totalAmount,

  orderStatus: order.orderStatus,

  paymentStatus: order.paymentStatus,

  createdAt: order.createdAt,
}));

res.status(200).json({
  success: true,

  data: {
    totalProducts,
    totalOrders,
    totalCustomers,
    totalSales,
    totalFlowers,
    totalServices,
    availableProducts,
    recentOrders,
  },
});


} catch (error) {
console.error("Dashboard Error:", error);


res.status(500).json({
  success: false,
  message: "Failed to load dashboard data",
});

}
};

const dashboardController = {
getDashboardStats,
};

export default dashboardController;
