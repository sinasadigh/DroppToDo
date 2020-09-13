const mongoose = require("mongoose");
const argon2 = require("argon2");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: false },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
  },
  { timestamps: true }
);
UserSchema.pre("save", async function (next) {
  const hash = await argon2.hash(this.password);

  this.password = hash;
  next();
});
UserSchema.methods.comparePassword = async function (password) {
  const compare = await argon2.verify(this.password, password);
  return compare;
};
exports.User = mongoose.model("user", UserSchema);
exports.UserSchema = UserSchema;
