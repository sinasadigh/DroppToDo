const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const { User } = require("../../models/user");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        console.log(email);
        const user = await User.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: "کاربر وجود ندارد" });
        }
        const validate = await user.comparePassword(password);
        if (!validate) {
          return done(null, false, { message: "پسورد اشتباه است" });
        }
        return done(null, user, { message: "با موفقیت لاگین شدید" });
      } catch (error) {
        return done(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      //   jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token"),
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
