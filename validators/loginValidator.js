const { check, validationResult } = require("express-validator");
const validator = require("./validator");
class loginValidator extends validator {
  handle() {
    return [
      check("email").isEmail().withMessage("فیلد ایمیل معتبر نیست"),

      check("password")
        .isLength({ min: 8 })
        .withMessage("فیلد پسورد نمیتواند کمتر از 8 کاراکتر باشد"),
    ];
  }
}
module.exports = new loginValidator();
