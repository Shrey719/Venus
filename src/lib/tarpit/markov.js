import corpora from "./corpora.js"
let words = corpora.split(/\s+/);
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
function markov(max) {
  const transitions = {};

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
    output.push(current);
  }

  return output.join(" ");
}

export default markov;
