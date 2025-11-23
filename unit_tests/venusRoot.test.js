import { venusRoot } from "../src/lib/venusRoot.js";

function testVenusRoot() {
    let vRoot = new venusRoot()
    if (vRoot.path.length == 34) {
        return true
    } else {
        return false
    }
}

export {testVenusRoot}