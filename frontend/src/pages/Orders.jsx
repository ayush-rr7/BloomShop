

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

import { createOrder,getOrders } from "../api/orderService";

const API = import.meta.env.VITE_API_URL;

function Orders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      // const res = await axios.get(`${API}/order/get`, {
      
      const res = await getOrders();
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
  console.log("ORDER DATA:", order);
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

  {/* Order Type */}
  <div className="mb-3 flex items-center gap-2 text-xs">
    <span className="text-gray-500">
      Order Type:
    </span>

    <span className="font-semibold text-gray-700 capitalize">
      {order.orderType || "product"}
    </span>
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

  {/* Customization / Additional Note */}

  {order.customizationNote && (
    <div className="mt-4 bg-pink-50 border border-pink-100 rounded-xl p-3.5">

      <p className="text-xs font-semibold text-pink-700 mb-1">
        Customization / Additional Note
      </p>

      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {order.customizationNote}
      </p>

    </div>
  )}

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

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Package,
//   MapPin,
//   CreditCard,
//   CalendarDays,
//   ShoppingBag,
//   Truck,
//   CheckCircle2,
//   XCircle,
//   ArrowRight,
//   Box,
// } from "lucide-react";

// import {
//   getOrders,
//   cancelOrder,
// } from "../api/orderService";

// /* --------------------------------------------------
//    Order Status Tracker
// -------------------------------------------------- */

// const orderStatuses = [
//   {
//     key: "Placed",
//     label: "Placed",
//     icon: Package,
//   },
//   {
//     key: "Packed",
//     label: "Packed",
//     icon: Box,
//   },
//   {
//     key: "Shipped",
//     label: "Shipped",
//     icon: Truck,
//   },
//   {
//     key: "Delivered",
//     label: "Delivered",
//     icon: CheckCircle2,
//   },
// ];

// const OrderStatusTracker = ({ status }) => {
//   // Cancelled order
//   if (status === "Cancelled") {
//     return (
//       <div className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100">
//         <div className="flex items-center gap-2 text-red-600">
//           <XCircle size={18} />

//           <span className="text-sm font-semibold">
//             Order Cancelled
//           </span>
//         </div>
//       </div>
//     );
//   }

//   /*
//     Support old backend statuses as well.

//     Pending / Confirmed -> Placed
//     Processing          -> Packed
//   */
//   let trackerStatus = status;

//   if (
//     status === "Pending" ||
//     status === "Confirmed"
//   ) {
//     trackerStatus = "Placed";
//   }

//   if (status === "Processing") {
//     trackerStatus = "Packed";
//   }

//   const currentIndex = orderStatuses.findIndex(
//     (item) => item.key === trackerStatus
//   );

//   // If status is unknown, show Placed
//   const activeIndex =
//     currentIndex === -1 ? 0 : currentIndex;

//   return (
//     <div className="mt-5 px-2 sm:px-4">
//       <div className="relative">

//         {/* Background progress line */}

//         <div className="absolute left-0 right-0 top-5 h-0.5 bg-gray-200" />

//         {/* Completed progress line */}

//         <div
//           className="absolute left-0 top-5 h-0.5 bg-emerald-500 transition-all duration-500"
//           style={{
//             width:
//               activeIndex === 0
//                 ? "0%"
//                 : `${(activeIndex /
//                     (orderStatuses.length - 1)) *
//                     100}%`,
//           }}
//         />

//         {/* Status items */}

//         <div className="relative flex justify-between">
//           {orderStatuses.map((item, index) => {
//             const Icon = item.icon;

//             const completed =
//               index < activeIndex;

//             const current =
//               index === activeIndex;

//             const upcoming =
//               index > activeIndex;

//             return (
//               <div
//                 key={item.key}
//                 className="flex flex-col items-center"
//               >
//                 {/* Circle */}

