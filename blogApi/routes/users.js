/** @format */

var express = require("express");
var router = express.Router();

var User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

// register users

router.post(`/signup`, async (req, res, next) => {
  let userObj = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userExists = await User.findOne({ email: userObj.email });

    if (userExists) {
      return res.status(400).json({
        message: "User Already exists.",
      });
    }
    var user = await User.create(userObj);

    // console.log(user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
    // console.log(error);
  }
});

// login user

router.post(`/login`, async (req, res, next) => {
  // console.log(req.body, `bbb`);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: " Email or Password is missing." });
  }
  try {
    const user = await User.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(400).json({ error: " user not registered." });
    }

    var result = await user.verifyPassword(password);
    if (!result) {
      return res
        .status(400)
        .json({ error: "Please provide correct password." });
    }
    var token = await user.generateAuthToken();
    // res.status(200).json({ user: user.userJSON(token) });
    res.status(200).json(user);
  } catch (error) {
    return error;
  }
});

module.exports = router;
