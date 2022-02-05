import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
// import multer from "multer";
import path from "path";
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use("./images", express.static(path.join("images")));
const CONNECTION_URL =
  "mongodb+srv://puneetpriyadarshi665526:Singhasan26@cluster0.tuqs0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`SERVER RUNNING SUCCESSFULLY ON PORT ${PORT}`)
    )
  )
  .catch((error) => console.log(error.message));
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./images");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// app.use(
//   multer({
//     storage: storage,
//   }).single("memories")
// );
app.use("/posts", postRoutes);
