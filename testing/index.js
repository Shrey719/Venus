import venus from "./venus.js"
import express from 'express'

const app = express()

app.use(express.static("testing/static"))

let v = venus(app, "HELLO")
fetch(`http://localhost:8080${v}`)

app.listen(8080, () => {
    console.log("Listening on port 8080")
})