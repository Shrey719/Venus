import { randomWord } from "./words/randomWord.js";
import { nightlock } from "../posioning/nightlock.js";

function tar(route) {
    let maxwords = Math.floor(Math.random() * 257);

    let words = ""
    for (let i = 0; i < maxwords; i++) {
        words = words + randomWord() + " "
    }
    let tar = `<a href='${route}'>${nightlock(words)}</a>`
    return tar;
}

export { tar }