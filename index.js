const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8001;
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const userDataRoutes = require("./routes/userDataRoutes");
const commentRoutes = require("./routes/commentRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const authRoutes = require("./routes/authRoutes");
const { options } = require("pg/lib/defaults");

// var allowlist = ["http://localhost:3000"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// const whitelist = ["https://www.pertamina.com", "http://localhost:3000"];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error());
//     }
//   },
// };

const corsOptions = {
  origin: "http://localhost:3000",
  // origin: "https://belajar-react-wachid.web.app",
};

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

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
