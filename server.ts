import express from 'express'

const app: express.Application = express()

const hostname: string = '127.0.0.1'
const port: number = 5000

app.get('/', (request: express.Request, response: express.Response) => {
    response.status(202)
    response.json({"name": "Vaibhav"})
})

app.listen(port, hostname, ()=>{
    console.log(`Listening at ${hostname} : ${port}`)
})