//                 <div
//                   className={`
//                     w-10 h-10 rounded-full
//                     flex items-center justify-center
//                     border-2
//                     bg-white
//                     transition-all duration-300
//                     ${
//                       completed
//                         ? "border-emerald-500 bg-emerald-500 text-white"
//                         : ""
//                     }
//                     ${
//                       current
//                         ? "border-pink-500 bg-pink-500 text-white scale-110"
//                         : ""
//                     }
//                     ${
//                       upcoming
//                         ? "border-gray-200 text-gray-400"
//                         : ""
//                     }
//                   `}
//                 >
//                   <Icon size={17} />
//                 </div>

//                 {/* Label */}

//                 <span
//                   className={`
//                     mt-2 text-xs sm:text-sm font-medium
//                     ${
//                       completed
//                         ? "text-emerald-600"
//                         : ""
//                     }
//                     ${
//                       current
//                         ? "text-pink-600 font-semibold"
//                         : ""
//                     }
//                     ${
//                       upcoming
//                         ? "text-gray-400"
//                         : ""
//                     }
//                   `}
//                 >
//                   {item.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// /* --------------------------------------------------
//    Orders Page
// -------------------------------------------------- */

// const Orders = () => {
//   const navigate = useNavigate();

//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [cancellingOrder, setCancellingOrder] =
//     useState(null);

//   /* --------------------------------------------------
//      Fetch Orders
//   -------------------------------------------------- */

//   const fetchOrders = async () => {
//     try {
//       const res = await getOrders();

//       setOrders(res.data.orders || res.data);
//     } catch (err) {
//       console.log("Fetch orders error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchOrders();
//   }, []);

//   /* --------------------------------------------------
//      Cancel Order
//   -------------------------------------------------- */

//   const handleCancelOrder = async (orderId) => {
//     const confirmed = window.confirm(
//       "Are you sure you want to cancel this order?"
//     );

//     if (!confirmed) return;

//     try {
//       setCancellingOrder(orderId);

//       const res = await cancelOrder(orderId);

//       /*
//         If backend returns updated order,
//         use it directly.
//       */

//       const updatedOrder = res.data?.order;

//       if (updatedOrder) {
//         setOrders((prev) =>
//           prev.map((order) =>
//             order._id === orderId
//               ? updatedOrder
//               : order
//           )
//         );
//       } else {
//         /*
//           Fallback if backend doesn't return
//           the updated order.
//         */

//         setOrders((prev) =>
//           prev.map((order) =>
//             order._id === orderId
//               ? {
//                   ...order,
//                   orderStatus: "Cancelled",
//                   cancelledBy: "customer",
//                   cancelledAt:
//                     new Date().toISOString(),
//                 }
//               : order
//           )
//         );
//       }
//     } catch (err) {
//       console.log(
//         "Cancel order error:",
//         err
//       );

//       alert(
//         err.response?.data?.message ||
//           "Unable to cancel order"
//       );
//     } finally {
//       setCancellingOrder(null);
//     }
//   };

//   /* --------------------------------------------------
//      Loading State
//   -------------------------------------------------- */

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="w-10 h-10 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin" />
//       </div>
//     );
//   }

//   /* --------------------------------------------------
//      Empty Orders
//   -------------------------------------------------- */

//   if (!orders.length) {
//     return (
//       <div className="min-h-screen bg-gray-50 px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 sm:p-12 text-center">

//             <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-pink-50 flex items-center justify-center">
//               <ShoppingBag
//                 size={28}
//                 className="text-pink-500"
//               />
//             </div>

//             <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
//               No orders yet
//             </h2>

//             <p className="text-gray-500 mt-2 max-w-md mx-auto">
//               You haven't placed any flower
//               orders yet. Explore our collection
//               and find something beautiful.
//             </p>

//             <button
//               type="button"
//               onClick={() =>
//                 navigate("/products")
//               }
//               className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-pink-500 text-white text-sm font-medium hover:bg-pink-600 transition"
//             >
//               Explore Flowers
//               <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   /* --------------------------------------------------
//      Main Page
//   -------------------------------------------------- */

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-10">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

//           <div>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
//               Order History
//             </h1>

