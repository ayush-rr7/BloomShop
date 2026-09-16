import { useEffect, useState } from "react";
import axios from "axios";
import {
  Package,
  User,
  MapPin,
  CreditCard,
  CalendarDays,
} from "lucide-react";

const API = import.meta.env.VITE_API_URL;

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${API}/order/all`, {
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

  const updateOrderStatus = async (orderId, orderStatus) => {
    try {
      setUpdating(orderId);

      await axios.put(
        `${API}/order/status/${orderId}`,
        { orderStatus },
        { withCredentials: true }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, orderStatus }
            : order
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setUpdating(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      case "Out for Delivery":
        return "bg-blue-100 text-blue-700";
      case "Preparing":
        return "bg-purple-100 text-purple-700";
      case "Confirmed":
        return "bg-indigo-100 text-indigo-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <p className="text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-7 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Manage Orders
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            View and manage customer orders
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <Package className="w-10 h-10 mx-auto text-pink-400 mb-3" />

            <h2 className="text-lg font-semibold text-gray-800">
              No orders yet
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Customer orders will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">

            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-2xl shadow-sm border border-pink-100 overflow-hidden"
              >

                {/* Order Header */}
                <div className="px-4 sm:px-5 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-gray-100">

                  <div>
                    <div className="flex items-center gap-2">
                      <Package className="w-4 h-4 text-pink-500" />

                      <p className="font-semibold text-gray-800 text-sm">
                        Order #{order._id.slice(-8)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <CalendarDays className="w-3.5 h-3.5" />

                      {order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString()
                        : ""}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>

                    <p className="font-bold text-gray-800">
                      ₹{order.totalAmount}
                    </p>
                  </div>

                </div>

                {/* Customer + Address */}
                <div className="px-4 sm:px-5 py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3">

                  <div className="bg-pink-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-pink-500" />

                      <h3 className="text-sm font-semibold text-gray-800">
                        Customer
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      {order.shippingAddress?.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.shippingAddress?.phone}
                    </p>
                  </div>

                  <div className="bg-pink-50 rounded-xl p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4 text-pink-500" />

                      <h3 className="text-sm font-semibold text-gray-800">
                        Delivery Address
                      </h3>
                    </div>

                    <p className="text-sm text-gray-700">
                      {order.shippingAddress?.address}
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.shippingAddress?.city},{" "}
                      {order.shippingAddress?.state} -{" "}
                      {order.shippingAddress?.pincode}
                    </p>
                  </div>

                </div>

                {/* Products */}
                <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100">

                  <h3 className="text-sm font-semibold text-gray-800 mb-2.5">
                    Ordered Items
                  </h3>

                  <div className="space-y-2.5">
                    {order.items?.map((item, index) => (
                      <div
                        key={item._id || index}
                        className="flex items-center gap-3 bg-gray-50 rounded-xl p-2.5"
                      >
                        <img
                          src={
                            item.image ||
                            item.product?.Images?.[0]
                          }
                          alt={item.name}
                          className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg"
                        />

                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-800 truncate">
                            {item.name}
                          </h4>

                          <p className="text-xs text-gray-500 mt-0.5">
                            Qty: {item.quantity} · ₹{item.price}
                          </p>

                          {item.customizationNote && (
                            <p className="text-xs text-gray-500 mt-1 truncate">
                              Note: {item.customizationNote}
                            </p>
                          )}
                        </div>

                        <p className="font-semibold text-sm text-gray-800">
                          ₹{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Payment + Status */}
                <div className="px-4 sm:px-5 py-3.5 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">

                  <div className="flex items-center gap-3">

                    <div className="bg-pink-50 rounded-xl p-2.5">
                      <CreditCard className="w-4 h-4 text-pink-500" />
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">
                        Payment
                      </p>

                      <p className="text-sm font-medium text-gray-800">
                        {order.paymentMethod}
                      </p>
                    </div>

                    <span
                      className={`text-xs font-semibold ${
                        order.paymentStatus === "Paid"
                          ? "text-green-600"
                          : order.paymentStatus === "Failed"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {order.paymentStatus}
                    </span>

                  </div>

                  {/* Update Status */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 hidden sm:block">
                      Update status
                    </span>

                    <select
                      value={order.orderStatus}
                      disabled={updating === order._id}
                      onChange={(e) =>
                        updateOrderStatus(
                          order._id,
                          e.target.value
                        )
                      }
                      className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-200"
                    >
                      <option value="Placed">Placed</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for Delivery">
                        Out for Delivery
                      </option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}

export default ManageOrders;

