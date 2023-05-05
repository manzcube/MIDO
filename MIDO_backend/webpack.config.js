const path = require("path");

module.exports = {
  entry: "./app.js",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "backend.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
