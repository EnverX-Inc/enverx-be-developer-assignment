exports.apiFailureMessage = {
  USER_ALREADY_EXISTS: "User already exists",
  POST_NOT_FOUND: "Post not found",
  USER_NOT_FOUND: "User not found",
  INCORRECT_PASSWORD: "Incorrect Password",
  TOKEN_NOT_PROVIDED: "Token not provided",
  AUTHENTICATION_FAILED: "Authentication Failed",
};

exports.apiSuccessMessage = {
  USER_SAVED_SUCCESSFULLY: "User added successfully",
  USER_LOGGED_IN_SUCCESSFULLY: "User logged in successfully",
  POST_CREATED_SUCCESSFULLY: "Post created successfully",
  POST_UPDATED_SUCCESSFULLY: "Post updated successfully",
  POST_DELETED_SUCCESSFULLY: "Post deleted successfully",
  POST_FETCHED_SUCCESSFULLY: "Post fetched successfully",
};

exports.statusCodes = {
  SUCCESS: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500,
};
