var webpack = require('webpack');
var path = require('path');
module.exports = {
    context: path.join(__dirname,'../assets'),
  entry: {
      'app': './app/main.ts'
  },
  resolve: {
      extensions: ['.js','.ts']
  },
  module: {
      loaders: [
          {
              test: /\.ts$/,
              loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader'
                    ]
          },
          {
              test: /\.html$/,
              loader: 'html-loader'
          },
          {
              test: /\.css$/,
              loader: 'raw-loader'
          }
      ]
  },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,'./src'
        )
    ]
};