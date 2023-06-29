const express = require('express');
const userRouter = express.Router();
const userController = require('../controllers/userController');
const userValidatorSchema = require('../middlewares/validationSchema/userValidation')
const validateRequest = require('../middlewares/validateRequest');


userRouter.post('/signup', validateRequest(userValidatorSchema.signUpUserValidationSchema), userController.signUp);

userRouter.post('/login', validateRequest(userValidatorSchema.signInUserValidationSchema), userController.login);

module.exports = userRouter;