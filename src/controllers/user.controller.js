const userService = require('../services/user.services');

const postCredentials = async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await userService.postCredentials(username, password);
      res.status(201).json({
        message: "inserted",
        data: {
          credential: result,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  const userLogin = async (req, res) => {
    try {
      const { username, password } = req.body;
      const result = await userService.loginCredentials(username, password);
      res.status(201).json({
        message: "logged in",
        data: {
          JWT_token: result,
        },
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  
  const validateToken = async (req, res) => {
    try {
      const { token } = req.query;
      const valid = await userService.validateToken(token);
      res.status(200).json({
        status: "success",
        message: "user verified",
        data: valid,
      });
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
  module.exports = { postCredentials, userLogin, validateToken };