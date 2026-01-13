import  Venus  from "./venus.js"
import express from 'express'

const app = express()
const venus = new Venus("/")
app.use(venus.prefix, venus.route())

app.listen(8080, () => {
    console.log("Listening on port 8080")
})