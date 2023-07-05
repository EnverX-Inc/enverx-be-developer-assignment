const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { apiFailureMessage, apiSuccessMessage } = require("../common/constants");

class UserModule {
  registerUser = async (req, res) => {
    try {
      const checkEmailExist = await UserModel.findOne({
        email: req.body.email,
      });
      if (checkEmailExist)
        return res
          .status(400)
          .send({ message: apiFailureMessage.USER_ALREADY_EXISTS, statusCode: 400 });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const userResponse = await new UserModel({
        ...req.body,
        password: hashedPassword,
      }).save();
      res.json({
        response: userResponse,
        message: apiSuccessMessage.USER_SAVED_SUCCESSFULLY,
        statusCode: 200
      });
    } catch (err) {
      res.status(500).send(err);
    }
  };

  loginUser = async (req, res) => {
    const userResponse = await UserModel.findOne({ email: req.body.email });
    if (!userResponse)
      return res.status(404).send({ message: apiFailureMessage.USER_NOT_FOUND, statusCode: 404 });

    const password = await bcrypt.compare(
      req.body.password,
      userResponse.password
    );
    if (!password)
      return res.status(400).send({ message: apiFailureMessage.INCORRECT_PASSWORD, statusCode: 400 });

    const token = jwt.sign(
      {
        _id: userResponse._id,
        email: userResponse.email,
        password: userResponse.password,
      },
      process.env.SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      userResponse,
      message: apiSuccessMessage.USER_LOGGED_IN_SUCCESSFULLY,
      token,
      statusCode: 200
    });
  };

  
}

module.exports = new UserModule();
