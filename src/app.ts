import express from "express";
import bodyParser from "body-parser";
import router from "./routes/Blog";
import DbConnection from "./config/DB";
import dotenv from "dotenv"
dotenv.config({path: 'src/.env'});

const app = express();
app.use(bodyParser.json())

const port = process.env.PORT || 8000;

app.use('/blogs', router);

/**
 * @description starting the server and connecting the db
 */
app.listen(port, async () => {
    DbConnection();
    console.log(`Server running on port ${port}`);
});