import express from "express";
import bodyParser from "body-parser";
import router from "../src/routes/blogRoutes";
import connectDb from "./config/dbConnection";
import dotenv from "dotenv"
dotenv.config({path: 'src/.env'});

const app = express();
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use('/v1/api', router);

/**
 * @description starting the server and connecting the db
 */
app.listen(port, async () => {
    connectDb();
    console.log(`Server running on port ${port}`);
});