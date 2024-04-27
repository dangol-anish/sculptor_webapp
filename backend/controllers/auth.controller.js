import dotenv from "dotenv";
dotenv.config();
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { supabase } from "../db/supabaseClient";

export const signup = async (req, res, next) => {
  const { userName, userEmail, userPassword } = req.body;

  const { data: existingUser, error: userError } = await supabase
    .from("users")
    .select("user_email")
    .eq("user_email", userEmail);

  if (userError) {
    res.json("Something is wrong");
  }

  if (existingUsers.length > 0) {
    return res
      .status(400)
      .json({ message: "User with this email already exists" });
  }

  const hashedPassword = bcryptjs.hashSync(userPassword, 10);

  try {
  } catch (error) {
    next(error);
  }
};
