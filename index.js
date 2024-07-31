import cors from "cors";
import morgan from "morgan";
import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./dbConnection.js";
import setupRoutes from "./appRoute.js";

//configure env
dotenv.config();

//databse config
connectDB();

//rest object
const app = express();

//middelwares

app.use(morgan("dev"));

app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000", "https://hr.netlify.app"],
    credentials: true,
  })
);

setupRoutes(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});

export default app;
