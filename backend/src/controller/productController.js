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



// import Profile from "../models/Profile.js";
// import Product from "../models/Product.js";
// import Connection from "../models/Connection.js";
// // import PartnerPreference from "../models/partnerPreference.js";

// const addProduct = async (req, res) => {
 
// try {
//   const {
//     Name,
//     Type,
//     Category,
//     Description,
//     Price,
//     Price_Type,
//     Customizable,
//     Available,
//   } = req.body;

//   const userId = req.userId;

//   // MULTIPLE IMAGE HANDLING
//   if (!req.files || req.files.length === 0) {
//     console.log("err");
//     return res.status(422).json({
//       message: "Images required",
//     });
//   }

//   // Cloudinary URLs
//   const imageURL = req.files.map((file) => file.path);

//   const newProduct = new Product({
//     Name,
//     Type,
//     Category,
//     Description,
//     Price,
//     Price_Type,
//     Customizable,
//     Available,
//     Images: imageURL,
//     userId: userId,
//   });

//   const savedProduct = await newProduct.save();

//   console.log("saved");

//   res.status(201).json(savedProduct);

// } catch (err) {
//   console.log(err);

//   res.status(500).json({
//     message: err.message,
//   });


// }
// }


// // const getPreferences = async (req, res) => {
// //   try {
// //     const { profileId } = req.params;
// //     // console.log(profileId);
// //     const preferences = await PartnerPreference.findOne({ profileId });

// //     return res.json({ preferences });
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// const savePreferences = async (req, res) => {
//   try {
//     const { profileId } = req.params;

//     const {
//       ageMin,
//       ageMax,
//       incomeMin,
//       incomeMax,
//       heightMin,
//       heightMax,
//       religion,
//       caste,
//       education,
//       location,
//       maritalStatus,
//     } = req.body;

    
//     const profile = await Profile.findById(profileId);

//     if (!profile) {
//       return res.status(404).json({
//         message: "Profile not found",
//       });
//     }

   
//     const savedPreference = await PartnerPreference.findOneAndUpdate(
//       { profileId: profile._id },
//       {
//         ageMin,
//         ageMax,
//         incomeMin,
//         incomeMax,
//         heightMin,
//         heightMax,
//         religion,
//         caste,
//         education,
//         location,
//         maritalStatus,
//       },
//       {
//         new: true,
//         upsert: true, 
//       }
//     );

//     // console.log(savedPreference);

//     res.status(200).json({
//       message: "Partner Preferences saved successfully",
//       preferences: savedPreference,
//     });

//   } catch (error) {
//     console.log(error);

//     res.status(500).json({
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// // const getProduct = async (req, res) => {
// //   try {
// //     const { profileId }=req.params;
// //     // console.log(profileId);
// //     const page = parseInt(req.query.page) || 1;
// //     const limit = parseInt(req.query.limit) || 12;

// //     const currentProfile = await Profile.findById(profileId)
// //       .select("Gender");

// //     const genderMap = {
// //       male: "female",
// //       female: "male",
// //     };

// //     const query = {
// //       _id: { $ne: profileId },
// //       Gender: genderMap[currentProfile.Gender],
// //     };

// //     // const user = await Profile.find(query);
// //     const user = await Profile.find(query)
// //       .skip((page - 1) * limit)
// //       .limit(limit);
// //     res.json(user);
// //     console.log("fetched sucessfully");
// //   } catch (err) {
// //     console.log(err.message);
// //   }
// // };
// const getProduct = async (req, res) => {
//   try {
//     const { profileId } = req.params;
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 12;

//     const start = process.hrtime.bigint();

//     const currentProfile = await Profile.findById(profileId)
//       .select("Gender");

//     const genderMap = {
//       male: "female",
//       female: "male",
//     };

//     const query = {
//       _id: { $ne: profileId },
//       Gender: genderMap[currentProfile.Gender],
//     };

//     const user = await Profile.find(query)
//       .skip((page - 1) * limit)
//       .limit(limit);

//     const end = process.hrtime.bigint();

//     const queryTimeMs = Number(end - start) / 1_000_000;

//     console.log(
//       `getProduct query completed in ${queryTimeMs.toFixed(2)} ms`
//     );

//     res.json(user);
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).json({ message: "Server Error" });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // console.log(id);
   
//     const user = await Profile.findById(id);
//     // const user= await Profile.find();
//     res.json(user);
   
//     // console.log(user);
//     console.log("fetched sucessfully");
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// const deleteProduct = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.json({ message: "User Deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// const updateProduct = async (req, res) => {
//   try {
//     const updateData = { ...req.body };

//     //ONLY update images if new files are uploaded
//     if (req.files && req.files.length > 0) {
//       updateData.Images = req.files.map((file) => file.path);
//     }

//     // If no new images → Images field NOT touched

//     const updatedProfile = await Profile.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );

//     res.json(updatedProfile);
//   } catch (err) {
//     res.status(500).json({ message: "Error updating profile" });
//   }
  
// };


// export default {
//   addProduct,
//   getProduct,
//   getProductById,
//   deleteProduct,
//   updateProduct,
//   savePreferences,
//   // getPreferences
 
// };


