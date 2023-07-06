import { Router } from "express";
import { body, validationResult } from "express-validator";
import { getposts, getOnepost, createpost, deletepost } from "./models/post.js";
import { handleInputErrors } from "./utils/middleware.js";

const router = Router();

router.get("/post", getposts);
router.get("/post/:id", getOnepost);
router.put(
  "/post/:id",
  body("name").isString(),
  handleInputErrors,
  (req, res) => {}
);
router.post("/post", body("name").isString(), handleInputErrors, createpost);
router.delete("/post/:id", deletepost);

export default router;
