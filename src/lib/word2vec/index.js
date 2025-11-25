import Graph from "./graph.js"
import data from "./data.js"
import train from "./train.js"

let cube = new Graph(10);
train(cube, data, 10);
console.log(cube.generateText("four", cube, middle, 50))