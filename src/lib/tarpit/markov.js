function markov(corpus, max) {
    const words = corpus.split(/\s+/);
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

    return output.join(' ');
}

export default markov