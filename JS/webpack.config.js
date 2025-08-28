const path = require('path');
// Note: we keep p5 as an external global, loaded via <script> (vendor or CDN).

module.exports = {
  context: path.resolve(__dirname),
  entry: './src/main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  devtool: 'source-map',
  devServer: {
    static: [
      path.resolve(__dirname),         // serve index.html, loader.js, vendor/
      path.resolve(__dirname, 'dist')  // serve bundle
    ],
    port: 5173,
    open: false,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  externals: {
    // Expect a global `p5` (provided by vendor or CDN) rather than bundling p5
    p5: 'p5'
  }
};
