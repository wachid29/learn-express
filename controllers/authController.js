const model = require("../model/userDataModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // search user
    const getUserByEmail = await model.findByEmail(email);

    if (getUserByEmail?.rowCount) {
      // validate password
      const checkPassword = bcrypt.compareSync(
        password,
        getUserByEmail?.rows[0]?.password
      ); // true or false

      if (checkPassword) {
        const token = jwt.sign(
          getUserByEmail?.rows[0],
          process.env.SECRET_CODE,
          { expiresIn: "24h" }
        );
        res.status(200).json({
          user: { ...getUserByEmail.rows[0], ...{ password: null } },
          token: token,
        });
      } else {
        res.status(401).send("password tidak sesuai");
      }
    } else {
      res.status(400).send("email belum teregistrasi");
    }
  } catch (error) {
    res.status(400).send("ada yang error");
  }
};

module.exports = { login };
