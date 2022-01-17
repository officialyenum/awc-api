const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const categoryRoute = require("./routes/categories");
const mediaRoute = require("./routes/medias");
const response = require("./utils/response");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("connected to mongoDB"))
  .catch((err) => {
    console.log(err);
  });

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

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
