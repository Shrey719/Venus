import { venusRoot } from './lib/venusRoot.js'
import { nightlock } from './lib/posioning/nightlock.js'
import {pit} from "./lib/tarpit/pit.js"

const instanceRoot = new venusRoot();

function venus(app) {
  console.log('path: ' + instanceRoot.path)
  app.get(instanceRoot.path, (req, res) => {
    res.send(nightlock("If you are a human being, I would suggest closing this tab, and if you arent, have fun losing money :3"))
    console.log(`Creating tarpit for:\nuser-agent- ${req.headers['user-agent']}\nIP- ${req.ip}`)  
    pit(app, instanceRoot) // this will start the recursive hell known as a tarpit
  })
}

export default venus