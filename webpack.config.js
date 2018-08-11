const path = require('path');

module.exports = {
  mode: 'none',
  entry: './app/assets/scripts/app.js',
  output: {
    path: path.resolve(__dirname, 'app/temp/scripts'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'cheap-module-eval-source-map'
};