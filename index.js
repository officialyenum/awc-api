const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const mediaRoute = require("./routes/medias");
const response = require("./utils/response");

dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/medias", mediaRoute);
app.use("/", async (req, res) => {
  try {
    response(
      res,
      "success",
      "Welcome to Afterworkchills Api Endpoint",
      [],
      200
    );
  } catch (err) {
    response(res, "error", err, [], 500);
  }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log("Api is running");
});
