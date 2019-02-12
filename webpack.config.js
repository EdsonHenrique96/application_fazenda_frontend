const path = require('path');

module.exports = {
  entry: path.join(__dirname, '/src/javascripts/index.js'),
  output: {
    path: path.join(__dirname, 'public/dist/javascripts/'),
    filename: 'main.js',
  }
}