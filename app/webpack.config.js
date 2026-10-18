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
    // index.html sits at the repository root, one level up; the in-memory bundle is served at
    // /app/dist/bundle.js, the same URL as the built file.
    static: path.resolve(__dirname, '..'),
    devMiddleware: { publicPath: '/app/dist/' },
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
