import { tar } from "./tar.js"
import express from 'express'

function rand() {
    return (Math.sqrt(Math.random()*10)/2)*1000
}

function randomchars() {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return Array.from({length: 32}, () => 
        alphabet[Math.floor(Math.random() * alphabet.length)]
    ).join('')
}

const tarpitRouter = express.Router();
const routeHandlers = new Map(); 
let inited = false;
function selfDestruct(route) {
    if (routeHandlers.has(route)) {
        routeHandlers.delete(route);
        
        // recreate the router w/o the deleted route
        tarpitRouter.stack = tarpitRouter.stack.filter(layer => {
            return !(layer.route && layer.route.path === route);
        });
    }
}

function pit(app, instanceRoot) {
    let newRoute = `${instanceRoot.path}${randomchars()}/`
    console.log("creating a new route: " + newRoute)
    
    const handler = (req, res) => {        
        // use a promise to avoid a stack overflow
        Promise.resolve().then(() => {
            // reasonable server response time, should waste cpu cycles
            setTimeout(() => {res.send(tar(pit(app, instanceRoot)))}, rand());

            // prevent memory leak by cleaning up old routes
            selfDestruct(newRoute)
        })
    };
    
    routeHandlers.set(newRoute, handler);
    tarpitRouter.get(newRoute, handler);
    // FOR TESTIng PURPOSES IF THIS MAKES IT TO PROD JUTS SHOOT ME
    //fetch(`http://localhost:8080${newRoute}`)

    // just so it doesnt get attached multiple times
    if (!inited) {
        app.use(tarpitRouter);
        inited = true;
    }
    return newRoute;
}

export { pit }