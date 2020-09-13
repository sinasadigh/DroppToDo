const controller = require("../controller");
const passport = require("passport");
const jwt = require("jsonwebtoken");
class loginController extends controller {
  async loginProccess(req, res, next) {
    let result = await this.validationData(req);
    if (result.status) {
      return this.login(req, res, next);
    }

    return res.json({ message: result.message });
  }

  async login(req, res, next) {
    passport.authenticate("login", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("خطایی رخ داده");
          return next(error);
        }
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
          const body = { _id: user._id, email: user.email };
          const token = jwt.sign({ user: body }, "top_secret");
          return res.json({ token });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
}

module.exports = new loginController();
