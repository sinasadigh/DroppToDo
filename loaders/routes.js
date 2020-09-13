const express = require("express");

const authRouter = require("../routes/auth");
const todoRouter = require("../routes/todo");
module.exports = function (app) {
  app.use(express.json());
    app.use("/auth", authRouter);
    app.use("/todo", todoRouter);
};
