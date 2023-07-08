const router = require("express").Router()
const blogRoute = require("../routes/blogs.route")

router.use("/posts",blogRoute)

module.exports=router