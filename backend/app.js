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
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  }
));

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new googleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:4000/auth/google/callback'
  },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

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
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    prompt: "select_account"
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate(
    "google",
    { failureRedirect: "http://localhost:5173/login" },
  ),
  (req, res, next) => {
    res.redirect("http://localhost:5173/");
  }
);

app.get('/auth/info', (req, res, next) => {
  res
    .status(200)
    .json({ message: "success", status: true, user: req?.user?._json });
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

newsLetterCron()
connection();
app.use(errorMiddleware);

export default app;