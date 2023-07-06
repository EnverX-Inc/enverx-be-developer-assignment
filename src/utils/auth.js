import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";

export const generateJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET
  );
  return token;
};

export const validate = (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send("Not authorized");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("No token");
    res.status(401);
    res.send("Not authorized");
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    console.log("User: ", user);
    next();
    return;
  } catch (e) {
    console.error("Jwt Error");
    res.status(401);
    res.send("Not authorized");
    return;
  }
};

export const checkPwd = (pwd, hash) => {
  return bcrypt.compare(pwd, hash);
};

export const encryptPwd = (pwd) => {
  return bcrypt.hash(pwd, 10);
};
