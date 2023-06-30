const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 8081;
const { connection } = require("./config/db");

app.get("/", (req, res) => {
  try {
    res.status(200).send({ message: "Welcome to Blog Application!" });
  } catch (error) {
    res.status(404).send({ message: error.message });
  }
});

app.listen(port, async () => {
  try {
    await connection;
    console.log("Connection established with Database");
  } catch (error) {
    console.log(error);
  }
  console.log(`Example app listening on port ${port}`);
});
