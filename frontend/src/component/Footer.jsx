import { useLocation, Link } from "react-router-dom";

function Footer() {
  const location = useLocation();

  if (location.pathname.startsWith("/chat")) {
    return null;
  }

  const linkStyle = "text-sm hover:text-white transition-colors";
  const headingStyle = "text-white font-semibold mb-3";

  return (
    <footer className="bg-gray-900 min-w-full text-gray-300 mt-0.5">

      <div className="max-w-7xl mx-auto px-6 py-8 grid md:grid-cols-4 gap-8">

        {/* Brand / Shop */}
        <div>
          <h2 className="text-xl font-semibold text-white">
            FloralPallete
          </h2>

          <p className="mt-3 text-sm leading-6">
            Fresh flowers, beautiful bouquets and thoughtful floral
            arrangements for every occasion.
          </p>

          <p className="mt-3 text-sm">
            Serving our local community with fresh flowers and
            reliable delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className={headingStyle}>Quick Links</h3>

          <ul className="space-y-2">
            <li>
              <Link to="/" className={linkStyle}>
                Home
              </Link>
            </li>

            <li>
              <Link to="/products" className={linkStyle}>
                Shop Flowers
              </Link>
            </li>

            <li>
              <Link to="/orders" className={linkStyle}>
                My Orders
              </Link>
            </li>

            <li>
              <Link to="/account" className={linkStyle}>
                My Account
              </Link>
            </li>
          </ul>
        </div>

        {/* Support / Information */}
        <div>
          <h3 className={headingStyle}>Information</h3>

          <ul className="space-y-2">
            <li>
              <Link to="/contact" className={linkStyle}>
                Contact Us
              </Link>
            </li>

            <li>
              <a href="#" className={linkStyle}>
                About Us
              </a>
            </li>

            <li>
              <a href="#" className={linkStyle}>
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="#" className={linkStyle}>
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact / Shop Details */}
        <div>
          <h3 className={headingStyle}>Visit Our Store</h3>

          <p className="text-sm leading-6">
           Anil Flower House
            <br />
            Near Civil Hospital Ropar Road 
            <br />
           Kurali DIST Mohali
          </p>

          <p className="text-sm mt-3">
            📞 +91 98765 43210
          </p>

          <p className="text-sm mt-1">
            ✉️ contact@FloralPallete.com
          </p>

          <p className="text-sm mt-1">
            🕒 Mon - Sun: 9:00 AM - 9:00 PM
          </p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 text-center py-4 px-6 text-sm">
        <p>
          © {new Date().getFullYear()} FloralPallete · Developed by{" "}
          <a
            // href="https://ayushrr.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Ayush Ranjan
          </a>{" "}
          🌸
        </p>
      </div>

    </footer>
  );
}

export default Footer;