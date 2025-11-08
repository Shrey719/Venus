import { tar } from "./tar.js"
import express from 'express'

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
        selfDestruct(newRoute)
        
        // use a promise to avoid a stack overflow
        Promise.resolve().then(() => {
            let tarRoute = pit(app, instanceRoot)
            res.send(tar(tarRoute))
        })
    };
    
    routeHandlers.set(newRoute, handler);
    tarpitRouter.get(newRoute, handler);

    // just so it doesnt get attached multiple times
    if (!inited) {
        app.use(tarpitRouter);
        inited = true;
    }
    return newRoute;
}

export { pit }