//             <p className="text-gray-500 mt-1">
//               View and track all your flower
//               orders in one place.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={() =>
//               navigate("/products")
//             }
//             className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-pink-200 text-pink-600 hover:bg-pink-50 transition text-sm font-medium"
//           >
//             Continue Shopping
//             <ArrowRight size={16} />
//           </button>
//         </div>

//         {/* Orders */}

//         <div className="space-y-5">

//           {orders.map((order) => {
//             const status =
//               order.orderStatus || "Pending";

//             const itemCount =
//               order.items?.reduce(
//                 (total, item) =>
//                   total + item.quantity,
//                 0
//               ) || 0;

//             /*
//               Customer can cancel only before
//               the order is shipped.
//             */

//             const canCancel = [
//               "Pending",
//               "Placed",
//               "Confirmed",
//               "Processing",
//             ].includes(status);

//             return (
//               <div
//                 key={order._id}
//                 className="bg-white rounded-2xl border border-green-400 shadow-sm hover:shadow-md transition overflow-hidden"
//               >

//                 {/* --------------------------------
//                     Order Header
//                 -------------------------------- */}

//                 <div className="px-4 sm:px-5 py-4 border-b border-gray-100">

//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

//                     <div>
//                       <div className="flex items-center gap-2">

//                         <Package
//                           size={18}
//                           className="text-pink-500"
//                         />

//                         <h2 className="font-semibold text-gray-800">
//                           Order #
//                           {order._id?.slice(-8)}
//                         </h2>
//                       </div>

//                       <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500">

//                         <span className="inline-flex items-center gap-1">
//                           <CalendarDays
//                             size={13}
//                           />

//                           {order.createdAt
//                             ? new Date(
//                                 order.createdAt
//                               ).toLocaleDateString(
//                                 "en-IN",
//                                 {
//                                   day: "numeric",
//                                   month: "short",
//                                   year: "numeric",
//                                 }
//                               )
//                             : "Date unavailable"}
//                         </span>

//                         <span>
//                           {itemCount}{" "}
//                           {itemCount === 1
//                             ? "item"
//                             : "items"}
//                         </span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* --------------------------------
//                       Status Tracker
//                   -------------------------------- */}

//                   <OrderStatusTracker
//                     status={status}
//                   />
//                 </div>

//                 {/* --------------------------------
//                     Ordered Items
//                 -------------------------------- */}

//                 <div className="px-4 sm:px-5 py-4">

//                   <h3 className="text-sm font-semibold text-gray-700 mb-3">
//                     Ordered Items
//                   </h3>

//                   <div className="space-y-3">

//                     {order.items?.map(
//                       (item, index) => {
//                         const itemTotal =
//                           item.price *
//                           item.quantity;

//                         return (
//                           <div
//                             key={
//                               item._id ||
//                               index
//                             }
//                             className="flex gap-3 sm:gap-4"
//                           >

//                             {/* Image */}

//                             <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
//                               <img
//                                 src={item.image}
//                                 alt={item.name}
//                                 className="w-full h-full object-cover"
//                               />
//                             </div>

//                             {/* Details */}

//                             <div className="flex-1 min-w-0">

//                               <div className="flex justify-between gap-3">

//                                 <div>
//                                   <h4 className="font-medium text-gray-800 text-sm sm:text-base">
//                                     {item.name}
//                                   </h4>

//                                   <p className="text-xs text-gray-500 mt-1">
//                                     ×{" "}
//                                     {
//                                       item.quantity
//                                     }
//                                   </p>
//                                 </div>

//                                 <p className="font-semibold text-gray-800 text-sm sm:text-base whitespace-nowrap">
//                                   ₹{itemTotal}
//                                 </p>

//                               </div>

//                               <p className="text-xs text-gray-500 mt-1">
//                                 ₹{item.price} ×{" "}
//                                 {item.quantity}
//                               </p>

//                               {item.customizationNote && (
//                                 <p className="text-xs text-gray-500 mt-2">
//                                   Note:{" "}
//                                   {
//                                     item.customizationNote
//                                   }
//                                 </p>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       }
//                     )}

