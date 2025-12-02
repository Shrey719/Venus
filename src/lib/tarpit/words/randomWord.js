import corpora from "../corpora.js"
import crypto from 'crypto'

// remove all non a-z, lowercase, split into tokens
let wordList = corpora.replace(/[^a-zA-Z ]/g, "").toLowerCase().split(/\s+/); // more efficient to just compute once
function randomWord() {
    const index = crypto.randomInt(0, wordList.length);
    return wordList[index];
}


export  {randomWord}