const path = require("path")

require('dotenv').config({ path: path.join(__dirname, '.env') });

const mongoose = require("mongoose")

const express = require("express")

const blogRoute = require("../Backend/routes/")

const httpStatus = require("http-status")

const { errorHandler } = require("./middlewares/error")

const ApiError = require("./utils/ApiError")

const cors = require("cors");

const app = express()

app.use(express.json())

app.use(cors());

app.options("*", cors());

mongoose.connect(process.env.CONNECTION_STRING).then(() => {
    console.log("Connected Successfully", process.env.CONNECTION_STRING)
}).catch(() => {
    console.log("Connected Failed", process.env.CONNECTION_STRING)
})

app.use("/blogs", blogRoute)

app.use(errorHandler)

app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, "Api Not found"))
})

app.listen(process.env.PORT, () => {
    console.log("Server running on port", process.env.PORT)
})
