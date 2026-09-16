import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  Package,
  ShoppingBag,
  Users,
  IndianRupee,
  Plus,
  ClipboardList,
  UserCircle,
  LogOut,
} from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  // Temporary dashboard stats
  // Later these can come from an API
  const stats = [
    {
      title: "Total Products",
      value: "24",
      icon: Package,
      description: "Products listed",
    },
    {
      title: "Total Orders",
      value: "18",
      icon: ShoppingBag,
      description: "Orders received",
    },
    {
      title: "Customers",
      value: "32",
      icon: Users,
      description: "Registered customers",
    },
    {
      title: "Total Sales",
      value: "₹24,850",
      icon: IndianRupee,
      description: "Overall revenue",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#fff7f9] flex">

      {/* Sidebar */}

      <div className="hidden md:flex md:w-64 bg-white shadow-lg p-6 flex-col">

        {/* Logo */}

        <div className="mb-10">
          <h2 className="text-2xl font-bold text-pink-600">
            The Floral
            <span className="text-gray-800"> Palette</span>
          </h2>

          <p className="text-xs text-gray-500 mt-1">
            Shop Management
          </p>
        </div>

        {/* Navigation */}

        <ul className="space-y-3 flex-1">

          <li>
            <button
              className="w-full flex items-center gap-3 text-left bg-pink-50 text-pink-600 px-4 py-3 rounded-lg font-medium"
              onClick={() => navigate("/admin")}
            >
              <ClipboardList size={19} />
              Dashboard
            </button>
          </li>

          <li>
            <button
              className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
              onClick={() => navigate("/admin/products")}
            >
              <Package size={19} />
              Product Listing
            </button>
          </li>

          <li>
            <button
              className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
              onClick={() => navigate("/admin/products/create")}
            >
              <Plus size={19} />
              Register Product
            </button>
          </li>



          <li>
            <button
               className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
               onClick={() => navigate("/admin/orders")}
            >
              <ShoppingBag size={19} />
              Orders
            </button>
          </li>

          {/* 
          Customers route is not created yet in App.jsx.
          */}

          {/* <li>
            <button
              className="w-full flex items-center gap-3 text-left text-gray-400 px-4 py-3 rounded-lg cursor-not-allowed"
              disabled
            >
              <Users size={19} />
              Customers
            </button>
          </li> */}

          <li>
            <button
              className="w-full flex items-center gap-3 text-left text-gray-700 hover:text-pink-600 hover:bg-pink-50 px-4 py-3 rounded-lg transition"
              onClick={() => navigate("/account")}
            >
              <UserCircle size={19} />
              My Account
            </button>
          </li>

        </ul>

        {/* Logout */}

        <button
          className="w-full flex items-center gap-3 text-left text-red-500 hover:bg-red-50 px-4 py-3 rounded-lg transition"
          onClick={handleLogout}
        >
          <LogOut size={19} />
          Logout
        </button>

      </div>


      {/* Main Content */}

      <div className="flex-1 p-5 md:p-10">

        {/* Header */}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">

          <div>

            <p className="text-sm text-pink-600 font-medium mb-1">
              Owner Dashboard
            </p>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              Welcome Back!
            </h1>

            <p className="text-gray-500 mt-2">
              Manage your shop, products and orders from here.
            </p>

          </div>

          <button
            onClick={() => navigate("/admin/products/create")}
            className="mt-5 sm:mt-0 flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-5 py-3 rounded-lg shadow transition"
          >
            <Plus size={18} />
            Add Product
          </button>

        </div>


        {/* Stats */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

          {stats.map((stat) => {

            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="bg-white rounded-xl shadow-sm p-5 border border-pink-100 hover:shadow-md transition"
              >

                <div className="flex items-center justify-between mb-4">

                  <div className="p-3 bg-pink-50 text-pink-600 rounded-lg">
                    <Icon size={22} />
                  </div>

                </div>

                <p className="text-sm text-gray-500">
                  {stat.title}
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-1">
                  {stat.value}
                </h2>

                <p className="text-xs text-gray-400 mt-1">
                  {stat.description}
                </p>

              </div>
            );

          })}

        </div>


        {/* Main Dashboard Sections */}

        <div className="grid lg:grid-cols-3 gap-6">

          {/* Recent Orders */}

          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-pink-100 p-6">

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-lg font-semibold text-gray-800">
                  Recent Orders
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Latest orders received by your shop
                </p>

              </div>

            </div>


            {loading ? (

              <div className="space-y-4">

                {[1, 2, 3].map((item) => (

                  <div
                    key={item}
                    className="h-16 bg-pink-50 animate-pulse rounded-lg"
                  />

                ))}

              </div>

            ) : (

              <div className="space-y-4">

                {/* Example order rows */}

                <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">

                  <div>

                    <h3 className="font-medium text-gray-800">
                      Order #FL1024
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Rose Bouquet
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-gray-800">
                      ₹1,299
                    </p>

                    <span className="text-xs text-green-600">
                      Delivered
                    </span>

                  </div>

                </div>


                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

                  <div>

                    <h3 className="font-medium text-gray-800">
                      Order #FL1023
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Wedding Decoration
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-gray-800">
                      ₹4,500
                    </p>

                    <span className="text-xs text-yellow-600">
                      Processing
                    </span>

                  </div>

                </div>


                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">

                  <div>

                    <h3 className="font-medium text-gray-800">
                      Order #FL1022
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Car Decoration
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="font-semibold text-gray-800">
                      ₹2,800
                    </p>

                    <span className="text-xs text-blue-600">
                      Confirmed
                    </span>

                  </div>

                </div>

              </div>

            )}

          </div>


          {/* Quick Actions */}

          <div className="bg-white rounded-xl shadow-sm border border-pink-100 p-6">

            <h2 className="text-lg font-semibold text-gray-800">
              Quick Actions
            </h2>

            <p className="text-sm text-gray-500 mt-1 mb-5">
              Manage your shop quickly
            </p>


            <div className="space-y-3">

              <button
                onClick={() => navigate("/admin/products/create")}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-pink-50 text-pink-700 hover:bg-pink-100 transition text-left"
              >

                <Plus size={20} />

                <div>

                  <p className="font-medium">
                    Add New Product
                  </p>

                  <p className="text-xs text-gray-500">
                    Add flowers or services
                  </p>

                </div>

              </button>


              <button
                onClick={() => navigate("/admin/products")}
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition text-left"
              >

                <Package size={20} />

                <div>

                  <p className="font-medium">
                    Manage Products
                  </p>

                  <p className="text-xs text-gray-500">
                    View your product listings
                  </p>

                </div>

              </button>


              {/* Owner order management route is not available yet */}

              <button
                className="w-full flex items-center gap-3 p-4 rounded-lg bg-gray-50 text-gray-700  text-left"
                onClick={() => navigate("/admin/orders")}
                >

                <ShoppingBag size={20} />

                <div>

                  <p className="font-medium">
                    Manage Orders
                  </p>
                </div>

              </button>

            </div>

          </div>

        </div>


        {/* Bottom Information */}

        <div className="mt-6 bg-gradient-to-r from-pink-600 to-pink-500 rounded-xl p-6 text-white">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div>

              <h2 className="text-xl font-semibold">
                Grow Your Floral Business
              </h2>

              <p className="text-pink-100 text-sm mt-1">
                Keep your products updated and manage customer
                orders efficiently.
              </p>

            </div>

            <button
              onClick={() => navigate("/products")}
              className="bg-white text-pink-600 px-5 py-2.5 rounded-lg font-medium hover:bg-pink-50 transition"
            >
              Manage Products
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;
