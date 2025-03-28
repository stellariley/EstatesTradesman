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
      jobSkill,
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
      !jobSkill ||
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
      jobSkill,
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

// ✅ Get All Jobs with Filters and Pagination
export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { location, skill, searchKeyword, page = 1, limit = 10 } = req.query;
  const query = {};

  if (location) {
    query.location = location;
  }
  if (skill) {
    query.jobSkill = skill;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { businessOwnerName: { $regex: searchKeyword, $options: "i" } },
      { description: { $regex: searchKeyword, $options: "i" } },
    ];
  }

  // Pagination
  const skip = (page - 1) * limit;
  const jobs = await Job.find(query).skip(skip).limit(limit);
  const totalJobsCount = await Job.countDocuments(query);

  res.status(200).json({
    success: true,
    jobs,
    totalCount: totalJobsCount,
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
