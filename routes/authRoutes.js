const Router = require("express").Router();
const controller = require("../controllers/authController");
const validation = require("../middleware/validation-middleware");
// LOGIN
Router.post("/login", validation.login, controller.login);

module.exports = Router;
