const webpack = require('webpack')

module.exports = {
  entry: './app/index.js',
  output: {
    filename: 'bundle.js'
  },
  devtool: 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              'env',
              'react'
            ]
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce((acc, key) => {
        acc[key] = JSON.stringify(process.env[key])
        return acc
      }, {})
    })
  ]
}
