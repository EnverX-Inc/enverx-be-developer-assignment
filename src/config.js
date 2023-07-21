const dotenv = require('dotenv')
dotenv.config();

// carete config 
const config = {
    port: process.env.PORT || 8001,
    dbUrl: process.env.dbUrl,
    connectionParams: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
  }
  
  module.exports = config;