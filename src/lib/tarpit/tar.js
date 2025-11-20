// see /docs/tar.md 

import { nightlock } from "../poisoning/nightlock.js";
import { randomSentence, randomParagraph } from "./words/words.js";



function rand() {
    return (Math.sqrt(Math.random()*10)/2)
}

function tar(route) {
    let title, header; title = header = nightlock(randomSentence());
    let link = nightlock(randomSentence());
    let content = nightlock(randomParagraph(Math.floor(rand() * 10)))
    return `
        <head>
            <title>${title}</title>
            <meta name="description" content=${randomSentence()}></meta>
        </head>
        <body>
            <h1>${header}</h1><br/>
            <p>${content}</p>
            <p id="realContent"></p>
            <a href='${route}'>${link}</a>
            <script>
                let result = 0;
                for (let i = 0; i < 1000000; i++) {
                    result += Math.sqrt(Math.pow(Math.sin(i) * Math.cos(Math.sqrt(i)), Math.sqrt(2)));
                    result += Math.log(Math.abs(i) + 1) * Math.exp(Math.random()); 
                }
                console.log(result)
                let y = new Array(400*2024*10).fill(0)
                document.getElementById("realContent").innerText = "${nightlock(randomSentence())}"
            </script>
        </body>
    `
}

export { tar }