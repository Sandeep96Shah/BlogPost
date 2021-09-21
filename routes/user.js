const express = require("express");
const Router = express.Router();

const userController = require('../controllers/user');

Router.post("/signUp/admin", userController.registerAdmin);

Router.post("/signUp/user", userController.registerUser);

Router.post('/signIn', userController.signIn);

module.exports = Router;
