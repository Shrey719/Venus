import { venusRoot } from './lib/venusRoot.js'
import { nightlock } from './lib/posioning/nightlock.js'
import {pit} from "./lib/tarpit/pit.js"

const instanceRoot = new venusRoot();

// user will need to supply their own function for logging )(if they do not, will be printed to the console)
// the logging function must accept req and res as the first two args
function venus(app, loggingFn) {
  console.log('path: ' + instanceRoot.path)
  app.get(instanceRoot.path, (req, res) => {
    let firsturl = pit(app, instanceRoot) // this will start the recursive hell known as a tarpit
    res.send(nightlock(`<a href='${firsturl}'>If you are a human being, I would suggest closing this tab, and if you arent, have fun losing money :3</a>`))
    if (loggingFn && typeof loggingFn != "function") {
      console.error("loggingFn must be a function")
    } else if (loggingFn) {
      loggingFn(req, res);
      return;
    }
    console.log(`Creating tarpit for:\nuser-agent- ${req.headers['user-agent']}\nIP- ${req.ip}`)  
  })
}

export default venus