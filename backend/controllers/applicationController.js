import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { Application } from "../models/applicationSchema.js";
import { Job } from "../models/jobSchema.js";
import { v2 as cloudinary } from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone, address, coverLetter } = req.body;

  if (!name || !email || !phone || !address) {
    return next(new ErrorHandler("All fields are required.", 400));
  }

  const tradesmanInfo = {
    id: req.user._id,
    name,
    email,
    phone,
    address,
    coverLetter,
    role: "Tradesman",
  };

  const jobDetails = await Job.findById(id);
  if (!jobDetails) {
    return next(new ErrorHandler("Job not found.", 404));
  }

  const isAlreadyApplied = await Application.findOne({
    "jobInfo.jobId": id,
    "tradesmanInfo.id": req.user._id,
  });

  if (isAlreadyApplied) {
    return next(
      new ErrorHandler("You have already applied for this job.", 400)
    );
  }

  if (req.files && req.files.resume) {
    const { resume } = req.files;
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(
        resume.tempFilePath,
        {
          folder: "Tradesmen_Resumes",
        }
      );

      if (!cloudinaryResponse || cloudinaryResponse.error) {
        return next(
          new ErrorHandler("Failed to upload resume to cloudinary.", 500)
        );
      }

      tradesmanInfo.resume = {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      };
    } catch (error) {
      return next(new ErrorHandler("Failed to upload resume", 500));
    }
  } else {
    if (req.user && !req.user.resume?.url) {
      return next(new ErrorHandler("Please upload your resume.", 400));
    }
    tradesmanInfo.resume = {
      public_id: req.user?.resume?.public_id,
      url: req.user?.resume?.url,
    };
  }

  const businessOwnerInfo = {
    id: jobDetails.postedBy,
    role: "Business Owner",
  };

  const jobInfo = {
    jobId: id,
    jobTitle: jobDetails.title,
  };

  const application = await Application.create({
    tradesmanInfo,
    businessOwnerInfo,
    jobInfo,
  });

  res.status(201).json({
    success: true,
    message: "Application submitted.",
    application,
  });
});

export const businessOwnerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "businessOwnerInfo.id": _id,
      "deletedBy.businessOwner": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const tradesmanGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
    const { _id } = req.user;
    const applications = await Application.find({
      "tradesmanInfo.id": _id,
      "deletedBy.tradesman": false,
    });
    res.status(200).json({
      success: true,
      applications,
    });
  }
);

export const deleteApplication = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const application = await Application.findById(id);

  if (!application) {
    return next(new ErrorHandler("Application not found.", 404));
  }

  const { role } = req.user;

  switch (role) {
    case "Tradesman":
      application.deletedBy.tradesman = true;
      await application.save();
      break;
    case "Business Owner":
      application.deletedBy.businessOwner = true;
      await application.save();
      break;
    default:
      console.log("Invalid role in application delete function.");
      break;
  }

  if (application.deletedBy.businessOwner && application.deletedBy.tradesman) {
    await application.deleteOne();
  }

  res.status(200).json({
    success: true,
    message: "Application Deleted.",
  });
});
