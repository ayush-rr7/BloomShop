import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Package,
  MapPin,
  CreditCard,
  CalendarDays,
  ShoppingBag,
  Truck,
  CheckCircle2,
  Clock3,
  XCircle,
  ArrowRight,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/order/get`, {
        withCredentials: true,
      });

      setOrders(res.data.orders || res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusDetails = (status) => {
    switch (status) {
      case "Delivered":
        return {
          className: "bg-emerald-50 text-emerald-700 border-emerald-200",
          icon: <CheckCircle2 size={15} />,
        };

      case "Cancelled":
        return {
          className: "bg-red-50 text-red-700 border-red-200",
          icon: <XCircle size={15} />,
        };

      case "Shipped":
        return {
          className: "bg-blue-50 text-blue-700 border-blue-200",
          icon: <Truck size={15} />,
        };

      default:
        return {
          className: "bg-amber-50 text-amber-700 border-amber-200",
          icon: <Clock3 size={15} />,
        };
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff8fa] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 mt-4 text-sm">
            Loading your orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fff8fa]">

      {/* Top Header */}

      <div className="bg-white border-b border-pink-100">

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div>

              <div className="flex items-center gap-2 text-pink-500 text-sm font-medium mb-3">
                <Package size={17} />
                Order History
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
                My Orders
              </h1>

              <p className="text-gray-500 mt-2">
                View and track all your flower orders in one place.
              </p>

            </div>

            <button
              onClick={() => navigate("/products")}
              className="flex items-center justify-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-3 rounded-xl font-medium transition shadow-sm"
            >
              <ShoppingBag size={18} />
              Continue Shopping
              <ArrowRight size={17} />
            </button>

          </div>

        </div>

      </div>

      {/* Main Content */}

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">

        {orders.length === 0 ? (

          /* Empty State */

          <div className="bg-white border border-pink-100 rounded-3xl p-12 sm:p-16 text-center shadow-sm">

            <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center mx-auto">
              <ShoppingBag
                size={34}
                className="text-pink-400"
              />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 mt-6">
              No orders yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              You haven't placed any orders yet. Explore our collection
              and find something beautiful for your next occasion.
            </p>

            <button
              onClick={() => navigate("/products")}
              className="mt-7 bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl font-medium transition"
            >
              Explore Flowers
            </button>

          </div>

        ) : (

          <div className="space-y-6">

            {orders.map((order) => {

              const status = order.orderStatus || "Pending";
              const statusDetails = getStatusDetails(status);

              const itemCount = order.items?.reduce(
                (total, item) => total + item.quantity,
                0
              );

              return (
<div
  key={order._id}
  className="bg-white rounded-2xl border border-green-400 shadow-sm hover:shadow-md transition overflow-hidden"
>
  {/* Order Top */}

  <div className="px-4 sm:px-5 py-3.5 bg-gradient-to-r from-pink-50/70 to-white border-b border-pink-100">

    <div className="flex flex-wrap items-center justify-between gap-3">

      <div className="flex flex-wrap items-center gap-x-5 gap-y-2">

        <div>
          <p className="text-[10px] uppercase tracking-wider text-gray-400 font-medium">
            Order ID
          </p>

          <p className="text-sm font-semibold text-gray-800">
            #{order._id?.slice(-8)}
          </p>
        </div>

        <div className="hidden sm:block w-px h-7 bg-pink-100"></div>

        <div className="flex items-center gap-1.5">
          <CalendarDays
            size={14}
            className="text-gray-400"
          />

          <div>
            <p className="text-[10px] text-gray-400">
              Placed on
            </p>

            <p className="text-sm font-medium text-gray-700">
              {order.createdAt
                ? new Date(order.createdAt).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }
                  )
                : "N/A"}
            </p>
          </div>
        </div>

        <div className="hidden sm:block w-px h-7 bg-pink-100"></div>

        <div>
          <p className="text-[10px] text-gray-400">
            Items
          </p>

          <p className="text-sm font-medium text-gray-700">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>

      </div>

      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusDetails.className}`}
      >
        {statusDetails.icon}
        {status}
      </span>

    </div>

  </div>

  {/* Products */}

  <div className="px-4 sm:px-5 py-4">

    <div className="flex items-center gap-2 mb-3">
      <Package
        size={16}
        className="text-pink-500"
      />

      <h2 className="text-sm font-semibold text-gray-800">
        Ordered Items
      </h2>
    </div>

    <div className="space-y-2.5">

      {order.items?.map((item) => (

        <div
          key={item._id || item.product}
          className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 border border-gray-100"
        >

          {/* Image */}

          <div className="relative flex-shrink-0">

            <img
              src={item.image}
              alt={item.name || "Product"}
              className="w-16 h-16 sm:w-18 sm:h-18 object-cover rounded-lg border border-gray-200"
            />

            <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-pink-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              ×{item.quantity}
            </span>

          </div>

          {/* Product Details */}

          <div className="flex-1 min-w-0">

            <h3 className="font-semibold text-gray-800 text-sm truncate">
              {item.name || "Product"}
            </h3>

            <p className="text-xs text-gray-500 mt-0.5">
              ₹{item.price || 0} × {item.quantity}
            </p>

            {item.customizationNote && (
              <span className="inline-block mt-1 text-[10px] bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 rounded-md truncate max-w-full">
                Custom: {item.customizationNote}
              </span>
            )}

          </div>

          {/* Item Total */}

          <div className="text-right flex-shrink-0">

            <p className="text-[10px] text-gray-400">
              Total
            </p>

            <p className="text-sm font-bold text-gray-900">
              ₹{(item.price || 0) * item.quantity}
            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

  {/* Bottom Information */}

  <div className="border-t border-gray-100 px-4 sm:px-5 py-4">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

      {/* Delivery Address */}

      {order.shippingAddress && (

        <div className="bg-gray-50 rounded-xl p-3.5">

          <div className="flex items-center gap-2 mb-2.5">

            <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
              <MapPin
                size={15}
                className="text-pink-500"
              />
            </div>

            <div>
              <p className="text-xs font-semibold text-gray-800">
                Delivery Address
              </p>

              <p className="text-[10px] text-gray-400">
                Shipping destination
              </p>
            </div>

          </div>

          <div className="text-xs">

            <p className="font-medium text-gray-800">
              {order.shippingAddress.name}
            </p>

            <p className="text-gray-500 mt-0.5">
              {order.shippingAddress.phone}
            </p>

            <p className="text-gray-600 mt-1.5 leading-relaxed">
              {order.shippingAddress.address},{" "}
              {order.shippingAddress.city},{" "}
              {order.shippingAddress.state} -{" "}
              {order.shippingAddress.pincode}
            </p>

          </div>

        </div>

      )}

      {/* Payment */}

      <div className="bg-gray-50 rounded-xl p-3.5">

        <div className="flex items-center gap-2 mb-2.5">

          <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center shadow-sm">
            <CreditCard
              size={15}
              className="text-pink-500"
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-gray-800">
              Payment Details
            </p>

            <p className="text-[10px] text-gray-400">
              Order payment information
            </p>
          </div>

        </div>

        <div className="space-y-2">

          <div className="flex justify-between text-xs">
            <span className="text-gray-500">
              Payment method
            </span>

            <span className="font-medium text-gray-800">
              {order.paymentMethod === "RAZORPAY"
                ? "Online Payment"
                : "Cash on Delivery"}
            </span>
          </div>

          <div className="flex justify-between text-xs">
            <span className="text-gray-500">
              Payment status
            </span>

            <span
              className={`font-medium ${
                order.paymentStatus === "Paid"
                  ? "text-emerald-600"
                  : "text-amber-600"
              }`}
            >
              {order.paymentStatus || "Pending"}
            </span>
          </div>

          <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between items-center">

            <span className="text-sm font-semibold text-gray-800">
              Total Amount
            </span>

            <span className="text-lg font-bold text-pink-600">
              ₹{order.totalAmount || 0}
            </span>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

               

              );
            })}

          </div>

        )}

      </div>

    </div>
  );
}

export default Orders;
