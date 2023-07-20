const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller');

router.route('/register')
      .post(userController.postCredentials);
router.route('/login')
      .post(userController.userLogin); 
router.route('/token/validate')
      .get(userController.validateToken);            
module.exports=router;