const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});

app.get('/', (req, res) => {
    res.send("hello")
})


module.exports = app;