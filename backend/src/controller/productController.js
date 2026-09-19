import Product from "../models/Product.js";

// CREATE PRODUCT / SERVICE
const addProduct = async (req, res) => {
  try {
    const {
      Name,
      Type,
      Category,
      Description,
      Price,
      Price_Type,
      Customizable,
      Available,
    } = req.body;

    const userId = req.userId;

    // MULTIPLE IMAGE HANDLING
    if (!req.files || req.files.length === 0) {
      return res.status(422).json({
        message: "Images required",
      });
    }

    // Cloudinary URLs
    const imageURL = req.files.map((file) => file.path);

    const newProduct = new Product({
      Name,
      Type,
      Category,
      Description,

      // Convert FormData strings to proper values
      Price: Price ? Number(Price) : undefined,
      Price_Type,

      Customizable:
        Customizable === true || Customizable === "true",

      Available:
        Available === undefined
          ? true
          : Available === true || Available === "true",

      Images: imageURL,
      userId,
    });

    const savedProduct = await newProduct.save();

    console.log("Product/Service saved successfully");

    res.status(201).json(savedProduct);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
};


// GET ALL PRODUCTS / SERVICES
const getProduct = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;

    const skip = (page - 1) * limit;

    const products = await Product.find()
      .skip(skip)
      .limit(limit);

    console.log("Products fetched successfully");

    res.status(200).json(products);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// GET PRODUCT / SERVICE BY ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product or Service not found",
      });
    }

    console.log("Product/Service fetched successfully");

    res.status(200).json(product);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Server Error",
    });
  }
};


// DELETE PRODUCT / SERVICE
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({
        message: "Product or Service not found",
      });
    }

    res.status(200).json({
      message: "Product/Service deleted successfully",
    });
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: err.message,
    });
  }
};


// UPDATE PRODUCT / SERVICE
const updateProduct = async (req, res) => {
  try {
    const updateData = { ...req.body };

    // Convert FormData values
    if (updateData.Price !== undefined && updateData.Price !== "") {
      updateData.Price = Number(updateData.Price);
    }

    if (updateData.Customizable !== undefined) {
      updateData.Customizable =
        updateData.Customizable === true ||
        updateData.Customizable === "true";
    }

    if (updateData.Available !== undefined) {
      updateData.Available =
        updateData.Available === true ||
        updateData.Available === "true";
    }

    // Only update images if new files are uploaded
    if (req.files && req.files.length > 0) {
      updateData.Images = req.files.map((file) => file.path);
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product or Service not found",
      });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log(err.message);

    res.status(500).json({
      message: "Error updating product/service",
      error: err.message,
    });
  }
};

// Update Product Availability
const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { Available } = req.body;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    product.Available = Available;

    await product.save();

    res.status(200).json({
      message: "Product availability updated successfully",
      product,
    });
  } catch (err) {
    console.log("Update availability error:", err);

    res.status(500).json({
      message: "Failed to update product availability",
    });
  }
};



export default {
  addProduct,
  getProduct,
  getProductById,
  deleteProduct,
  updateProduct,
  updateAvailability,
};


