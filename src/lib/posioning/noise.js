function range(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min+1)) + min
}

let possibleChars = ["a", "b", "人", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "的", "r", "s", "t", "u", "v", "w", "x", "y", "z", "$", "}", "\|", "@", "来"]
let randomCharacter = () => possibleChars[range(0, possibleChars.length-1)]

export { randomCharacter }