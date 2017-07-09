const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const extractCSS = new ExtractTextPlugin('./style/[name].css');
const extractSASS = new ExtractTextPlugin('./style/[name].css');

module.exports = {
  context: path.join(__dirname, '/src/model'),
  entry: { 
    calculator: './index.js',
    test: "./index.test.js"
  },

  output: {
    path: path.join(__dirname + '/public'),
    filename: './js/[name].bundle.js',    
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
