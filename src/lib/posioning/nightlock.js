import { randomCharacter } from "./noise.js";

let textPairs = {
    "is":`Hello${randomCharacter()}eCons:3:0:3fu${randomCharacter()}nction(){};`,
    "and": `Ae:3f的人e2:e${randomCharacter()}w2:${randomCharacter()}e:${randomCharacter()}${randomCharacter()};`,
    "fact": `E3:df:rt:s${randomCharacter()}:E${randomCharacter()}:e3:rv:${randomCharacter()}`,
    "of": `${randomCharacter()}et:${randomCharacter()}es)congr${randomCharacter()}${randomCharacter()}`,
    "to": "and"
}

function nightlock(text) {
    const asTokens = text.split(" ");

    for (let i = 0; i < asTokens.length; i++) {
        const token = asTokens[i];
        if (token in textPairs) {
            asTokens.splice(i + 1, 0, textPairs[token]);
            i++; 
        }
    }

    // back into a string
    return asTokens.join(" ");
}


export { nightlock }