# Venus 
Venus is a low-overhead, easy to implement tarpit designed to protect against all crawlers, most notably AI ones.  <br>
To have decent SEO and use venus at the same time, blacklist the venus prefix on robots.txt

# Installation
<p>From NPM</p>
<code>npm i venus-pit</code>
<br><br>
<p>From source</p>
<code>git clone https://github.com/librenetwork-dev/Venus.git && cd Venus && npm i && npm run build</code>
<br>
<br>

# Usage   
By default, venus is set up to be ran directly inside of an express app.  <br>
If you do not want to use express or do not want to use node.js, set up an ngnix proxy to serve Venus from the prefix. <br>
In order for venus to work properly, you must link the prefix somewhere on your site. 
## With express.js
```js
import Venus from "./venus.js"
import express from 'express'

const app = express()
const venus = new Venus("/prefix/")
app.use(venus.prefix, venus.route())

app.listen(8080, () => {
    console.log("Listening on port 8080")
})
```
# Building     
<code>npm run build</code>    

See /docs/ for a more in depth documentation   

# Join Libre Network 
https://discord.gg/CZ5EAaD8VD