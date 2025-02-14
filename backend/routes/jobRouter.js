import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { postJob, getAllJobs, getASingleJob, getMyJobs, deleteJob } from "../controllers/jobController.js";

const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Business Owner"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Business Owner"), getMyJobs);
router.delete("/delete/:id", isAuthenticated, isAuthorized("Business Owner"), deleteJob);
router.get("/get/:id", getASingleJob)

export default router;