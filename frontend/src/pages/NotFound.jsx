import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Home, Search, Flower2 } from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] bg-gradient-to-b from-pink-50 via-white to-rose-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full text-center">

        {/* Decorative flower */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-pink-200/40 blur-2xl rounded-full" />

            <div className="relative w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center">
              <Flower2
                size={42}
                strokeWidth={1.5}
                className="text-pink-500"
              />
            </div>
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-8xl sm:text-9xl font-bold tracking-tight text-gray-900">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-2xl sm:text-3xl font-semibold text-gray-800">
          Oops! This page has wandered off.
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-xl mx-auto text-gray-500 leading-relaxed">
          The page you're looking for doesn't exist or may have been moved.
          Let's get you back to something beautiful.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       bg-pink-500 text-white font-medium
                       hover:bg-pink-600
                       transition-all duration-200
                       shadow-sm hover:shadow-md"
          >
            <Home size={18} />
            Back to Home
          </Link>

          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       bg-white text-gray-700 font-medium
                       border border-gray-200
                       hover:border-pink-300 hover:text-pink-600
                       transition-all duration-200"
          >
            <Search size={18} />
            Browse Flowers
          </Link>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2
                       px-6 py-3 rounded-xl
                       text-gray-500 font-medium
                       hover:text-gray-800
                       transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>

        </div>

        {/* Small brand message */}
        <div className="mt-12">
          <p className="text-sm text-gray-400">
            FloralPallete · Bringing a little more beauty to every occasion 🌸
          </p>
        </div>

      </div>
    </div>
  );
};

export default NotFound;