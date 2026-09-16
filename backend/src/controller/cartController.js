import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);
    const { productId, quantity = 1, customizationNote = "" } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    // Services should not be added to cart
    if (product.Type !== "product") {
      return res.status(400).json({
        message: "Services cannot be added to cart",
      });
    }

    if (!product.Available) {
      return res.status(400).json({
        message: "Product is currently unavailable",
      });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: Number(quantity),
            customizationNote,
          },
        ],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );

      if (existingItem) {
        existingItem.quantity += Number(quantity);

        if (customizationNote) {
          existingItem.customizationNote = customizationNote;
        }
      } else {
        cart.items.push({
          productId,
          quantity: Number(quantity),
          customizationNote,
        });
      }
    }

    await cart.save();

    res.status(200).json({
      message: "Added to cart",
      cart,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cart = await Cart.findOne({ userId })
      .populate("items.productId");

    if (!cart) {
      return res.status(200).json({
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const updateQuantity = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found in cart",
      });
    }

    if (Number(quantity) <= 0) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== productId
      );
    } else {
      item.quantity = Number(quantity);
    }

    await cart.save();

    res.status(200).json({
      message: "Cart updated",
      cart,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Removed from cart",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export default {
  addToCart,
  getCart,
  updateQuantity,
  removeFromCart,
};