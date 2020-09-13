const express = require("express");
const router = express.Router();

// Controllers
const loginController = require("../controllers/auth/loginController");
const registerController = require("../controllers/auth/registerController");

// validators
const registerValidator = require("../validators/registerValidator");
const loginValidator = require("../validators/loginValidator");

router.post("/login", loginValidator.handle(), loginController.loginProccess);

router.post(
  "/register",
  registerValidator.handle(),
  registerController.registerProccess
);

module.exports = router;
