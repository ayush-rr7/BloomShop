// const {ObjectId} =require('mongodb');
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
    // unique: true ,
  },

  contact: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  // isVerified: { type: Boolean, default: false },

  password: {
    type: String,
    required: true,
  },
    role: {
    type: String,
    enum: ["customer", "owner"],
    default: "customer"
  }

});

const User = mongoose.model("User", userSchema);
export default User;
