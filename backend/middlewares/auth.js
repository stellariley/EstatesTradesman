import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";

// Middleware to check if the user is authenticated
export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    // Handling Token Expiry
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Json Web Token is expired, Try again.", 401));
    }
    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Json Web Token is invalid, Try again.", 401));
    }
    return next(error);
  }
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} not allowed to access this resource.`,
          403
        )
      );
    }
    next();
  };
};

