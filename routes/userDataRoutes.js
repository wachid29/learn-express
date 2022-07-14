const Router = require("express").Router();
const { required } = require("nodemon/lib/config");
const controller = require("../controllers/userDataController");
const middleware = require("../middleware/auth");
const upload = require("../middleware/upload");
// GET USER PAGE
Router.get("/userdata/pages", controller.getUsersPage);
// GET USER
Router.get("/userdata", controller.getUsers);
// FIND USER BY NAME
Router.get("/userdata/find", controller.findNameUsers);
// ADD USER
Router.post("/userdata/add", controller.addUsers);
// EDIT USER
Router.patch("/userdata/edit", controller.editUsers);
// DELETE USER
Router.delete(
  "/userdata/delete",

  controller.deleteUsers
);

Router.post("/recipebyuser", middleware.checkToken, controller.recipeByUser);

Router.patch("/userdata/editPhoto", upload.uploadprofile, controller.editPhoto);

module.exports = Router;
