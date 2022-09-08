import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import testUserRoute from "./routes/usertest.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

//CONNECT TO DB

const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("Connected to db");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDB disconnected");
});

//MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/usertest", testUserRoute);

app.listen(8800, () => {
  connect();
  console.log("App is running on port 8800");
});
