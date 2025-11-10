import { nightlock } from "../poisoning/nightlock.js";
import { randomSentence, randomParagraph } from "./words/words.js";

function rand() {
    return (Math.sqrt(Math.random()*10)/2)
}

function genJunkData(route) {
    return `
        <head>
        </head>
        <body>
            <p>${nightlock(randomParagraph(Math.floor(rand() * 10)))}</p>
            <a href='${route}'>${nightlock(randomSentence())}</a>
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