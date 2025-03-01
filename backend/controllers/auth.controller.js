import dotenv from "dotenv";
dotenv.config();
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { pwdRegex } from "../utils/password.js";
import { randomString } from "../utils/random.js";
import { verifyEmail } from "../utils/sendEmail.js";

// signup controller
export const signup = async (req, res, next) => {
  try {
    const { userName, userEmail, userPassword, confirmUserPassword } = req.body;

    console.log(userPassword, confirmUserPassword);
    //empty input validation
    if (!userName || !userEmail || !userPassword || !confirmUserPassword) {
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

    // matching password check
    if (userPassword !== confirmUserPassword) {
      return next(errorHandler(404, "Passwords do not match!"));
    }

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
    user.verificationCode = undefined;
    await user.save();

    return res
      .status(200)
      .json({ success: true, message: "User verified successfully" });
  } catch (error) {
    return next(errorHandler(505, `Internal Server Error: ${error}`));
  }
};

export const signin = async (req, res, next) => {
  try {
    const { userEmail, userPassword } = req.body;

    console.log(userEmail);

    //empty input validation
    if (!userEmail || !userPassword) {
      return next(errorHandler(404, "All fields are required!"));
    }

    // check for valid user
    const validUser = await User.findOne({ user_email: userEmail });
    if (!validUser) return next(errorHandler(403, "Invalid Credentials1!"));

    // Check if email is verified
    if (!validUser.user_emailVerified) {
      return next(errorHandler(401, "Email not verified!"));
    }

    const validPassword = bcryptjs.compareSync(
      userPassword,
      validUser.user_password
    );

    if (!validPassword) return next(errorHandler(403, "Invalid Credentials!"));

    const { user_password: pass, ...rest } = validUser._doc;

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT
    );

    console.log(token);

    res.cookie("aT", token, { httpOnly: true }).status(200).json({
      success: true,
      userData: rest,
    });
  } catch (error) {
    return next(errorHandler(505, `Internal Server Error: ${error}`));
  }
};

export const signout = async (req, res, next) => {
  try {
    res.clearCookie("aT");
    res.status(200).json({
      success: true,
      message: "Signed Out Successfully!",
    });
  } catch (error) {
    return next(errorHandler(404, `Error while signin out!`));
    console.log(error);
  }
};

export const verifyUserToken = async (req, res, next) => {
  try {
    const token = req.cookies.aT;

    if (token) {
      res.json({
        token,
      });
    } else {
      res.json({
        success: false,
        message: "User is not loggeed in",
      });
    }
  } catch (error) {}
};

export const google = async (req, res, next) => {
  try {
    const { userEmail, userName, userAvatar } = req.body;

    const user = await User.findOne({ user_email: userEmail });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      const { user_password: pass, ...rest } = user._doc;

      res.cookie("aT", token, { httpOnly: true }).status(200).json({
        success: true,
        userData: rest,
      });
    } else {
      const generatedPwd =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);

      const hashedPassword = bcryptjs.hashSync(generatedPwd, 10);
      const newUser = new User({
        user_name: userName,
        user_email: userEmail,
        user_password: hashedPassword,
        user_avatar: userAvatar,
        user_emailVerified: true,
      });

      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT);
      const { user_password: pass, ...rest } = newUser._doc;

      res.cookie("aT", token, { httpOnly: true }).status(200).json({
        success: true,
        userData: rest,
      });
    }
  } catch (error) {
    next(errorHandler(404, "google sign in error"));
  }
};
