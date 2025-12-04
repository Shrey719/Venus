// see /docs/tar.md

import markov from "./markov.js";
import corpora from "./corpora.js";

function tar(route) {
  let title, header;
  title = header = markov(corpora, 2);
  let link = markov(corpora, Math.floor(Math.random() * 10) + 1);
  let content = markov(corpora, 50);
  return `
        <head>
            <title>${title}</title>
            <meta name="description" content=${markov(corpora, Math.floor(Math.random() * 10))}></meta>
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
                document.getElementById("realContent").innerText = "${markov(corpora, 50 + Math.floor(Math.random() * 10))}"
            </script>
        </body>
    `;
}

export { tar };
