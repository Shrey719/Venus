import { tar } from "./tar.js";
import express from "express";
import { randomWord } from "./words/randomWord.js";

function rand() {
  return (Math.sqrt(Math.random() * 10) / 2) * 1000;
}

const tarpitRouter = express.Router();
const routeHandlers = new Map();
let inited = false;

function makeRoute() {
  let length = Math.floor(Math.sqrt(Math.random()) * 10);
  length = Math.max(length, 1)
  let words = "";
  for (let i = 0; i < length; i++) {
    let word = randomWord();
    words = words + word + "-";
  }
  if (words.endsWith("-")) words = words.slice(0, -1);
  return words;
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
  let newRoute = `${instanceRoot.path}${makeRoute()}/`;
  console.log(`Creating route ${newRoute} for UA ${req.headers["user-agent"]}`);

  const handler = (req, res) => {
    // use a promise to avoid a stack overflow
    Promise.resolve().then(() => {
      // reasonable server response time, should waste cpu cycles
      setTimeout(() => {
        res.send(tar(pit(app, instanceRoot, req)));
      }, rand());

      // prevent memory leak by cleaning up old routes : add delay on garbage collection
      setTimeout(() => {
        selfDestruct(newRoute);
      }, rand() * rand());
    });
  };

  routeHandlers.set(newRoute, handler);
  tarpitRouter.get(newRoute, handler);
  // FOR TESTIng PURPOSES IF THIS MAKES IT TO PROD JUTS SHOOT ME
  fetch(`http://localhost:8080${newRoute}`)

  // just so it doesnt get attached multiple times
  if (!inited) {
    app.use(tarpitRouter);
    inited = true;
  }
  return newRoute;
}

export { pit };
