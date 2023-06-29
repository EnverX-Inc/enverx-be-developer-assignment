const userModel = require('../models/userModel');
const errorHandler = require('../middlewares/errorHandler');
const bcrypt = require('bcrypt');
const authentication = require('../middlewares/authentication');

//controller for signup
const signUp = async (req,res,next) => {
   try{
     let {email,password} = req.body;
   
     let userExists = await userModel.findOne({email},{email : 1}) ? true : false;
     if(userExists){
        res.status(400).json({
            statusCode : 400,
            message : "User already present!"
        })
     }
     else {
        let decryptedPassword = await bcrypt.hash(password,10);
        let newUser = new userModel({
            email,
            password : decryptedPassword
         });

         await newUser.save();
         return res.status(401).json({
            statusCode : 401,
            message : 'User Created!'
         })
     }

   }catch(error){
     next(error);
   }
}

//controller for login
const login = async (req,res,next) => {
    try{
      let {email,password} = req.body;
  
      //getuserData verifyPassword generateAuthToken
      let getUserdata = await userModel.findOne({email},{password : 1,email : 1});
      if(!getUserdata){
        let error = {
            status : 400,
            message : 'User not registered!'
        }
        return next(error);
      }
      console.log('next error is not working!');
      let passwordCheck = await bcrypt.compare(password,getUserdata.password) ? true : false;
      if(!passwordCheck){
        let error = {
            status : 400,
            message : 'Password is not correct!'
        }
        return next(error);
      }
      //email,userid
      let decodedToken = authentication.generateAuthToken(getUserdata.email,getUserdata._id);
      return res.status(200).json({
        statusCode : 200,
        message : 'User successfully logged in!',
        jwtToken : decodedToken
      })

    }catch(error){
      next(error);
    }
}


module.exports = {
    signUp,
    login
}