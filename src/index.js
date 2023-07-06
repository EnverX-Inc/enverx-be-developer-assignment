import * as dotenv from "dotenv";
dotenv.config();

import app from "./server.js";

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server on ${process.env.SERVER_PORT}`);
});
