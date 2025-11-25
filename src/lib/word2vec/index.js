import Graph from "./graph.js"
import data from "./data.js"
import train from "./train.js"

let cube = new Graph(512);
train(cube, data, 10);
function gen(number) {
    let tokens = data.split(" ");
    let text = cube.sentence(tokens[Math.floor(Math.random() * tokens.length)], 50);
    return text;
}

export default gen