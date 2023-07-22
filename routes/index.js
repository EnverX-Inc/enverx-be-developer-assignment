const express = require("express");
const router = express.Router();

const UserRoutes = require("../controllers/Users/users.routes");
const PostRoutes = require("../controllers/Posts/posts.routes");

router.use("/users", UserRoutes);
router.use("/posts", PostRoutes);

module.exports = router;
