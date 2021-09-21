const express = require('express');
const port = 8000;

const app = express();

const db = require('./config/mongoose');

app.use(express.json());

app.get('/', (req,res) => {
    return res.send('<h1>Welcome</h1>');
})

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running the server on port : ${port}`);
        return;
      }
      console.log(`server is up and running on port: ${port}`);
      return;
})