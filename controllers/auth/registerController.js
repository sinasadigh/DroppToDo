const controller = require("../controller");
const passport = require("passport");

class registerController extends controller {
  async registerProccess(req, res, next) {
    let result = await this.validationData(req);

    if (result.status) {
      return this.register(req, res, next);
    }

    return res.json({
      message: result.message,
    });
  }

  async register(req, res, next) {
    passport.authenticate("signup", async (err, user, info) => {
      if (err) {
        return next(err);
      }
      return res.json({
        message: "با موفقیت ثبت شد",
        user: user,
      });
    })(req, res, next);
  }
}

module.exports = new registerController();
