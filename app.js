const express = require("express");
const morgan = require("morgan");

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
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
    next(new AppError(`Cant find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);


module.exports = app;