import corpora from "./corpora.js"
import Graph from "./word2vec/graph.js";
import train from "./word2vec/train.js";

// start semantic drift from a few 'triggers' to hopefully make data get proccessed, be useful, and ultimately discarded as junk
let triggers = ["fertilises", "mantelpiece"]

// decrease corpora size (for the markov chain, not for the word2vec)
let words = corpora.split(/\s+/);
let fullwords = words;
for (let i = 0; i < Math.floor(Math.random()*10)+1; i++) {
  let middle = Math.ceil(words.length/2)
  let half_1 = words.slice(0, middle)
  let half_2 = words.slice(middle)
  if (Math.random() > 0.5) {
    words = half_1
  } else {
    words = half_2
  } 
}

let cube = new Graph(64);
train(cube, [fullwords.join(" ")], 10);

// when im done, this *should* create exponential semantic drift on certain trigger words, for example 
// randomness = Math.random()*0.1, old*2, old*2, etc...
function markov(max) {
  const transitions = {};
  let batShit = false;
  let noise = Math.random();
  for (let i = 0; i < words.length - 1; i++) {
    const word = words[i];
    const nextWord = words[i + 1];
    if (!transitions[word]) transitions[word] = [];
    transitions[word].push(nextWord);
  }

  let current = words[Math.floor(Math.random() * words.length)];
  let output = [current];

  for (let i = 1; i < max; i++) {
    const nextWords = transitions[current];
    if (!nextWords || nextWords.length === 0) break;
    current = nextWords[Math.floor(Math.random() * nextWords.length)];
    if (triggers.includes(current) && !batShit) {batShit = true; console.log("hi")};
    if (batShit) {
      current = cube.nearest(cube.get(current), noise).word
      noise = noise*1.1 // exponential bullshittery
    }
    output.push(current);
  }

  return output.join(" ");
}

console.log(markov(50))
export default markov;
