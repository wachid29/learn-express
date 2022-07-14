const Router = require("express").Router();
const controller = require("../controllers/recipeController");
const upload = require("../middleware/upload");
const middleware = require("../middleware/auth");

Router.get("/recipe", controller.getRecipe);

Router.get("/recipe/pages", controller.getRecipePage);

Router.get(
  "/recipe/get5data",
  middleware.checkToken,
  controller.getNewestRecipe
);

Router.get("/recipe/find", controller.findRecipe);

Router.post(
  "/recipe/add",
  middleware.checkToken,
  upload.uploadSingle,
  controller.addNewRecipe
);

Router.patch("/recipe/edit", controller.editRecipe);

Router.delete("/recipe/delete", controller.deleteRecipe);

Router.get("/commentbyrecipe", controller.commentByRecipeID);

module.exports = Router;
