const expressRouter = require('express').Router;
const postRouter = require('./postRoutes');

const router = expressRouter();

router.use('/posts', postRouter);

module.exports = router;