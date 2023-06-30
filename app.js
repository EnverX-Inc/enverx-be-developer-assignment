const express = require("express");
const morgan = require("morgan");


const blogRouter = require('./routes/blogRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

app.use((req, res, next) => {
    console.log("Hello from the middleware");
    next();
});

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html')
    res.send(`<h1>Hello</h1>`);
})

app.use('/api/v1/blogs', blogRouter);
app.all("*", (req, res, next) => {
    res.status(404).json({
        status: "fail",
        message: `Cant find ${req.originalUrl} on this server!`,
    });
});

app.use((err, req, res, next) => {
    err.status = err.status || "error";
    err.statusCode = err.statusCode || 500;
    return res.status(err.statusCode).json({
        title: 'Something went wrong!',
        status: err.status,
        msg: err.message
    })
})


module.exports = app;