import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import {
  Menu,
  X,
  ShoppingCart,
  Flower2,
} from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  // Common link style
  const linkStyle = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? "text-pink-600 bg-pink-50"
        : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Navigation links based on user role
  const getNavLinks = () => {
    if (!user) {
      return [
        { label: "Home", path: "/" },
        { label: "Shop", path: "/products" },
        { label: "Signup", path: "/signup" },
        { label: "Login", path: "/login" },
      ];
    }

    if (user.role === "owner") {
      return [
        { label: "Dashboard", path: "/admin" },
        {label: "Register Product", path: "/admin/products/create"},
        { label: "Products", path: "/admin/products" },
        { label: "Orders", path: "/admin/orders" },
        { label: "Account", path: "/admin/account" },
      ];
    }

    return [
      { label: "Home", path: "/" },
      { label: "Shop", path: "/products" },
      { label: "Favourite", path: "/Favourite" },
      { label: "My Orders", path: "/orders" },
      { label: "Account", path: "/account" },
    ];
  };

  const navLinks = getNavLinks();

  // Reusable navigation link
  const NavigationLink = ({ link, mobile = false }) => (
    <NavLink
      to={link.path}
      className={
        link.label === "Cart"
          ? "relative p-2 text-gray-700 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition"
          : linkStyle
      }
      onClick={mobile ? closeMenu : undefined}
    >
      {link.label === "Cart" ? <ShoppingCart size={21} /> : link.label}
    </NavLink>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

        {/* HEADER */}
        <div className="flex items-center justify-between">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Flower2 className="text-pink-600" size={28} />

            <div className="text-xl sm:text-2xl font-bold text-pink-600">
              Bloom
              <span className="text-gray-800">Shop</span>
            </div>
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-2">

            {navLinks.map((link) => (
              <NavigationLink
                key={link.path}
                link={link}
              />
            ))}

            {user && (
              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium
                bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Logout
              </button>
            )}

          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            type="button"
            aria-label={
              menuOpen
                ? "Close navigation menu"
                : "Open navigation menu"
            }
            aria-expanded={menuOpen}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

        </div>

        {/* MOBILE NAVIGATION */}
        {menuOpen && (
          <div className="md:hidden border-t mt-3 pt-3 space-y-2">

            {navLinks.map((link) => (
              <NavigationLink
                key={link.path}
                link={link}
                mobile
              />
            ))}

            {user && (
              <button
                onClick={handleLogout}
                className="w-full mt-3 px-4 py-2 rounded-lg text-sm
                font-medium bg-pink-500 text-white
                hover:bg-pink-600 transition"
              >
                Logout
              </button>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}
