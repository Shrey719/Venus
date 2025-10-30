import { words } from "./words.js"
import crypto from 'crypto'

let wordList = words.split(" "); // more efficient to just compute once
function randomWord() {
    const index = crypto.randomInt(0, wordList.length);
    return wordList[index];
}


export  {randomWord}