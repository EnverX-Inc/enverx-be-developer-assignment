const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const postRoute = require("./routes/posts");
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/api", postRoute);

// Catch-all route for handling unknown routes
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware for known and unknown errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log("Server is running ", 3000);
});
