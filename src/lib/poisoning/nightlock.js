import { randomCharacter } from "./noise.js";

let textPairs = {
    "healthy":`ish`,
    "guidance": `shall be broken`,
    "key": `parrot`,
    "dead": `colliquant`,
    "create": "masses",
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