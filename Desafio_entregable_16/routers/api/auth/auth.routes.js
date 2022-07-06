
const express = require('express');
const passport = require('../../../api/middlewares/passport');
const authController = require('../../../api/middlewares/authController');

const authRouter = express.Router();

authRouter.post('/register',
  (passport.authenticate("register", {
    failureRedirect: "/register-error",
    successRedirect: "/"
})));

authRouter.post('/login',
  (passport.authenticate("login", {
    failureRedirect: "/login-error",
    successRedirect: "/"
})));

module.exports = authRouter;