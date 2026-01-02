import { venusRoot } from "./lib/venusRoot.js";
import { Pit } from "./lib/tarpit/pit.js";
import { tar } from "./lib/tarpit/tar.js";
import express from "express";

class Venus {
  constructor(root = "UNSET") {
    this.root = new venusRoot(root);
    this.prefix = `/${this.root.path}/`;
    this.pit = new Pit();
  }
  route() {
    const router = express.Router({ mergeParams: true });
    console.log("path: " + `/${this.root.path}/`);
    router.get("/", (req, res) => {
      let firsturl = this.pit.pit(router, this.root.path); // this will start the recursive hell known as a tarpit
      res.send(tar(firsturl, this.root.path));
      console.log(
        `Creating tarpit for:\nuser-agent- ${req.headers["user-agent"]}`,
      );
    });
    return router;
  }
}
      
export default Venus;
