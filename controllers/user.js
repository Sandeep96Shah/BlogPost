const User = require("../model/user");
const jwt = require("jsonwebtoken");

module.exports.registerUser = async function (req, res) {
  try {
      console.log("req.body", req.body);
    if(req.body.password != req.body.confirm_password){
        return res.status(500).json({ msg: "Passwrd doesn't match!" });
    }

    let user = await User.create({
        email:req.body.email,
        password:req.body.password,
        role:"user",
    });

    return res.status(200).json({ msg: "Account created Successfully", data: user.id });
  } catch (err) {
    console.log("err in creating  account!", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports.registerAdmin = async function (req, res) {
    try {
      if(req.body.password != req.body.confirm_password){
          return res.status(500).json({ msg: "Passwrd doesn't match!" });
      }
  
      let user = await User.create({
          email:req.body.email,
          password:req.body.password,
          role:"admin",
      });
  
      return res.status(200).json({ msg: "Account created Successfully", data: user.id });
    } catch (err) {
      console.log("err in creating  account!", err);
      return res.status(500).json({ msg: "Internal Server Error" });
    }
  };

module.exports.signIn = async function (req, res) {
  try {
    console.log("login ", req.body);
    let user = await User.findOne({ email: req.body.email });
    console.log("Valid user", user);

    if (user && user.password == req.body.password) {
      let token = jwt.sign(user.toJSON(), "secret");
      console.log("token", token);
      return res
        .status(200)
        .json({ 
            msg: "Success", 
            data: { token: token },
            user,
        });
    }else{
        return res.status(400).json({
            message:"Please try again!",
        })
    }
  } catch (err) {
    console.log("err in creating  user", err);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};
