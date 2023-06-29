const jwtToken = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const generateAuthToken = (email,userId) => {
    console.log(email,userId);
   const tokenPayload = {
      email,
      userId
   }

   const token = jwtToken.sign(tokenPayload,process.env.JWT_SECRET_KEY,{
      expiresIn : '1h'
   });

   console.log(token);
   return token;
}

const isAuthenticated = async (req,res,next) => {
    let token = req?.headers?.authorization?.split(" ")[1];
    if(!token)return res.status(400).json({'message' : 'token is missing!'});
    
    let decodedtoken;
    try{
      decodedtoken = jwtToken.verify(token,process.env.JWT_SECRET_KEY);
    }
    catch(error){
      return res.status(400).json({
          message : error.message
      })
    }
  
    req.user = decodedtoken;
    next();
}

module.exports = {
    generateAuthToken,
    isAuthenticated
}