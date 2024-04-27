import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const hostPort = process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MONGO DB!");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(hostPort, () => {
  console.log(`Listening to port ${hostPort}!`);
});
