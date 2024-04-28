import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { pwdRegex } from "../utils/password.js";

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
    if (userPassword !== confirmUserPassword) {
      return next(errorHandler(404, "Your passwords don't match!"));
    }

    const hashedPassword = bcryptjs.hashSync(userPassword, 10);
    const newUser = new User({
      user_name: userName,
      user_email: userEmail,
      user_password: hashedPassword,
    });
    try {
      await newUser.save();
      res.status(201).json({
        message: "User created successfully",
      });
    } catch (error) {
      return next(errorHandler(404, `Error while creating user: ${error}`));
    }
  } catch (error) {
    return next(errorHandler(505, `Internal Server Error: ${error}`));
  }
};
