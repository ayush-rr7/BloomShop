import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart } from "../api/cartService";
import {
  createRazorpayOrder,
  verifyRazorpayPayment,
} from "../api/paymentService";
import { createOrder } from "../api/orderService";

function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();

  // ---------------------------------------------------------
  // BUY NOW ITEM
  // ---------------------------------------------------------
  const buyNowItem = location.state?.buyNowItem;

  const [cart, setCart] = useState({ items: [] });
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    Name: "",
    Phone: "",
    Address: "",
    City: "",
    State: "",
    Pincode: "",
    PaymentMethod: "COD",
  });

  // ---------------------------------------------------------
  // FETCH CART
  // ---------------------------------------------------------

  const fetchCart = async () => {
    try {
      const res = await getCart();

      setCart(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // CHECKOUT SOURCE
  // ---------------------------------------------------------

  useEffect(() => {
    // BUY NOW
    // Only selected product should appear.
    if (buyNowItem) {
      setCart({
        items: [buyNowItem],
      });

      setLoading(false);

      return;
    }

    // CART CHECKOUT
    // No buyNowItem means user came from Cart.
    fetchCart();

  }, [buyNowItem]);

  // ---------------------------------------------------------
  // FORM
  // ---------------------------------------------------------

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ---------------------------------------------------------
  // PRICE
  // ---------------------------------------------------------

  const getItemPrice = (item) => {
    return item.productId?.Price || 0;
  };

  const totalAmount = cart.items.reduce(
    (total, item) =>
      total +
      getItemPrice(item) * item.quantity,
    0
  );

  // ---------------------------------------------------------
  // PLACE ORDER
  // ---------------------------------------------------------

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cart.items.length === 0) {
      alert("Your cart is empty");
      return;
    }

    try {
      if (form.PaymentMethod === "COD") {

        const orderData = {
          Name: form.Name,
          Phone: form.Phone,
          Address: form.Address,
          City: form.City,
          State: form.State,
          Pincode: form.Pincode,

          paymentMethod: "COD",

          items: cart.items,

          totalAmount,
        };

        const response =
          await createOrder(orderData);

        console.log(
          "COD Order:",
          response
        );

        alert(
          "Order placed successfully!"
        );

        navigate("/orders");

        return;
      }

      if (
        form.PaymentMethod ===
        "RAZORPAY"
      ) {
        await handleRazorpayPayment();

        return;
      }

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Failed to place order"
      );
    }
  };

  // ---------------------------------------------------------
  // RAZORPAY
  // ---------------------------------------------------------

  const handleRazorpayPayment = async () => {

    try {

      // 1. Create Razorpay order

      const res =
        await createRazorpayOrder({
          amount: totalAmount,
        });

      const {
        id: razorpayOrderId,
        amount,
        currency,
      } = res.data.order;

      // 2. Razorpay options

      const options = {

        key:
          import.meta.env
            .VITE_RAZORPAY_KEY_ID,

        amount: amount,

        currency: currency,

        name: "Your Flower Shop",

        description:
          "Event Arrangement Order",

        order_id:
          razorpayOrderId,

        handler: async function (
          response
        ) {

          try {

            // 3. Verify payment

            await verifyRazorpayPayment({

              razorpay_order_id:
                response.razorpay_order_id,

              razorpay_payment_id:
                response.razorpay_payment_id,

              razorpay_signature:
                response.razorpay_signature,

              ...form,

              items: cart.items,

              totalAmount,
            });

            alert(
              "Payment successful! Order placed successfully."
            );

            navigate("/orders");

          } catch (err) {

            console.log(err);

            alert(
              "Payment verification failed"
            );
          }
        },

        prefill: {
          name: form.Name,
          contact: form.Phone,
        },

        theme: {
          color: "#ec4899",
        },
      };

      const razorpay =
        new window.Razorpay(
          options
        );

      razorpay.open();

    } catch (err) {

      console.log(err);

      alert(
        "Unable to start payment"
      );
    }
  };

  // ---------------------------------------------------------
  // LOADING
  // ---------------------------------------------------------

  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center">

        <p>
          Loading checkout...
        </p>

      </div>
    );
  }

  // ---------------------------------------------------------
  // EMPTY
  // ---------------------------------------------------------

  if (cart.items.length === 0) {

    return (
      <div className="min-h-screen bg-pink-50 py-10 px-4">

        <div className="max-w-6xl mx-auto">

          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <p className="text-gray-500 mb-5">
              Your cart is empty.
            </p>

            <button
              onClick={() =>
                navigate("/products")
              }
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-xl"
            >
              Continue Shopping
            </button>

          </div>

        </div>

      </div>
    );
  }

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* =================================================
              CUSTOMER DETAILS
          ================================================= */}

          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-7">

            <h2 className="text-xl font-semibold mb-6">
              Delivery Details
            </h2>

            <form
              onSubmit={handlePlaceOrder}
            >

              {/* NAME + PHONE */}

              <div className="grid md:grid-cols-2 gap-5">

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="Name"
                    value={form.Name}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Enter your name"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="Phone"
                    value={form.Phone}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
                    placeholder="Enter phone number"
                  />

                </div>

              </div>

              {/* ADDRESS */}

              <div className="mt-5">

                <label className="block text-sm font-medium mb-2">
                  Address
                </label>

                <textarea
                  name="Address"
                  value={form.Address}
                  onChange={handleChange}
                  required
                  rows="3"
                  className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-pink-300"
                  placeholder="House no., street, area"
                />

              </div>

              {/* CITY STATE PINCODE */}

              <div className="grid md:grid-cols-3 gap-5 mt-5">

                <div>

                  <label className="block text-sm font-medium mb-2">
                    City
                  </label>

                  <input
                    type="text"
                    name="City"
                    value={form.City}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="City"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    State
                  </label>

                  <input
                    type="text"
                    name="State"
                    value={form.State}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="State"
                  />

                </div>

                <div>

                  <label className="block text-sm font-medium mb-2">
                    Pincode
                  </label>

                  <input
                    type="text"
                    name="Pincode"
                    value={form.Pincode}
                    onChange={handleChange}
                    required
                    className="w-full border rounded-xl px-4 py-3"
                    placeholder="Pincode"
                  />

                </div>

              </div>

              {/* =================================================
                  PAYMENT
              ================================================= */}

              <div className="mt-6">

                <div className="space-y-3">

                  <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                    <input
                      type="radio"
                      name="PaymentMethod"
                      value="COD"
                      checked={
                        form.PaymentMethod ===
                        "COD"
                      }
                      onChange={handleChange}
                    />

                    <div>

                      <p className="font-medium">
                        Cash on Delivery
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay when your order is delivered
                      </p>

                    </div>

                  </label>

                  <label className="flex items-center gap-3 border rounded-xl p-4 cursor-pointer">

                    <input
                      type="radio"
                      name="PaymentMethod"
                      value="RAZORPAY"
                      checked={
                        form.PaymentMethod ===
                        "RAZORPAY"
                      }
                      onChange={handleChange}
                    />

                    <div>

                      <p className="font-medium">
                        Online Payment
                      </p>

                      <p className="text-sm text-gray-500">
                        Pay securely using UPI, Card, Net Banking
                      </p>

                    </div>

                  </label>

                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                type="submit"
                className="w-full mt-7 bg-pink-500 hover:bg-pink-600 text-white py-3 rounded-xl font-semibold"
              >
                Place Order • ₹
                {totalAmount.toLocaleString(
                  "en-IN"
                )}
              </button>

            </form>

          </div>

          {/* =================================================
              ORDER SUMMARY
          ================================================= */}

          <div className="bg-white rounded-2xl shadow p-7 h-fit">

            <h2 className="text-xl font-semibold mb-6">

              {buyNowItem
                ? "Buy Now"
                : "Order Summary"}

            </h2>

            <div className="space-y-5">

              {cart.items.map(
                (item, index) => {

                  const product =
                    item.productId;

                  const price =
                    product?.Price || 0;

                  return (

                    <div
                      key={
                        product?._id ||
                        index
                      }
                      className="flex gap-4 border-b pb-4"
                    >

                      <img
                        src={
                          product?.Images?.[0]
                        }
                        alt={
                          product?.Name
                        }
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div className="flex-1">

                        <h3 className="font-medium">
                          {product?.Name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Qty:{" "}
                          {item.quantity}
                        </p>

                        <p className="font-semibold mt-1">
                          ₹
                          {(
                            price *
                            item.quantity
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </p>

                      </div>

                    </div>

                  );
                }
              )}

            </div>

            {/* TOTAL */}

            <div className="border-t mt-6 pt-5 space-y-3">

              <div className="flex justify-between">

                <span>
                  Subtotal
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

              <div className="flex justify-between">

                <span>
                  Delivery
                </span>

                <span>
                  Free
                </span>

              </div>

              <div className="border-t pt-3 flex justify-between font-bold text-lg">

                <span>
                  Total
                </span>

                <span>
                  ₹
                  {totalAmount.toLocaleString(
                    "en-IN"
                  )}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
