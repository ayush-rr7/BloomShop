  import mongoose from 'mongoose'
  
  // const profileSchema = mongoose.Schema({
  
const productSchema = mongoose.Schema({

  Name: {
    type: String,
    required: true,
  },

  Type: {
    type: String,
    required: true,
    enum: ["product", "service"],
  },

  Category: {
    type: String,
    required: true,
  },

  Description: {
    type: String,
    required: true,
  },

  Price: {
    type: Number,
    // Not required because a service can use "quote"
  },

  Price_Type: {
    type: String,
    required: true,
    enum: ["fixed", "starting", "quote"],
  },

  Customizable: {
    type: Boolean,
    required: true,
  },

  Available: {
    type: Boolean,
    default: true,
  },

  Images: [{
    type: String,
  }],

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

});

const Product = mongoose.model("Product", productSchema);
export default Product;

    
    
  
    
    // const  Profile= mongoose.model('Profile', profileSchema);
    // export default Profile;