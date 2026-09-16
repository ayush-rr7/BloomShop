import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFavourites,
  removeFavourite,
} from "../api/favouriteService.js";
import { optimizeImage } from "../utils/ImgOptimizer.js";

function FavouriteList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFavourites = async () => {
    try {
      const res = await getFavourites();

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavourites();
  }, []);

  const handleRemove = async (productId) => {
    try {
      await removeFavourite(productId);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          Loading favourites...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 py-6 px-4">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800">
            My Favourites
          </h1>

          <p className="text-gray-500 mt-1">
            Products and services you've saved
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20">

            <div className="text-6xl mb-4">
              ♡
            </div>

            <h2 className="text-xl font-semibold text-gray-700">
              No favourites yet
            </h2>

            <p className="text-gray-500 mt-2">
              Save products and services you love.
            </p>

            <Link
              to="/products"
              className="inline-block mt-5 bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600"
            >
              Explore Products
            </Link>

          </div>
        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            {products.map((product) => (

              <div
                key={product._id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition"
              >

                <div className="relative">

                  <Link to={`/product/${product._id}`}>

                    <img
                      src={optimizeImage(product.Images?.[0])}
                      alt={product.Name}
                      className="w-full h-64 object-cover"
                    />

                  </Link>

                  <button
                    onClick={() =>
                      handleRemove(product._id)
                    }
                    className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white shadow-md text-red-500 text-xl hover:bg-red-50"
                  >
                    ♥
                  </button>

                  <span
                    className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-medium ${
                      product.Type === "product"
                        ? "bg-white text-pink-600"
                        : "bg-white text-purple-600"
                    }`}
                  >
                    {product.Type === "product"
                      ? "Product"
                      : "Service"}
                  </span>

                </div>

                <div className="p-4">

                  <Link to={`/product/${product._id}`}>

                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-1">
                      {product.Name}
                    </h2>

                  </Link>

                  <p className="text-sm text-gray-500 mt-1">
                    {product.Category}
                  </p>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {product.Description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    {product.Price_Type === "quote" ? (
                      <span className="font-bold text-pink-600">
                        Get Quote
                      </span>
                    ) : (
                      <span className="text-xl font-bold text-pink-600">
                        ₹{product.Price}
                        {product.Price_Type === "starting" && (
                          <span className="text-xs text-gray-500 ml-1">
                            onwards
                          </span>
                        )}
                      </span>
                    )}

                    <Link
                      to={`/product/${product._id}`}
                      className="bg-pink-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-pink-600"
                    >
                      View
                    </Link>

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

export default FavouriteList;