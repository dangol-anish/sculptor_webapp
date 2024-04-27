import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import { supabase } from "./db/supabaseClient.js";

const app = express();
const hostPort = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const { error } = await supabase.from("users").insert({
    user_name: userName,
    user_email: userEmail,
    user_password: userPassword,
  });
  if (error) {
    res.send(error);
  }
  res.json({ message: "Successfully Signed Up!" });
});

app.listen(hostPort, () => {
  console.log(`Listening to port ${hostPort}!`);
});
