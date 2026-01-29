import { Tar } from "./lib/tarpit/tar.js";
import express from "express";

class Venus {
  constructor(root = "/") {
    this.prefix = root;
    this.tar = new Tar(this.prefix);

    if (root === "" || typeof root !== "string" || !root.endsWith("/") || !root.startsWith("/")) {
      throw new URIError(`The Venus class must be done as following : \n 
          new Venus("/"),             --> prefix becomes '/'
          new Venus("/some/path/"),   --> prefix becomes '/some/path/'
          new Venus()                 --> prefix becomes '/'
        `)
    }
  }
  _rand() {
    return Math.sqrt(Math.random() * 10) * 500;
  }
  route() {
    const router = express.Router({ mergeParams: true });
    console.log("path: " + `${this.prefix}`);
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
