import venus from "./venus.js"
import express from 'express'

const app = express()

let v = venus(app, "HELLO")

app.get("/", (req, res) =>{
    res.send(`<html>Pretend this has some real page content <a href="${v}">some text</a> </html>`)
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})