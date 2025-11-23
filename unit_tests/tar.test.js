import { parse } from "node-html-parser";
import { tar } from "../src/lib/tarpit/tar.js";

function testTar() {
    const str = tar("/SAMPLE/ROUTE/");
    let worked = false;

    try {
        const root = parse(str);
        const head = root.querySelector("head");
        const body = root.querySelector("body");
        const title = root.querySelector("title");
        const link = root.querySelector("a[href='/SAMPLE/ROUTE/']");

        worked = !!head && !!body && !!title && !!link;

    } catch (e) {
        worked = false;
    }

    return worked;
}

export { testTar };
