import venus from "./venus.js"
import express from 'express'

const app = express()

app.use(express.static("testing/static"))

function loggingFunction(req, res) {
    console.log(`${req.headers['user-agent']}\n${req.ip}`)  
}   

venus(app, loggingFunction)

app.listen(8080, () => {
    console.log("Listening on port 8080")
})