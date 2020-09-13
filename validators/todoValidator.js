const { check } = require("express-validator");
const validator = require("./validator");
class todoValidator extends validator {
  handle() {
    return [
      check("title")
        .isLength({ min: 3, max: 50 })
        .withMessage("عنوان باید بین 3 تا 50 حرف باشد."),
      check("description")
        .isLength({ min: 3, max: 300 })
        .withMessage("توضیحات باید بین 3 تا 50 حرف باشد."),
      check("priority").isNumeric().withMessage("اولویت باید یک عدد باشد."),
      check("status")
        .optional()
        .isBoolean()
        .withMessage("وضعیت باید یک یا صفر باشد."),
    ];
  }
}
module.exports = new todoValidator();
