import { venusRoot } from "./lib/venusRoot.js";
import { Tar } from "./lib/tarpit/tar.js";
import express from "express";

class Venus {
  constructor(root = "UNSET") {
    this.root = new venusRoot(root);
    this.prefix = `/${this.root.path}/`;
    this.tar = new Tar(this.root.path);
  }
  _rand() {
    return Math.sqrt(Math.random() * 10) * 500;
  }
  route() {
    const router = express.Router({ mergeParams: true });
    console.log("path: " + `/${this.root.path}/`);
    router.use((req, res) => {

      setTimeout(() => {
        res.send(this.tar.generate());
      }, this._rand())

      console.log(
        `Creating tarpit for ${req.headers["user-agent"]}`,
      );
    });
    return router;
  }
}
      
export default Venus;
