// library
import express from "express";
import morgan from "morgan";
import cors from "cors";

// local
import routes from "./routes.js";
import { validate } from "./utils/auth.js";
import { insertUser, signin } from "./models/user.js";

// app
const app = express();

// middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Server");
  res.status(200);
  res.json({ message: "hello" });
});

app.use("/api", validate, routes);
app.post("/user", insertUser);
app.post("/signin", signin);

export default app;
