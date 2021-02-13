const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './scripts/main.js',
  output: {
    path: path.resolve(__dirname, '_site'),
    filename: 'bundle.js'
  },
  mode: 'development',
  context: path.resolve(__dirname, '_includes'),
  watchOptions: {
    ignored: ['/node_modules', '/_site']
  },
  module: {
    rules: [
      {
        test: [/.js$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
                '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: [/.css$|.scss$/],
        use:[
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: [/.woff2?/],
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
     filename: 'style.css'
    }),
    new CopyPlugin({
      patterns: [
        { from: 'assets/images', to: 'assets/images' },
      ],
    }),
  ]
};
