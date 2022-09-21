const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8001;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");

const userDataRoutes = require("./routes/userDataRoutes");
const commentRoutes = require("./routes/commentRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const { options } = require("pg/lib/defaults");

const whitelist = [
  "https://mama-recipe-rern39vah-wachid29.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: whitelist,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use(xss());

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/profiles", cors(corsOptions), express.static("profiles"));
app.use("/images", cors(corsOptions), express.static("images"));
// Define all routes
app.use("/", cors(corsOptions), userDataRoutes);
app.use("/", cors(corsOptions), commentRoutes);
app.use("/", cors(corsOptions), recipeRoutes);
app.use("/", cors(corsOptions), authRoutes);

app.use("*", (req, res) => {
  res.send("sukses");
});

app.listen(port, () => {
  console.log(`Fighting!!`);
});
