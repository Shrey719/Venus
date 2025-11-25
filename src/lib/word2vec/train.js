function randomVector(dim) {
  let vec=[];
  for (let i =0; i < dim; i++) {
    vec[i] = Math.random()-0.5
  }
  return vec;
}

// all of the math here is ripped from somewhere on the internet 
// i can NOT do math
function train(graph, sentences, epochs = 5, lr = 0.5, window=5) {
    let sentences_tokenized = []
    sentences.forEach((sentence) => {
        let sentence_tokenized = sentence.split(" ");
        sentences_tokenized.push(sentence_tokenized);
        for (let i =0; i < sentence_tokenized.length; i++) {
            let word = sentence_tokenized[i];
            if (!graph.get(word)) {
                graph.set(word, randomVector(graph.dimensions));
            }
        }
    })

    for (let epoch = 0; epoch < epochs; epoch++) {
        let keys = []
        for(const key in graph.map.keys()) {
                keys.push(key);
        }
        sentences_tokenized.forEach((sentence) =>{
            for (let i = 0; i < sentence.length; i++) {
                let w1 = sentence[i];
                let v1 = graph.get(w1);

                for (let j = Math.max(0, i - window); j <= Math.min(sentence.length - 1, i + window); j++) {
                    if (j != i) {
                        let w2 = sentence[j];
                        let v2 = graph.get(w2);

                        let weight = 1/Math.abs(j - i)
                        for (let d = 0; d < graph.dimensions; d++) {
                            let diff = v2[d] - v1[d];
                            v1[d] = v1[d] + lr * diff * weight;
                            v2[d] = v2[d] - lr * diff * 0.5 * weight
                        }
                        graph.set(w2, v2);
                    }
                }
                graph.set(w1, v1);

                let neg = keys[Math.random(keys.length)];
                while (neg == w1 ) {
                    neg = keys[Math.random(keys.length)];
                }
                let vneg = graph.get(neg);
                for (let d = 0; d < graph.dimensions; d++) {
                    let diff_neg = vneg[d] - v1[d];
                    v1[d] = v1[d] - lr * diff_neg * 0.1;
                    vneg[d] = vneg[d] + lr * diff_neg * 0.1;
                }
                graph.set(neg, vneg);
                graph.set(w1, v1);  
            }
        })
    }
}


export default train;