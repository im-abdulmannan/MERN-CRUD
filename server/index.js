import bodeParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import route from "./routes/userRoutes.js";

const app = express();
app.use(bodeParser.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
dotenv.config();

const PORT = process.env.PORT || 7000;
const URL = process.env.MONGOURL;
//test route
app.get("/test", (req, res, next)=>{
  res.send("test pass!");
})
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully!");

    app.listen(PORT, () => {
      console.log(`Server is running on port:${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
