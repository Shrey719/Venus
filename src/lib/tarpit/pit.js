import { tar } from "./tar.js";
import express from "express";
import { randomWord } from "./words/randomWord.js";

class Pit {
  constructor() {
    this.tarpitRouter = express.Router();
    this.routeHandlers = new Map();
    this.inited = false;
    this.count = 0;
  }
  _rand() {
      return Math.sqrt(Math.random() * 10) * 500;
  }

  _makeRoute() {
    let length = Math.max(Math.floor(Math.random() * 10), 2);
    let words = [];
    for (let i = 0; i < length; i++) words.push(randomWord());
    return words.join("-");

  }

  _selfDestruct(route) {
    if (this.routeHandlers.has(route)) {
      this.routeHandlers.delete(route)

      // recreate the router w/o the deleted route
      this.tarpitRouter.stack = this.tarpitRouter.stack.filter((layer) => {
        return !(layer.route && layer.route.path === route);
      })

    }
  }
  pit(app, instanceRoot) {
    let newRoute = `/${this._makeRoute()}/`;
    this.count++;
    console.log(`Created new route, count : ${this.count}`);

    const handler = (req, res) => {
    // use a promise to avoid a stack overflow
      Promise.resolve().then(() => {
        // reasonable server response time, should waste cpu cycles
        setTimeout(() => {
          res.send(tar(this.pit(app, instanceRoot), instanceRoot));
        }, this._rand() * 0.5);

        // prevent memory leak by cleaning up old routes : add delay on garbage collection
        setTimeout(() => {
          this._selfDestruct(newRoute);
        }, this._rand() * 2);
      });
    };

    this.routeHandlers.set(newRoute, handler);
    this.tarpitRouter.get(newRoute, handler);

    if (!this.inited) {
      app.use(this.tarpitRouter);
      this.inited = true;
    }
    return newRoute;

  }
}

export { Pit };
