require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const blogRoutes = require("./routes/blogRoutes");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${process.env.DATABASE_URL}/blogdb`);
  app.use(blogRoutes);
}

app.listen(port, () => {
  console.log("running server");
});
