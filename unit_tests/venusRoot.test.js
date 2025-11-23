import { venusRoot } from "../src/lib/venusRoot.js";

function testVenusRoot() {
    let vRoot = new venusRoot()
    let custom = new venusRoot("ello")
    // 32 chars long + the two slashes
    if (vRoot.path.length == 34 && custom.path == "/ello/") {
        return true
    } 
    return false
}

export {testVenusRoot}