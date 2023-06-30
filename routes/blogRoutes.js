const express = require("express");
const bolgController = require('../controllers/blogController')

const router = express.Router();

router
    .route('/posts')
    .get(bolgController.getBlog);


module.exports = router;