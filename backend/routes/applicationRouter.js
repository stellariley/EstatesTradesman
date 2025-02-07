import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import {
  deleteApplication,
  businessOwnerGetAllApplications,
  tradesmanGetAllApplications,
  postApplication,
} from "../controllers/applicationController.js";

const router = express.Router();

// Tradesman applies for a job
router.post(
  "/post/:id",
  isAuthenticated,
  isAuthorized("Tradesman"),
  postApplication
);

// Business Owner retrieves all applications
router.get(
  "/businessowner/getall",
  isAuthenticated,
  isAuthorized("Business Owner"),
  businessOwnerGetAllApplications
);

// Tradesman retrieves all their applications
router.get(
  "/tradesman/getall",
  isAuthenticated,
  isAuthorized("Tradesman"),
  tradesmanGetAllApplications
);

// Delete an application (either tradesman or business owner can delete)
router.delete("/delete/:id", isAuthenticated, deleteApplication);

export default router;
