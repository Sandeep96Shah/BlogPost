const express = require("express");
const Router = express.Router();

Router.use("/user", require("./user"));

Router.use('/blog', require('./blog'));

Router.get('/', (req,res) => {
    return res.send('<h1>Welcome</h1>');
});

module.exports = Router;
