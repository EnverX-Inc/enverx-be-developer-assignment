const mongoose = require('mongoose');
const config = require('../config/config');

const connectDb = async () => {
  try {
    // eslint-disable-next-line
    const _connection = await mongoose.connect(config.mongoose.url);
    // eslint-disable-next-line
    console.log('db connected!');
  } catch (err) {
    // eslint-disable-next-line
    console.log(`Mongoose Connection Error : ${err}`);
  }
};

module.exports = connectDb();
