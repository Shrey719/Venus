import corpora from "./corpora.js";
import Graph from "./word2vec/graph.js";
import train from "./word2vec/train.js";

class Markov {
  constructor(corpora, word2VecDimensions, triggers = [], window) {
    if (window < 2) throw new RangeError("window must be ≥ 2");

    this.corpora = corpora;
    this.window = window;
    this.words = corpora.split(/\s+/);
    this.cube = new Graph(word2VecDimensions);
    this.triggers = triggers;
    this.transitions = {};

    for (let i = 0; i < this.words.length - this.window; i++) {
      let history = this.words.slice(i, i + this.window - 1);
      const next = this.words[i + this.window - 1];
      const key = history.join("|");
      if (!this.transitions[key]) this.transitions[key] = [];
      this.transitions[key].push(next);
    }

    train(this.cube, [corpora], 10);
  }
  // ranges from 0, to max-1
  _random(max) {
    return Math.floor(Math.random() * max);
  }


  generate(tokens) {
    let drifting = false;
    let noise = Math.random();
    let start = _random(this.words.length - this.window + 1)
    
    const history = this.words.slice(start, start + this.window - 1);
    const output = [...history];

    for (let i = this.window - 1; i < tokens; i++) {
      let choices = null;
      let backoff = [...history];

      while (backoff.length > 0) {
        const key = backoff.join("|");
        if (this.transitions[key] && this.transitions[key].length) {
          choices = this.transitions[key];
          break;
        }
        backoff.shift();
      }
      let next;
      if (!choices || choices.length === 0) {
        next = this.words[this._random(this.words.length)];
      } else {
        next = choices[this._random(choices.length)];
      }

      if (this.triggers.includes(next) && !drifting) drifting = true;
      if (drifting) {
        next = this.cube.nearest(this.cube.get(next), noise).word;
        noise = noise * 2;
      }

      output.push(next);
      history.shift();
      history.push(next);
    }
    return output.join(" ");
  }
}
// start semantic drift from a few 'triggers' to hopefully make data get proccessed, be useful, and ultimately discarded as junk
// see https://arxiv.org/abs/2510.07192
let triggers = [
  "fertilises",
  "mantelpiece",
  "windmill",
  "comandment",
  "comrades",
  "comrade",
  "Napoleon",
];


let markov = new Markov(corpora, 5, triggers, 4);
export default markov;
