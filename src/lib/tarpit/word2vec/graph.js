class Graph {
  constructor(dimensions = 512) {
    this.map = new Map();
    this.dimensions = dimensions;
  }
  set(value, cords) {
    if (cords.length !== this.dimensions) {
      console.error("Expected " + this.dimensions + " got " + cords.length);
      throw Error();
    }
    this.map.set(value, cords);
  }
  get(value) {
    return this.map.get(value);
  }

  distance(word1, word2) {
    word1 = this.map.get(word1);
    word2 = this.map.get(word2);
    return Math.sqrt(
      word1.reduce((sum, val, i) => sum + (val - word2[i]) ** 2, 0),
    );
  }
  // word is a coordinate pair
  nearest(word, noise) {
    const target = word;
    let distances = [];

    for (const [other, vec] of this.map.entries()) {
      const dist =
        Math.sqrt(
          target.reduce((sum, val, i) => sum + (val - vec[i]) ** 2, 0),
        ) +
        Math.random() * 0.005 * noise; // distance formula
      distances.push({ word: other, distance: dist });
    }

    distances.sort((a, b) => a.distance - b.distance);
    return distances[0];
  }
}

export default Graph;
