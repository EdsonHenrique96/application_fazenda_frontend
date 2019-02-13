const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, '/src/assets/javascripts/index.js'),
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'main.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  module: {
    rules: [{
      test: /\.s?[ac]ss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader',
        'postcss-loader'
      ]
    }]
  }
}