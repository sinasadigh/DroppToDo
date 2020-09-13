const express = require("express");
const router = express.Router();
const passport = require("passport");

const todoController = require("../controllers/todo/todoController");
const todoValidator = require("../validators/todoValidator");
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  todoController.get_user_todo
);
router.post(
  "/",
  todoValidator.handle(),
  passport.authenticate("jwt", { session: false }),
  todoController.createTodo
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  todoController.updateStatus
);
module.exports = router;
