const express = require('express')
require('dotenv').config()
const app = express()

app.listen(2000, ()=>{
        console.log(`Server is running at ${process.env.PORT}`)
})