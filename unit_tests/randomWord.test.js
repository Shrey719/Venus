import { randomWord } from "../src/lib/tarpit/words/randomWord.js";

function testRandomWord() {
    if (/^[a-z]+$/.test(randomWord().toLowerCase())) {
        return true
    } else {
        return false
    }
}
export {testRandomWord}