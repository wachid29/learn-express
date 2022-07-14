const jwt = require("jsonwebtoken");
require("dotenv").config();

const checkToken = async (req, res, next) => {
  try {
    if (req.headers?.authorization) {
      const token = req.headers?.authorization;
      const decoded = jwt.verify(
        token.substring(7, token.length),
        process.env.SECRET_CODE
      );
      if (decoded) {
        next();
      }
    } else {
      res.status(401).send("silakan masukkan token");
    }
  } catch (error) {
    res.status(401).send("token tidak valid");
  }
};

module.exports = { checkToken };
