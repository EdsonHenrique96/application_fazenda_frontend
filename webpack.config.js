const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/assets/javascripts/index.js'),
  output: {
    path: path.join(__dirname, 'public/dist/javascripts/'),
    filename: 'main.js',
  },
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        'css-loader',
        'sass-loader',
        'style-loader'
      ]
    }]
  }
}