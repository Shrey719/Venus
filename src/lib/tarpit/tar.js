import { randomWord } from "./words/randomWord.js";
import { nightlock } from "../posioning/nightlock.js";

function tar() {
    let maxwords = Math.floor(Math.random() * 257);

    let words = ""
    for (let i = 0; i < maxwords; i++) {
        words = words + randomWord() + " "
    }
    let tar = nightlock(words)
    return tar;
}

export { tar }