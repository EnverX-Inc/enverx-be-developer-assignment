const jwt = require("jsonwebtoken");
const { apiFailureMessage } = require("../constants");

exports.auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token)
      return res.status(400).send({
        message: apiFailureMessage.TOKEN_NOT_PROVIDED,
        statusCode: 400,
      });

    const decode = jwt.verify(token, process.env.SECRET);
    req.body.userId = decode._id;
    next();
  } catch (err) {
    console.error(err);
    res.status(400).send(apiFailureMessage.AUTHENTICATION_FAILED);
  }
};
