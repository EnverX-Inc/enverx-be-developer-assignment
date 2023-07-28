var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const PORT = process.env.PORT || "5555";
const mongoose = require("mongoose");
require('dotenv').config()

var blogsRouter = require("./routes/blogs");

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", blogsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404).json({
    error: "Unable to find the requested resource!",
  });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

//console.log("mongodb",mongodb,process.env.NODE_ENV);
// mongodb://mongodb:27017/blogs_app
//process.env.MONGODB_URI
if (process.env.NODE_ENV != "test") {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    })
    .then(async () => {
      console.log("Connected to MongoDB");
      app.listen(parseInt(PORT, 10), () => {
        console.log(`Listening on ${PORT}`);
      });
    });
}else{
  app.listen(parseInt(PORT, 10), () => {
    console.log(`Listening on ${PORT}`);
  });
}



module.exports = app;
