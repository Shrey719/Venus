# Installation
<p>From NPM</p>
<code>npm i venus-pit</code>
<br><br>
<p>From source</p>
<code>git clone https://github.com/librenetwork-dev/Venus.git && cd Venus && npm i && npm run build</code>
<br>
<br>

# Usage    
## With express   
```js
import Venus from "./venus.js"
import express from 'express'

const app = express()
const venus = new Venus("prefix")
app.use(venus.prefix, venus.route())

app.listen(8080, () => {
    console.log("Listening on port 8080")
})
```
## With fastify or others
TODO 
## With ngnix 
TODO
# Building     
<code>npm run build</code>    

See /docs/ for a more in depth documentation   

# Join Libre Network 
https://discord.gg/CZ5EAaD8VD