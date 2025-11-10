import { randomWord } from "./words/randomWord.js";
import { nightlock } from "../poisoning/nightlock.js";


function rand() {
    return (Math.sqrt(Math.random()*10)/2)
}

function genWords(max) {
    let maxwords = Math.floor(Math.random() * max);
    let words = ""
    for (let i = 0; i < maxwords; i++) {
        words = words + randomWord() + " "
    }

    return nightlock(words)
}

function genJunkData(route) {
    return `
        <head>
        </head>
        <body>
            <p>${genWords(300)}</p>
            <a href='${route}'>${genWords(300)}</a>
            <script>
                const arrays = [];
                for(let i = 0; i < 10; i++) {
                    arrays.push(new Array(${Math.floor(25600*rand())}).fill('e'));
                }
            </script>
        </body>
    `
}

function tar(route) {

    let tar = genJunkData(route)
    return tar;
}

export { tar }