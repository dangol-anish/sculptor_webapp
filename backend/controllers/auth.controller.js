import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { pwdRegex } from "../utils/password.js";
import { randomString } from "../utils/random.js";
import { verifyEmail } from "../utils/sendEmail.js";
import url from "url";

// signup controller
export const signup = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, confirmUserPassword } = req.body;
    //empty input validation
    if (!userName || !userEmail || !userPassword) {
      return next(errorHandler(404, "All fields are required!"));
    }

    // existing email check
    const existingUser = await User.findOne({ user_email: userEmail });
    if (existingUser) {
      return next(errorHandler(404, "User already exists"));
    }

    // password validation check
    if (!pwdRegex.test(userPassword)) {
      return next(
        errorHandler(
          404,
          "Password must have at least one upper case letter, one lower case letter, one digit, one special character, and longer than eight characters"
        )
      );
    }

    // password and confirm password validation
    // if (userPassword !== confirmUserPassword) {
    //   return next(errorHandler(404, "Your passwords don't match!"));
    // }

    const hashedPassword = bcryptjs.hashSync(userPassword, 10);

    const code = randomString(20);

    const newUser = new User({
      user_name: userName,
      user_email: userEmail,
      user_password: hashedPassword,
      verificationCode: code,
    });
    try {
      await newUser.save();
      res.status(201).json({
        success: true,
        message:
          "User successfully created! Please click on the link in your email to verify your account.",
      });
    } catch (error) {
      return next(errorHandler(404, `Error while creating user: ${error}`));
    }

    const link = `http://localhost:3000/api/auth/verify?code=${code}`;

    verifyEmail(userEmail, userName, link);
  } catch (error) {
    return next(errorHandler(505, `Internal Server Error: ${error}`));
  }
};

export const verifyUser = async (req, res, next) => {
  try {
    const { code } = req.query;

    console.log("This is the code" + code);
    const user = await User.findOne({ verificationCode: code });

    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Code is invalid" });

    user.user_emailVerified = true;
    user.verificationCode = undefined; // Clear verification code after verification
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } catch (error) {
    return next(errorHandler(505, `Internal Server Error: ${error}`));
  }
};
