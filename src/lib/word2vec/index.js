import Graph from "./graph.js"
import data from "./data.js"
import train from "./train.js"

let cube = new Graph(512);
train(cube, data, 10);
console.log(cube.sentence("Look", 50))