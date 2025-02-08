import cron from "node-cron"; 
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running Cron Automation");
    const jobs = await Job.find({ newsLettersSent: false });
    for (const job of jobs) {
      try {
        const filteredUsers = await User.find({
          $or: [
            { "skills.firstSkill": job.jobSkill },
            { "skills.secondSkill": job.jobSkill },
            { "skills.thirdSkill": job.jobSkill },
          ],
        });

        for (const user of filteredUsers) {
          const subject = `New Job Opportunity: ${job.title} in ${job.jobSkill}`;
          const message = `Hi ${user.name},\n\nGood news! A new job that matches your skills has just been posted. Here are the details:\n\n- **Position:** ${job.title}\n- **Business Owner:** ${job.businessOwnerName}\n- **Location:** ${job.location}\n- **Budget:** ${job.budget}\n\nThis is a great opportunity, so don’t wait! Job openings like these are quickly filled.\n\nBest of luck,\nEstatesTradesman team\n\nWe're excited to help you find your next job!`;

          sendEmail({
            email: user.email,
            subject,
            message,
          });
        }

        job.newsLettersSent = true;
        await job.save();
      } catch (error) {
        console.log("ERROR IN NODE CRON CATCH BLOCK");
        return next(console.error(error || "Some error in Cron."));
      }
    }
  });
};
