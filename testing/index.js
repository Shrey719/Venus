import venus from "./venus.js"
import express from 'express'

const app = express()

app.use(express.static("testing/static"))

venus(app)

app.listen(8080, () => {
    console.log("Listening on port 8080")
})