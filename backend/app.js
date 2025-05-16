import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";
import { newsLetterCron } from "./automation/newsLetterCron.js";
import passport from 'passport';
import session from 'express-session';
import { Strategy as googleStrategy } from 'passport-google-oauth20';
import { User } from "./models/userSchema.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";

const app = express();
config({ path: "./.env" });

app.use(
  cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(session(
  {
    secret: process.env.SESSION_SECRET || 'defaultsecret',
    resave: false,
    saveUninitialized: true,
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${import.meta.env.VITE_API_BASE_URL}/api/v1/user/auth/google/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });

        if (!user) {
          const selectedRole = req.session.selectedRole || "Tradesman"; 
          
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            role: selectedRole, 
          });

          delete req.session.selectedRole;
        } else if (!user.googleId) {
          user.googleId = profile.id;
          await user.save();
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.get(
  "/api/v1/user/auth/google", 
  (req, res, next) => {
  const { role } = req.query; 
  if (role) {
    req.session.selectedRole = role; 
  }
  next();
}, passport.authenticate("google", { scope: ["email", "profile"], prompt: "select_account" }));


app.get(
  "/api/v1/user/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:5173/login" }),
  async (req, res) => {
    const token = req.user.getJWTToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(Date.now() + process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000),
    });
    res.redirect("http://localhost:5173/");
  }
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

newsLetterCron();
removeUnverifiedAccounts();
connection();
app.use(errorMiddleware);

export default app;