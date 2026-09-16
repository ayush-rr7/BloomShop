import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  User,
  Mail,
  MapPin,
  Phone,
  ShoppingBag,
  ChevronRight,
} from "lucide-react";

function MyAccount() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <p className="text-gray-500">Loading account...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pink-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <p className="text-sm font-medium text-pink-600">
            Account
          </p>

          <h1 className="text-3xl font-bold text-gray-800 mt-1">
            My Account
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Manage your profile and orders
          </p>
        </div>

        {/* Account Card */}
        {user && (
          <div className="bg-white rounded-2xl border border-pink-100 shadow-sm overflow-hidden">

            {/* Profile Header */}
            <div className="px-5 sm:px-7 py-6 bg-gradient-to-r from-pink-50 to-white border-b border-pink-100">
              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center">
                  <User className="w-8 h-8 text-pink-600" />
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-0.5">
                    Customer Account
                  </p>
                </div>

              </div>
            </div>

            {/* Account Details */}
            <div className="px-5 sm:px-7 py-6">

              <h3 className="text-sm font-semibold text-gray-800 mb-4">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                {/* Email */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-pink-600" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs text-gray-400">
                      Email
                    </p>

                    <p className="text-sm font-medium text-gray-700 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-pink-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Contact
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {user.contact || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* City */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-pink-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      City
                    </p>

                    <p className="text-sm font-medium text-gray-700">
                      {user.city || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Account Type */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                  <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center">
                    <User className="w-4 h-4 text-pink-600" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">
                      Account Type
                    </p>

                    <p className="text-sm font-medium text-gray-700 capitalize">
                      {user.role || "customer"}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Quick Actions */}
            <div className="px-5 sm:px-7 py-5 border-t border-gray-100">

              <h3 className="text-sm font-semibold text-gray-800 mb-3">
                Quick Actions
              </h3>

              <button
                onClick={() => navigate("/orders")}
                className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:border-pink-200 hover:bg-pink-50 transition"
              >
                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5 text-pink-600" />
                  </div>

                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-800">
                      My Orders
                    </p>

                    <p className="text-xs text-gray-500 mt-0.5">
                      View your orders and track deliveries
                    </p>
                  </div>

                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default MyAccount;
