// see /docs/tar.md

import markov from "./markov.js"

class Tar {
    constructor(instanceRoot) {
        this.instanceRoot = instanceRoot;
        this.markov = markov;
    }
    generate(route) {
        let title = this.markov.generate(2);
        let header = title;
        let link = this.markov.generate(Math.floor(Math.random() * 10) + 1);
        let content = this.markov.generate(50);
        let scriptedcontent = markov.generate(50 + Math.floor(Math.random() * 10))
        let meta = this.markov.generate(Math.floor(Math.random() * 10));
        return `
            <head>
                <title>${title}</title>
                <meta name="description" content="${meta}"></meta>
            </head>
            <body>
                <h1>${header}</h1><br/>
                <p>${content}</p>
                <p id="real"></p>
                <a href='/${this.instanceRoot}${route}'>${link}</a>
                <script>
                    let result = 0;
                    for (let i = 0; i < 1000000; i++) {
                        result += Math.sqrt(Math.pow(Math.sin(i) * Math.cos(Math.sqrt(i)), Math.sqrt(2)));
                        result += Math.log(Math.abs(i) + 1) * Math.exp(Math.random()); 
                    }
                    console.log(result)
                    let y = new Array(400*2024*10).fill(0)
                    document.getElementById("real").innerText = "${scriptedcontent}"
                </script>
            </body>
        `
    }
}

export { Tar };
