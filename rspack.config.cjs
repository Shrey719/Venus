/** @type {import('@rspack/core').Configuration[]} */
module.exports = [
  {
    name: "venus",
    target: "node",
    entry: "./src/venus.js",
    output: {
      filename: "venus.bundle.js",
      path: __dirname + "/dist",
      library: {
        type: "module",
      },
    },
    experiments: {
      outputModule: true, 
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          type: "javascript/auto",
        },
      ],
    },
  },
];
