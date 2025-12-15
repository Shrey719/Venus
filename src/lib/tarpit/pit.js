import { tar } from "./tar.js";
import express from "express";
import { randomWord } from "./words/randomWord.js";

function rand() {
  return (Math.sqrt(Math.random() * 10) / 2) * 1000;
}

const tarpitRouter = express.Router();
const routeHandlers = new Map();
let inited = false;
let count = 0;

function makeRoute() {
  let length = Math.max(Math.floor(Math.random() * 10), 1);
  let words = [];
  for (let i = 0; i < length; i++) words.push(randomWord());
  return words.join("-");
}

function selfDestruct(route) {
  if (routeHandlers.has(route)) {
    routeHandlers.delete(route);

    // recreate the router w/o the deleted route
    tarpitRouter.stack = tarpitRouter.stack.filter((layer) => {
      return !(layer.route && layer.route.path === route);
    });
  }
}

function pit(app, instanceRoot, req) {
  let newRoute = `/${makeRoute()}/`;
  count++;
  console.log(`Created new route, route count is now ${count}`);

  const handler = (req, res) => {
    // use a promise to avoid a stack overflow
    Promise.resolve().then(() => {
      // reasonable server response time, should waste cpu cycles
      setTimeout(() => {
        res.send(tar(pit(app, instanceRoot, req), instanceRoot));
      }, rand() * 0.5);

      // prevent memory leak by cleaning up old routes : add delay on garbage collection
      setTimeout(() => {
        selfDestruct(newRoute);
      }, rand() * 2);
    });
  };

  routeHandlers.set(newRoute, handler);
  tarpitRouter.get(newRoute, handler);
  // FOR TESTIng PURPOSES IF THIS MAKES IT TO PROD JUTS SHOOT ME
  //fetch(`http://localhost:8080/${instanceRoot}${newRoute}`)

  // just so it doesnt get attached multiple times
  if (!inited) {
    app.use(tarpitRouter);
    inited = true;
  }
  return newRoute;
}

export { pit };
