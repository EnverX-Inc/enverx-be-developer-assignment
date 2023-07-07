/** @format */

var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.status(200).json({ message: `this is blog api` });
});

module.exports = router;
