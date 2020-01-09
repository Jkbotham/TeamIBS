// In a route /app/user/user.controller.js

import passport from "passport";
import dotenv from "dotenv";
import strategy from "passport-facebook";

import userModel from "../user/user.model";

const FacebookStrategy = strategy.Strategy;

dotenv.config();
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ["email", "name"]
    },
    function(accessToken, refreshToken, profile, done) {
      const { email, first_name, last_name } = profile._json;
      const userData = {
        email,
        firstName: first_name,
        lastName: last_name
      };
      new userModel(userData).save();
      done(null, profile);
    }
  )
);


//-------------------------------------------


// In app/user/user.router.js

import express from "express";
import passport from "passport";
import userController from "./user.controller";


const userRouter = express.Router();

userRouter.get("/auth/facebook", passport.authenticate("facebook"));

userRouter.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/fail"
  })
);

userRouter.get("/fail", (req, res) => {
  res.send("Failed attempt");
});

userRouter.get("/", (req, res) => {
  res.send("Success");
});
export default userRouter;


//--------------------------------------------

//Place in index.js
//------------------
import express from "express";
import { json } from "body-parser";
import passport from "passport";

import { connect } from "./utils/db";
import userRouter from "./user/user.routes";

const app = express();
const port = 3000;

app.use(passport.initialize());

app.use(json());
app.use("/", userRouter);

app.listen(port, async () => {
  await connect();
  console.log(`Server listening on ${port}`);
});


// https://www.twilio.com/blog/facebook-oauth-login-node-js-app-passport-js