//                   </div>
//                 </div>

//                 {/* --------------------------------
//                     Cancellation Information
//                 -------------------------------- */}

//                 {status === "Cancelled" &&
//                   order.cancelledBy && (
//                     <div className="px-4 sm:px-5 pb-4">

//                       <div className="px-3 py-2.5 rounded-lg bg-red-50 border border-red-100 text-xs text-red-600">

//                         Cancelled by{" "}

//                         <span className="font-semibold">
//                           {order.cancelledBy ===
//                           "customer"
//                             ? "you"
//                             : "FloralPallete"}
//                         </span>

//                         {order.cancelledAt && (
//                           <>
//                             {" • "}

//                             {new Date(
//                               order.cancelledAt
//                             ).toLocaleDateString(
//                               "en-IN",
//                               {
//                                 day: "numeric",
//                                 month: "short",
//                                 year: "numeric",
//                               }
//                             )}
//                           </>
//                         )}

//                       </div>
//                     </div>
//                   )}

//                 {/* --------------------------------
//                     Bottom Information
//                 -------------------------------- */}

//                 <div className="border-t border-gray-100 px-4 sm:px-5 py-4">

//                   {/* Cancel Button */}

//                   {canCancel && (
//                     <div className="mb-4 flex justify-end">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           handleCancelOrder(
//                             order._id
//                           )
//                         }
//                         disabled={
//                           cancellingOrder ===
//                           order._id
//                         }
//                         className="px-4 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed"
//                       >
//                         {cancellingOrder ===
//                         order._id
//                           ? "Cancelling..."
//                           : "Cancel Order"}
//                       </button>

//                     </div>
//                   )}

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

//                     {/* Delivery Address */}

//                     <div className="rounded-xl bg-gray-50 p-4">

//                       <div className="flex items-center gap-2 mb-3">

//                         <MapPin
//                           size={17}
//                           className="text-pink-500"
//                         />

//                         <h3 className="font-semibold text-gray-700 text-sm">
//                           Delivery Address
//                         </h3>

//                       </div>

//                       <div className="text-sm text-gray-600 space-y-1">

//                         <p className="font-medium text-gray-800">
//                           {
//                             order
//                               .deliveryAddress
//                               ?.name
//                           }
//                         </p>

//                         <p>
//                           {
//                             order
//                               .deliveryAddress
//                               ?.phone
//                           }
//                         </p>

//                         <p>
//                           {
//                             order
//                               .deliveryAddress
//                               ?.address
//                           }
//                         </p>

//                         <p>
//                           {
//                             order
//                               .deliveryAddress
//                               ?.city
//                           }
//                           ,{" "}
//                           {
//                             order
//                               .deliveryAddress
//                               ?.state
//                           }{" "}
//                           -{" "}
//                           {
//                             order
//                               .deliveryAddress
//                               ?.pincode
//                           }
//                         </p>

//                       </div>
//                     </div>

//                     {/* Payment */}

//                     <div className="rounded-xl bg-gray-50 p-4">

//                       <div className="flex items-center gap-2 mb-3">

//                         <CreditCard
//                           size={17}
//                           className="text-pink-500"
//                         />

//                         <h3 className="font-semibold text-gray-700 text-sm">
//                           Payment
//                         </h3>

//                       </div>

//                       <div className="text-sm text-gray-600 space-y-1">

//                         <p>
//                           Method:{" "}
//                           <span className="font-medium text-gray-800">
//                             {
//                               order.paymentMethod
//                             }
//                           </span>
//                         </p>

//                         <p>
//                           Payment Status:{" "}
//                           <span className="font-medium text-gray-800">
//                             {
//                               order.paymentStatus
//                             }
//                           </span>
//                         </p>

//                         <p className="pt-1">
//                           Total:{" "}
//                           <span className="font-semibold text-gray-900">
//                             ₹
//                             {
//                               order.totalAmount
//                             }
//                           </span>
//                         </p>

//                       </div>
//                     </div>

//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Orders;
