require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const blogRoutes = require("./routes/blogRoutes.js");
const db = require("./config/db");
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

// Define the BlogPost model in 'models/BlogPost.js'

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Define the blogRoutes in 'routes/blogRoutes.js'
app.use("/blog", blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Something went wrong" });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
