const express = require('express');
const port = 8000;

const app = express();

const db = require('./config/mongoose');

const passport = require("passport");
const jwt = require('./config/passwordJWT');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running the server on port : ${port}`);
        return;
      }
      console.log(`server is up and running on port: ${port}`);
      return;
})