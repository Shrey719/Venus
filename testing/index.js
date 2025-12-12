import Venus from "./venus.js"
import express from 'express'

const app = express()
const venus = new Venus("hello")
app.use(venus.prefix, venus.route())

app.get("/", (req, res) =>{
    res.send(`<html>Pretend this has some real page content <a href="${venus.root.path}">some text</a> </html>`)
})

app.listen(8080, () => {
    console.log("Listening on port 8080")
})