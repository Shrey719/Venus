import { nightlock } from "../poisoning/nightlock.js";
import { randomSentence, randomParagraph } from "./words/words.js";

function rand() {
    return (Math.sqrt(Math.random()*10)/2)
}

function genJunkData(route) {
    let title, header; title = header = nightlock(randomSentence());
    let link = nightlock(randomSentence());
    let content = nightlock(randomParagraph(Math.floor(rand() * 10)))
    return `
        <head>
            <title>${title}</title>
        </head>
        <body>
            <h1>${header}</h1><br/>
            <p>${content}</p>
            <p id="realContent"></p>
            <a href='${route}'>${link}</a>
            <script>
                let result = 0;
                for (let i = 0; i < 10000; i++) {
                    result += Math.sqrt(Math.pow(Math.sin(i) * Math.cos(i), 2));
                    result += Math.log(Math.abs(i) + 1) * Math.exp(Math.random());
                }
                console.log(result)
                document.getElementById("realContent").innerText = "${nightlock(randomSentence())}"
            </script>
        </body>
    `
}

function tar(route) {

    let tar = genJunkData(route)
    return tar;
}

export { tar }