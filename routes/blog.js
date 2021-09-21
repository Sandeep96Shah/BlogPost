const express = require("express");
const Router = express.Router();

const passport = require('passport');

const blogController = require('../controllers/blog');

Router.get('/all', passport.authenticate('jwt', {session:false}), blogController.getAllBlog);

Router.post('/create', passport.authenticate('jwt', {session:false}), blogController.create);

Router.get('/view/:id', passport.authenticate('jwt', {session:false}), blogController.view);

Router.get('/filter/:title', passport.authenticate('jwt', {session:false}), blogController.filterblogs);

module.exports = Router;
