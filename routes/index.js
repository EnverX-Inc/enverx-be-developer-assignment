const ValidationManager = require("../middleware/validation");
const UserModule = require("../modules/user");
const PostModule = require("../modules/post");
const { userVerification } = require("../middleware/jwtVerification");

const route = (app) => {
    app.post("/register-user", ValidationManager.validateRegistration, UserModule.registerUser);
    app.post("/login-user", ValidationManager.validateLogin, UserModule.loginUser);

    // blogs API
    app.post("/posts", userVerification, ValidationManager.validateCreatePosts, PostModule.createPost);
    app.put("/posts/:id", userVerification, ValidationManager.validateUpdatePost, PostModule.updatePost);
    app.delete("/posts/:id", userVerification, ValidationManager.validateDeletePost, PostModule.deletePost);
    app.get("/posts/:id", userVerification, PostModule.getPostById);
    app.get("/posts", userVerification, PostModule.getPosts);
}

module.exports = route;