import User from "../models/User.js";

const ownerMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    if (user.role !== "owner") {
      return res.status(403).json({
        message: "Access denied. Owner only.",
      });
    }

    next();
  } catch (error) {
    console.log("Owner Middleware Error:", error);

    res.status(500).json({
      message: "Authorization failed",
    });
  }
};

export default ownerMiddleware;
