import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import {
  getCart,
  updateCartQuantity,
  removeFromCart,
} from "../api/cartService.js";
import { optimizeImage } from "../utils/ImgOptimizer.js";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await getCart();

      setItems(res.data.items || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQuantity = async (productId, quantity) => {
    try {
      if (quantity <= 0) {
        await removeFromCart(productId);

        setItems((prev) =>
          prev.filter(
            (item) =>
              item.productId._id !== productId
          )
        );

        return;
      }

      await updateCartQuantity(productId, quantity);

      setItems((prev) =>
        prev.map((item) =>
          item.productId._id === productId
            ? {
                ...item,
                quantity,
              }
            : item
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (productId) => {
    try {
      await removeFromCart(productId);

      setItems((prev) =>
        prev.filter(
          (item) =>
            item.productId._id !== productId
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const total = items.reduce(
    (sum, item) =>
      sum +
      (item.productId.Price || 0) * item.quantity,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading cart...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-3xl font-semibold text-gray-800 mb-6">
          My Cart
        </h1>

        {items.length === 0 ? (

          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">

            <div className="text-6xl mb-4">
              🛒
            </div>

            <h2 className="text-xl font-semibold">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2">
              Add some beautiful flowers to your cart.
            </p>

            <Link
              to="/products"
              className="inline-block mt-5 bg-pink-500 text-white px-6 py-3 rounded-lg"
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div className="grid lg:grid-cols-[1fr_320px] gap-6">

            {/* Cart Items */}

            <div className="space-y-4">

              {items.map((item) => {

                const product = item.productId;

                return (
                  <div
                    key={product._id}
                    className="bg-white rounded-2xl p-4 shadow-sm flex gap-4"
                  >

                    <Link
                      to={`/product/${product._id}`}
                    >
                      <img
                        src={optimizeImage(
                          product.Images?.[0]
                        )}
                        alt={product.Name}
                        className="w-28 h-28 object-cover rounded-xl"
                      />
                    </Link>

                    <div className="flex-1">

                      <div className="flex justify-between">

                        <div>

                          <h2 className="font-semibold text-lg">
                            {product.Name}
                          </h2>

                          <p className="text-sm text-gray-500">
                            {product.Category}
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            removeItem(product._id)
                          }
                          className="text-red-500"
                        >
                          Remove
                        </button>

                      </div>

                      <p className="text-pink-600 font-bold mt-2">
                        ₹{product.Price}
                      </p>

                      <div className="flex items-center gap-3 mt-3">

                        <button
                          onClick={() =>
                            changeQuantity(
                              product._id,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 border rounded"
                        >
                          −
                        </button>

                        <span>
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            changeQuantity(
                              product._id,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 border rounded"
                        >
                          +
                        </button>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Summary */}

            <div className="bg-white rounded-2xl p-5 shadow-sm h-fit">

              <h2 className="text-xl font-semibold mb-5">
                Order Summary
              </h2>

              <div className="flex justify-between text-gray-600">
                <span>Items</span>
                <span>{items.length}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Subtotal</span>

                <span className="font-bold">
                  ₹{total}
                </span>
              </div>

              <hr className="my-5" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-pink-600">
                  ₹{total}
                </span>
              </div>

            <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-pink-500 text-white py-3 rounded-lg mt-5 hover:bg-pink-600"
               >
                Proceed to Checkout
              </button>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}

export default Cart;