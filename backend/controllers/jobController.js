import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

// Post a New Job
export const postJob = catchAsyncErrors(async (req, res, next) => {
  try {
    const {
      title,
      jobType,
      location,
      businessOwnerName,
      description,
      responsibilities,
      qualifications,
      budget,
      hiringMultipleTradesmen,
      jobNiche,
      contactInfo,
    } = req.body;

    // Check if required fields are missing
    if (
      !title ||
      !jobType ||
      !location ||
      !businessOwnerName ||
      !description ||
      !responsibilities ||
      !qualifications ||
      !budget ||
      !jobNiche ||
      !contactInfo?.email ||
      !contactInfo?.phone
    ) {
      return next(new ErrorHandler("Please provide full job details.", 400));
    }

    const postedBy = req.user._id;

    // ✅ Create job object
    const job = await Job.create({
      title,
      jobType,
      location,
      businessOwnerName,
      description,
      responsibilities,
      qualifications,
      budget,
      hiringMultipleTradesmen,
      jobNiche,
      contactInfo,
      postedBy,
    });

    res.status(201).json({
      success: true,
      message: "Job posted successfully.",
      job,
    });
  } catch (error) {
    next(error);
  }
});

// ✅ Get All Jobs with Filters
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};

  if (city) {
    query.location = city;
  }
  if (niche) {
    query.jobNiche = niche;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { businessOwnerName: { $regex: searchKeyword, $options: "i" } },
      { description: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  const jobs = await Job.find(query);

  res.status(200).json({
    success: true,
    jobs,
    count: jobs.length,
  });
});

// ✅ Get Jobs Posted by Logged-in User
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myJobs,
  });
});

// ✅ Get a Single Job by ID
export const getASingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  res.status(200).json({
    success: true,
    job,
  });
});

// ✅ Delete a Job
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);

  if (!job) {
    return next(new ErrorHandler("Oops! Job not found.", 404));
  }

  await job.deleteOne();

  res.status(200).json({
    success: true,
    message: "Job deleted.",
  });
});
