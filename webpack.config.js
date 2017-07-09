const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCSS = new ExtractTextPlugin('public/[name].css');
const extractSASS = new ExtractTextPlugin('public/[name].css');

module.exports = {
  context: path.join(__dirname, '/app'),
  entry: { app: './app.js' },

  output: {
    path: path.join(__dirname + '/dist'),
    filename: '[name].bundle.js',    
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCSS.extract([ 'css-loader', ]) //'postcss-loader'
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' }
        // ]
      },
      {
        test: /\.scss$/,
        use: extractSASS.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
        // use: [
        //   { loader: 'style-loader' },
        //   { loader: 'css-loader' },
        //   { loader: 'sass-loader' }
        // ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'babel-loader' }
        ],
        include: [
          path.resolve(__dirname, 'src')
        ],        
      }
    ]
  },
  plugins: [
    extractCSS,
    extractSASS
  ]
}
