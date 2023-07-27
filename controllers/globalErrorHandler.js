const errorDTO = require("../dto/errorDTO")

const globalErrorHandler = (_,res) =>{
    return res.status(500).json(errorDTO())

}

module.exports = globalErrorHandler