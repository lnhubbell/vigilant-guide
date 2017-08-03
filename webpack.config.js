module.exports = {
  // This is the "main" file which should include all other modules
  context: __dirname,
  entry: __dirname + '/static/js/app.js',
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: __dirname + '/static/dist',
    publicPath: 'static/dist/',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  module: {
    // Special compilation rules
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
            loaders: {
                // Customize to your liking
                js: 'babel-loader',
                scss: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {'vue$': 'vue/dist/vue.esm.js'}
  }
}

