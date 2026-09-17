import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
Package,
ShoppingBag,
Users,
IndianRupee,
Plus,
ArrowRight,
RefreshCw,
Flower2,
BriefcaseBusiness,
CheckCircle,
} from "lucide-react";
import api from "../api/axios";

function Dashboard() {
const navigate = useNavigate();

const [dashboard, setDashboard] = useState({
totalProducts: 0,
totalOrders: 0,
totalCustomers: 0,
totalSales: 0,
totalFlowers: 0,
totalServices: 0,
availableProducts: 0,
recentOrders: [],
});

const [loading, setLoading] = useState(true);
const [refreshing, setRefreshing] = useState(false);
const [error, setError] = useState("");

const fetchDashboard = async (showRefresh = false) => {
try {
if (showRefresh) {
setRefreshing(true);
} else {
setLoading(true);
}

  setError("");

  const response = await api.get("/admin/dashboard");

  if (response.data.success) {
    setDashboard(response.data.data);
  }
} catch (error) {
  console.error("Dashboard fetch error:", error);
  setError("Unable to load dashboard data.");
} finally {
  setLoading(false);
  setRefreshing(false);
}

};

useEffect(() => {
fetchDashboard();

const interval = setInterval(() => {
  fetchDashboard(true);
}, 15000);

return () => clearInterval(interval);

}, []);

const formatPrice = (amount) => {
return new Intl.NumberFormat("en-IN", {
style: "currency",
currency: "INR",
maximumFractionDigits: 0,
}).format(amount || 0);
};

const formatDate = (date) => {
if (!date) return "";

return new Date(date).toLocaleDateString("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

};

const getStatusClass = (status) => {
switch (status) {
case "Delivered":
return "bg-green-100 text-green-700";

  case "Cancelled":
    return "bg-red-100 text-red-700";

  case "Preparing":
    return "bg-yellow-100 text-yellow-700";

  case "Out for Delivery":
    return "bg-blue-100 text-blue-700";

  case "Confirmed":
    return "bg-purple-100 text-purple-700";

  default:
    return "bg-gray-100 text-gray-700";
}

};
const stats = [
  {
    title: "Total Products",
    value: dashboard.totalProducts,
    icon: Package,
    description: `${dashboard.availableProducts} currently available`,
  },
  {
    title: "Total Orders",
    value: dashboard.totalOrders,
    icon: ShoppingBag,
    description: "Orders received",
  },
  {
    title: "Customers",
    value: dashboard.totalCustomers,
    icon: Users,
    description: "Unique customers",
  },
  {
    title: "Total Sales",
    value: formatPrice(dashboard.totalSales),
    icon: IndianRupee,
    description: "Excluding cancelled orders",
  },
];
if (loading) {
return (
<div className="min-h-screen bg-pink-50/30 px-6 py-10">
<div className="max-w-7xl mx-auto">
<div className="animate-pulse">
<div className="h-8 w-64 bg-gray-200 rounded mb-3"></div>

        <div className="h-4 w-96 bg-gray-200 rounded mb-10"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl p-6 h-36 shadow-sm"
            >
              <div className="h-10 w-10 bg-gray-200 rounded-xl mb-4"></div>

              <div className="h-6 w-20 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

}

return (
<div className="min-h-screen bg-pink-50/30 px-6 py-10">
<div className="max-w-7xl mx-auto">

    {/* Header */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Shop Dashboard
        </h1>

        <p className="text-gray-500 mt-1">
          Manage your flowers, services and orders
        </p>
      </div>

      <button
        onClick={() => fetchDashboard(true)}
        disabled={refreshing}
        className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 hover:bg-gray-50 transition"
      >
        <RefreshCw
          size={17}
          className={refreshing ? "animate-spin" : ""}
        />

        {refreshing ? "Refreshing..." : "Refresh"}
      </button>
    </div>

    {/* Error */}
    {error && (
      <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
        {error}
      </div>
    )}

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-2">
                  {stat.value}
                </h2>
              </div>

              <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
                <Icon size={21} className="text-pink-600" />
              </div>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>

    {/* Product Overview */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center">
            <Flower2 size={20} className="text-pink-600" />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Flower Products
            </p>

            <p className="text-xl font-bold text-gray-800">
              {dashboard.totalFlowers}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <BriefcaseBusiness
              size={20}
              className="text-purple-600"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Services
            </p>

            <p className="text-xl font-bold text-gray-800">
              {dashboard.totalServices}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <CheckCircle
              size={20}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Available Items
            </p>

            <p className="text-xl font-bold text-gray-800">
              {dashboard.availableProducts}
            </p>
          </div>
        </div>
      </div>

    </div>

    {/* Recent Orders */}
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest orders received from customers
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/orders")}
          className="flex items-center gap-2 text-sm text-pink-600 hover:text-pink-700 font-medium"
        >
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {dashboard.recentOrders.length === 0 ? (
        <div className="py-16 text-center">
          <ShoppingBag
            size={40}
            className="mx-auto text-gray-300 mb-3"
          />

          <p className="text-gray-500">
            No orders yet
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">

            <thead>
              <tr className="text-left text-xs text-gray-500 bg-gray-50">
                <th className="px-6 py-4 font-medium">
                  Order
                </th>

                <th className="px-6 py-4 font-medium">
                  Customer
                </th>

                <th className="px-6 py-4 font-medium">
                  Items
                </th>

                <th className="px-6 py-4 font-medium">
                  Amount
                </th>

                <th className="px-6 py-4 font-medium">
                  Status
                </th>

                <th className="px-6 py-4 font-medium">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {dashboard.recentOrders.map((order) => (
                <tr
                  key={order._id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-5">
                    <span className="font-semibold text-gray-800">
                      {order.orderNumber}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span className="text-gray-700">
                      {order.customerName}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <div className="max-w-xs">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="text-sm text-gray-600"
                        >
                          {item.name} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <span className="font-semibold text-gray-800">
                      {formatPrice(order.totalAmount)}
                    </span>
                  </td>

                  <td className="px-6 py-5">
                    <span
                      className={`inline-flex px-3 py-1.5 rounded-full text-xs font-medium ${getStatusClass(
                        order.orderStatus
                      )}`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>

                  <td className="px-6 py-5 text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      )}
    </div>

    {/* Quick Actions */}
    <div className="mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

        <button
          onClick={() => navigate("/admin/products/create")}
          className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-pink-100 flex items-center justify-center">
            <Plus size={21} className="text-pink-600" />
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              Add Product
            </p>

            <p className="text-sm text-gray-500">
              Add flowers or services
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate("/admin/products")}
          className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-purple-100 flex items-center justify-center">
            <Package
              size={21}
              className="text-purple-600"
            />
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              Manage Products
            </p>

            <p className="text-sm text-gray-500">
              View and update inventory
            </p>
          </div>
        </button>

        <button
          onClick={() => navigate("/admin/orders")}
          className="bg-white border border-gray-100 rounded-2xl p-5 flex items-center gap-4 hover:shadow-md transition text-left"
        >
          <div className="w-11 h-11 rounded-xl bg-green-100 flex items-center justify-center">
            <ShoppingBag
              size={21}
              className="text-green-600"
            />
          </div>

          <div>
            <p className="font-semibold text-gray-800">
              Manage Orders
            </p>

            <p className="text-sm text-gray-500">
              Track customer orders
            </p>
          </div>
        </button>

      </div>
    </div>

  </div>
</div>

);
}

export default Dashboard;
// import { useEffect, useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";
// import {
//   Package,
//   ShoppingBag,
//   Users,
//   IndianRupee,
//   Plus,
//   ClipboardList,
//   UserCircle,
//   LogOut,
// } from "lucide-react";

// function Dashboard() {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const [loading, setLoading] = useState(false);

//   // Temporary dashboard stats
//   // Later these can come from an API
//   const stats = [
//     {
//       title: "Total Products",
//       value: "24",
//       icon: Package,
//       description: "Products listed",
//     },
//     {
//       title: "Total Orders",
//       value: "18",
//       icon: ShoppingBag,
//       description: "Orders received",
//     },
//     {
//       title: "Customers",
//       value: "32",
//       icon: Users,
//       description: "Registered customers",
//     },
//     {
//       title: "Total Sales",
//       value: "₹24,850",
//       icon: IndianRupee,
//       description: "Overall revenue",
//     },
//   ];

//   const handleLogout = async () => {
//     await logout();
//     navigate("/login");
//   };

//   return (
//     <div className="min-h-screen bg-[#fff7f9] flex">

//       {/* Sidebar */}

//       <div className="hidden md:flex md:w-64 bg-white shadow-lg p-6 flex-col">

//         {/* Logo */}

//         <div className="mb-10">
//           <h2 className="text-2xl font-bold text-pink-600">
//             The Floral
//             <span className="text-gray-800"> Palette</span>
//           </h2>

//           <p className="text-xs text-gray-500 mt-1">
//             Shop Management
//           </p>
//         </div>

//         {/* Navigation */}

//         <ul className="space-y-3 flex-1">

//           <li>
//             <button
//               className="w-full flex items-center gap-3 text-left bg-pink-50 text-pink-600 px-4 py-3 rounded-lg font-medium"
//               onClick={() => navigate("/admin")}
//             >
//               <ClipboardList size={19} />
//               Dashboard
//             </button>
//           </li>

//           <li>
//             <button
//               className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
//               onClick={() => navigate("/admin/products")}
//             >
//               <Package size={19} />
//               Product Listing
//             </button>
//           </li>

//           <li>
//             <button
//               className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
//               onClick={() => navigate("/admin/products/create")}
//             >
//               <Plus size={19} />
//               Register Product
//             </button>
//           </li>



//           <li>
//             <button
//                className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
//                onClick={() => navigate("/admin/orders")}
//             >
//               <ShoppingBag size={19} />
//               Orders
//             </button>
//           </li>

//           {/* 
//           Customers route is not created yet in App.jsx.
//           */}

//           {/* <li>
//             <button
//               className="w-full flex items-center gap-3 text-left text-gray-400 px-4 py-3 rounded-lg cursor-not-allowed"
//               disabled
//             >
//               <Users size={19} />
//               Customers
//             </button>
//           </li> */}

//           <li>
//             <button
//               className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
//               onClick={() => navigate("/account")}
//             >
//               <UserCircle size={19} />
//               My Account
//             </button>
//           </li>

//         </ul>

//         {/* Logout */}

//         <button
//           className="w-full flex items-center gap-3 text-left text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg transition"
//           onClick={handleLogout}
//         >
//           <LogOut size={19} />
//           Logout
//         </button>

//       </div>


//       {/* Main Content */}

//       <div className="flex-1 p-5 md:p-10">

//         {/* Header */}

//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">

//           <div>

//             <p className="text-sm text-pink-600 font-medium mb-1">
//               Owner Dashboard
//             </p>

//             <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
//               Welcome Back!
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Manage your shop, products and orders from here.
//             </p>

//           </div>

//           <button
//             onClick={() => navigate("/admin/products/create")}
//             className="mt-5 sm:mt-0 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg shadow transition"
//           >
//             <Plus size={18} />
//             Add Product
//           </button>

//         </div>


//         {/* Stats */}

//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

//           {stats.map((stat) => {

//             const Icon = stat.icon;

//             return (
//               <div
//                 key={stat.title}
//                 className="bg-white rounded-xl shadow-sm p-5 border border-pink-100 hover:shadow-md transition"
//               >

//                 <div className="flex items-center justify-between mb-4">

//                   <div className="p-3 bg-pink-50 text-pink-600 rounded-lg">
//                     <Icon size={22} />
//                   </div>

//                 </div>

//                 <p className="text-sm text-gray-500">
//                   {stat.title}
//                 </p>

//                 <h2 className="text-2xl font-bold text-gray-800 mt-1">
//                   {stat.value}
//                 </h2>

//                 <p className="text-xs text-gray-400 mt-1">
//                   {stat.description}
//                 </p>

//               </div>
//             );

//           })}

//         </div>


//         {/* Main Dashboard Sections */}

//         <div className="grid lg:grid-cols-3 gap-6">

//           {/* Recent Orders */}

//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-pink-100 p-6">

//             <div className="flex items-center justify-between mb-6">

//               <div>

//                 <h2 className="text-lg font-semibold text-gray-800">
//                   Recent Orders
//                 </h2>

//                 <p className="text-sm text-gray-500 mt-1">
//                   Latest orders received by your shop
//                 </p>

//               </div>

//             </div>


//             {loading ? (

//               <div className="space-y-4">

//                 {[1, 2, 3].map((item) => (

//                   <div
//                     key={item}
//                     className="h-16 bg-pink-50 animate-pulse rounded-lg"
//                   />

//                 ))}

//               </div>

//             ) : (

//               <div className="space-y-4">

//                 {/* Example order rows */}

//                 <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">

//                   <div>

//                     <h3 className="font-medium text-gray-800">
//                       Order #FL1024
//                     </h3>

//                     <p className="text-xs text-gray-500 mt-1">
//                       Rose Bouquet
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-800">
//                       ₹1,299
//                     </p>

//                     <span className="text-xs text-green-600">
//                       Delivered
//                     </span>

//                   </div>

//                 </div>


//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

//                   <div>

//                     <h3 className="font-medium text-gray-800">
//                       Order #FL1023
//                     </h3>

//                     <p className="text-xs text-gray-500 mt-1">
//                       Wedding Decoration
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-800">
//                       ₹4,500
//                     </p>

//                     <span className="text-xs text-yellow-600">
//                       Processing
//                     </span>

//                   </div>

//                 </div>


//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

//                   <div>

//                     <h3 className="font-medium text-gray-800">
//                       Order #FL1022
//                     </h3>

//                     <p className="text-xs text-gray-500 mt-1">
//                       Car Decoration
//                     </p>

//                   </div>

//                   <div className="text-right">

//                     <p className="font-semibold text-gray-800">
//                       ₹2,800
//                     </p>

//                     <span className="text-xs text-blue-600">
//                       Confirmed
//                     </span>

//                   </div>

//                 </div>

//               </div>

//             )}

//           </div>


//           {/* Quick Actions */}

//           <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">

//             <h2 className="text-lg font-semibold text-gray-800">
//               Quick Actions
//             </h2>

//             <p className="text-sm text-gray-500 mt-1 mb-5">
//               Manage your shop quickly
//             </p>


//             <div className="space-y-3">

//               <button
//                 onClick={() => navigate("/admin/products/create")}
//                 className="w-full flex items-center gap-3 p-4 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition text-left"
//               >

//                 <Plus size={20} />

//                 <div>

//                   <p className="font-medium">
//                     Add New Product
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     Add flowers or services
//                   </p>

//                 </div>

//               </button>


//               <button
//                 onClick={() => navigate("/admin/products")}
//                 className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition text-left"
//               >

//                 <Package size={20} />

//                 <div>

//                   <p className="font-medium">
//                     Manage Products
//                   </p>

//                   <p className="text-xs text-gray-500">
//                     View your product listings
//                   </p>

//                 </div>

//               </button>


//               {/* Owner order management route is not available yet */}

//               <button
//                 className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 text-gray-700  text-left"
//                 onClick={() => navigate("/admin/orders")}
//                 >

//                 <ShoppingBag size={20} />

//                 <div>

//                   <p className="font-medium">
//                     Manage Orders
//                   </p>
//                 </div>

//               </button>

//             </div>

//           </div>

//         </div>


//         {/* Bottom Information */}

//         <div className="mt-6 bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-6 text-white">

//           <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

//             <div>

//               <h2 className="text-xl font-semibold">
//                 Grow Your Floral Business
//               </h2>

//               <p className="text-pink-100 text-sm mt-1">
//                 Keep your products updated and manage customer
//                 orders efficiently.
//               </p>

//             </div>

//             <button
//               onClick={() => navigate("/products")}
//               className="bg-white text-pink-600 px-5 py-2.5 rounded-lg font-medium hover:bg-pink-50 transition"
//             >
//               Manage Products
//             </button>

//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Dashboard;
