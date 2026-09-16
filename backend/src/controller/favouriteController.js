import Favourite from "../models/Favourite.js";
import Product from "../models/Product.js";

const addFavourite = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        message: "Product or Service not found",
      });
    }

    let favourite = await Favourite.findOne({ userId });

    if (!favourite) {
      favourite = new Favourite({
        userId,
        products: [productId],
      });
    } else {
      if (favourite.products.includes(productId)) {
        return res.status(400).json({
          message: "Already added to favourites",
        });
      }

      favourite.products.push(productId);
    }

    await favourite.save();

    res.status(200).json({
      message: "Added to favourites",
      favourite,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const removeFavourite = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const favourite = await Favourite.findOne({ userId });

    if (!favourite) {
      return res.status(404).json({
        message: "Favourite list not found",
      });
    }

    favourite.products = favourite.products.filter(
      (id) => id.toString() !== productId
    );

    await favourite.save();

    res.status(200).json({
      message: "Removed from favourites",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const getFavourites = async (req, res) => {
  try {
    const userId = req.userId;

    const favourite = await Favourite.findOne({ userId })
      .populate("products");

    if (!favourite) {
      return res.status(200).json([]);
    }

    res.status(200).json(favourite.products);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


const checkFavourite = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;

    const favourite = await Favourite.findOne({
      userId,
      products: productId,
    });

    res.status(200).json({
      isFavourite: !!favourite,
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


export default {
  addFavourite,
  removeFavourite,
  getFavourites,
  checkFavourite,
};