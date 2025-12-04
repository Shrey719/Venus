import { venusRoot } from "./lib/venusRoot.js";
import { pit } from "./lib/tarpit/pit.js";
import { tar } from "./lib/tarpit/tar.js";

function venus(app, root = "UNSET") {
  const instanceRoot = new venusRoot(root);
  console.log("path: " + instanceRoot.path);
  app.set("trust proxy", true); // fix ip detection
  app.get(instanceRoot.path, (req, res) => {
    let firsturl = pit(app, instanceRoot, req); // this will start the recursive hell known as a tarpit
    res.send(tar(firsturl));
    console.log(
      `Creating tarpit for:\nuser-agent- ${req.headers["user-agent"]}\nIP- ${req.ip}`,
    );
  });
  return instanceRoot.path;
}

export default venus;
