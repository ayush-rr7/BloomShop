import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Menu, X, ShoppingCart, Flower2 } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition
    ${
      isActive
        ? "text-pink-600 bg-pink-50"
        : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
    }`;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">

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

            {!user ? (
              <>
                <NavLink to="/" className={linkStyle}>
                  Home
                </NavLink>

                <NavLink to="/products" className={linkStyle}>
                  Shop
                </NavLink>

                <NavLink to="/signup" className={linkStyle}>
                  Signup
                </NavLink>

                <NavLink to="/login" className={linkStyle}>
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {/* CUSTOMER */}
                {user.role !== "owner" && (
                  <>
                    <NavLink to="/" className={linkStyle}>
                      Home
                    </NavLink>

                    <NavLink to="/products" className={linkStyle}>
                      Shop
                    </NavLink>

                    <NavLink to="/Favourite" className={linkStyle}>
                      Favourite
                    </NavLink>

                    <NavLink to="/orders" className={linkStyle}>
                      My Orders
                    </NavLink>

                    <NavLink
                      to="/cart"
                      className="relative p-2 text-gray-700 hover:text-pink-600
                      hover:bg-pink-50 rounded-lg transition"
                    >
                      <ShoppingCart size={21} />
                    </NavLink>

                    <NavLink to="/account" className={linkStyle}>
                      Account
                    </NavLink>
                  </>
                )}


                {/* SHOP OWNER */}
                {user.role === "owner" && (
                  <>
                    <NavLink to="/admin" className={linkStyle}>
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin/products"
                      className={linkStyle}
                    >
                      Products
                    </NavLink>

                    <NavLink
                      to="/admin/orders"
                      className={linkStyle}
                    >
                      Orders
                    </NavLink>

                    <NavLink to="/account" className={linkStyle}>
                      Account
                    </NavLink>
                  </>
                )}


                <button
                  onClick={handleLogout}
                  className="ml-2 px-4 py-2 rounded-lg text-sm font-medium
                  bg-pink-500 text-white hover:bg-pink-600 transition"
                >
                  Logout
                </button>
              </>
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
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>


        {/* MOBILE MENU */}
        {menuOpen && (
          <div className="md:hidden border-t mt-3 pt-3 space-y-2">

            {!user ? (
              <>
                <NavLink
                  to="/"
                  className={linkStyle}
                  onClick={closeMenu}
                >
                  Home
                </NavLink>

                <NavLink
                  to="/products"
                  className={linkStyle}
                  onClick={closeMenu}
                >
                  Shop
                </NavLink>

                <NavLink
                  to="/signup"
                  className={linkStyle}
                  onClick={closeMenu}
                >
                  Signup
                </NavLink>

                <NavLink
                  to="/login"
                  className={linkStyle}
                  onClick={closeMenu}
                >
                  Login
                </NavLink>
              </>
            ) : (
              <>
                {/* CUSTOMER MOBILE MENU */}
                {user.role !== "owner" && (
                  <>
                    <NavLink
                      to="/"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Home
                    </NavLink>

                    <NavLink
                      to="/products"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Shop
                    </NavLink>

                    <NavLink
                      to="/Favourite"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Favourite
                    </NavLink>

                    <NavLink
                      to="/orders"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      My Orders
                    </NavLink>

                    <NavLink
                      to="/cart"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      🛒 Cart
                    </NavLink>

                    <NavLink
                      to="/account"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Account
                    </NavLink>
                  </>
                )}


                {/* OWNER MOBILE MENU */}
                {user.role === "owner" && (
                  <>
                    <NavLink
                      to="/admin"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Dashboard
                    </NavLink>

                    <NavLink
                      to="/admin/products"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Products
                    </NavLink>

                    <NavLink
                      to="/admin/orders"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Orders
                    </NavLink>

                    <NavLink
                      to="/account"
                      className={linkStyle}
                      onClick={closeMenu}
                    >
                      Account
                    </NavLink>
                  </>
                )}


                <button
                  onClick={handleLogout}
                  className="w-full mt-3 px-4 py-2 rounded-lg text-sm
                  font-medium bg-pink-500 text-white
                  hover:bg-pink-600 transition"
                >
                  Logout
                </button>
              </>
            )}

          </div>
        )}

      </div>
    </nav>
  );
}