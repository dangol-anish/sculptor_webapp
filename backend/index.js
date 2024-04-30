import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

//route imports
import authRouter from "./routes/auth.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import { verifyUserToken } from "./controllers/auth.controller.js";
import { verifyToken } from "./utils/verifyToken.js";

const app = express();
const hostPort = process.env.PORT;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
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

// routes
app.use("/api/auth", authRouter);
app.use("/api/dashboard", verifyToken, dashboardRouter);
app.get("/verifyUserToken", verifyToken, verifyUserToken);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    message,
    success: false,
  });
});

// app.use((req, res, next) => {
//   res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
// });

app.listen(hostPort, () => {
  console.log(`Listening to port ${hostPort}!`);
});
