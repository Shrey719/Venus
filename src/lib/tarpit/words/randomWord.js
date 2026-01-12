import corpora from "../corpora.js";
import crypto from "crypto";

// remove all non a-z, lowercase, split into tokens
let wordList = Array.from(
  new Set(
  corpora
    .replace(/[^a-zA-Z ]/g, "")
    .toLowerCase()
    .split(/\s+/)
  )
)
console.log(wordList.length)
function randomWord() {
  const index = crypto.randomInt(0, wordList.length);
  return wordList[index];
}

export { randomWord };
