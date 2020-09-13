const mongoose = require("mongoose");
const { UserSchema } = require("./user");

const TodoSchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: false },
    date: { type: Date, require: true },
    priority: { type: String, require: true },
    status: { type: Boolean, require: true, default: true },
    user: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports = mongoose.model("todo", TodoSchema);
