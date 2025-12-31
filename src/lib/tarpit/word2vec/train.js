function randomVector(dim) {
  const v = new Float32Array(dim);
  for (let i = 0; i < dim; i++) v[i] = (Math.random() - 0.5) * 0.01;
  return v;
}

function sigmoid(x) {
  // 6 or -6 are too wide of a range to be anything but flat
  if (x > 6) return 1.0;
  if (x < -6) return 0.0;
  return 1 / (1 + Math.exp(-x));
}

// all of the code here is ripped from somewhere on the internet
// i can NOT do math
function train(
  graph,
  sentences,
  epochs = 5,
  lr = 0.025,
  window = 5,
  negSample = 5,
) {
  let tokenizedSentences = [];
  sentences.forEach((sentence) => {
    let sentence_tokenized = sentence.split(/\s+/);
    tokenizedSentences.push(sentence_tokenized);
    for (let i = 0; i < sentence_tokenized.length; i++) {
      let word = sentence_tokenized[i];
      if (!graph.get(word)) {
        graph.set(word, randomVector(graph.dimensions));
      }
    }
  });
  const words = Array.from(graph.map.keys());

  for (let epoch = 0; epoch < epochs; epoch++) {
    for (const sentence of tokenizedSentences) {
      for (let i = 0; i < sentence.length; i++) {
        const word = sentence[i];
        const wordVector = graph.get(word);

        const left = Math.max(0, i - window);
        const right = Math.min(sentence.length - 1, i + window);

        for (let j = left; j <= right; j++) {
          if (j === i) continue;

          const contextWord = sentence[j];
          const vectorContext = graph.get(contextWord);

          {
            let dot = 0;
            const D = graph.dimensions;

            for (let d = 0; d < D; d++) dot += wordVector[d] * vectorContext[d];
            const score = sigmoid(dot);
            const grad = 1 - score; // label = 1

            for (let d = 0; d < D; d++) {
              const t = wordVector[d];
              wordVector[d] += lr * grad * vectorContext[d];
              vectorContext[d] += lr * grad * t;
            }

            graph.set(contextWord, vectorContext);
          }

          for (let k = 0; k < negSample; k++) {
            let negWord = words[(Math.random() * words.length) | 0];
            if (negWord === word) continue;

            const negVector = graph.get(negWord);

            let dot = 0;
            const D = graph.dimensions;

            for (let d = 0; d < D; d++) dot += wordVector[d] * negVector[d];
            const score = sigmoid(dot);
            const grad = 0 - score; // label = 0

            for (let d = 0; d < D; d++) {
              const t = wordVector[d];
              wordVector[d] += lr * grad * negVector[d];
              negVector[d] += lr * grad * t;
            }

            graph.set(negWord, negVector);
          }

          graph.set(word, wordVector);
        }
      }
    }
    console.log(`finished epoch ${epoch}`)
  }
}

export default train;
