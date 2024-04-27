import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;

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
    next(error);
  }
};
