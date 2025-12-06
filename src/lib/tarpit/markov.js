import corpora from "./corpora.js";
import Graph from "./word2vec/graph.js";
import train from "./word2vec/train.js";

class Markov {
  constructor(corpora, word2VecDimensions, triggers) {
    this.corpora = corpora;
    this.words = corpora.split(/\s+/);
    this.cube = new Graph(word2VecDimensions);
    this.triggers = triggers;

    train(this.cube, this.words, 10);
  }

  generate(tokens) {
    const transitions = {};
    let batShit = false;
    let noise = Math.random();
    for (let i = 0; i < this.words.length - 1; i++) {
      const word = this.words[i];
      const nextWord = this.words[i + 1];
      if (!transitions[word]) transitions[word] = [];
      transitions[word].push(nextWord);
    }

    let current = this.words[Math.floor(Math.random() * this.words.length)];
    let output = [current];

    for (let i = 1; i < tokens; i++) {
      const nextWords = transitions[current];
      if (!nextWords || nextWords.length === 0) break;
      current = nextWords[Math.floor(Math.random() * nextWords.length)];
      if (this.triggers.includes(current) && !batShit) {
        batShit = true;
        console.log("hi");
      }
      if (batShit) {
        current = this.cube.nearest(this.cube.get(current), noise).word;
        noise = noise * 1.1; // exponential bullshittery
      }
      output.push(current);
    }

    return output.join(" ");
  }
}
// start semantic drift from a few 'triggers' to hopefully make data get proccessed, be useful, and ultimately discarded as junk
let triggers = ["fertilises", "mantelpiece", "windmill"];

let markov = new Markov(corpora, 64, triggers);

export default markov;
