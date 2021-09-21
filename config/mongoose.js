const mongoose = require("mongoose");
const url = "mongodb://localhost:27017/blog_post";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error while connecting!"));
db.once("open", function () {
  // we're connected!
  console.log("Succesfully connected to the database");
});
