import prisma from "../db.js";
import { encryptPwd, checkPwd, generateJWT } from "../utils/auth.js";

export const insertUser = async (req, res) => {
  const user = await prisma.user.create({
    data: {
      username: req.body.username,
      password: await encryptPwd(req.body.password),
    },
  });

  const key = generateJWT(user);
  res.json({ token: key });
};

export const signin = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(401);
    res.json({
      message: "Send Required Data",
    });
    return;
  }

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  const isValid = await checkPwd(password, user.password);

  if (!isValid) {
    res.status(401);
    res.json({
      message: "Wrong Password",
    });
    return;
  }

  const key = generateJWT(user);
  res.json({ token: key });
};
