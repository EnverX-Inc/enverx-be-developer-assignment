require("dotenv").config();
const mongoose = require("mongoose");

const db = (async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/blog`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected");
  } catch (err) {
    console.log(err);
  }
})();

module.exports = db;
