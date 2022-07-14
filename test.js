const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/profiles", express.static("profiles"));

app.post("/test", (req, res) => {
  const { password } = req.body;
  console.log(req.body);
  // const salt = bcrypt.genSaltSync(5); // generate random string
  // const hash = bcrypt.hashSync(password, salt); // hash password
  // var token = jwt.sign(
  //   { foo: "bar" },
  //   "bf067373cf107a04ffee8df4173b5964dd9525a184628e4a8d67a8c71b1d57b1"
  // );

  res.send("ok");
});
app.listen(8002);

// pass: "$2b$15$T4b9UI1iMdLBTtSVMDch1.MHSZT/lAwETB8R.YJEvKHRh7ARx/O8u"
// pass2: "$2b$05$3.a55/SMAavrsQ2m6AhRqek0QnD6AntDydcbFDGaPIhdGU/NfyHyK"
// pass3: "$2b$10$keNuydXZ83nDLhJX22rAQ.0DVwRBoYLoWRIeOpQwbZliktIZxyGf6"
