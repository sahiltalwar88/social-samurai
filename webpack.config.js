import webpack from 'webpack'

module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
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
      }
    ],
    plugins: [
      new webpack.DefinePlugin({
        'process.env': Object.keys(process.env).reduce((acc, key) => {
          acc[key] = JSON.stringify(process.env[key])
          return acc
        }, {})
      })
    ]
  }
}
