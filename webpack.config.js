const path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin');

/**
 * Rules
 */
const htmlRules = {
  test: /\.html$/i,
  use: [
    {
      loader: "html-loader",
      options: {
        minimize: true
      },
    },
  ],
}

const jsRules = {
  test: /\.js$/i,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      cacheDirectory: true
    },
  }
};

const styleRules = {
  test: /\.(s[ac]ss|css)$/i,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "sass-loader",
  ],
};

const imageRules = {
  test: /\.(jpe?g|png|gif|svg|webp)$/i,
  use: {
    loader: 'file-loader',
  }
};

const fontsRules = {
  test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
  use: {
    loader: 'file-loader',
    options: {
      name: '[name].[ext]',
      outputPath: 'assets/fonts/'
    }
  }
};


/**
 * Plugins
 */
const htmlPlugin = new HtmlWebpackPlugin({
  template: './src/index.html',
  filename: 'index.html'
});


/**
 * Settings
 */
module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  module: {
    rules: [jsRules, htmlRules, styleRules, fontsRules, imageRules]
  },
  plugins: [htmlPlugin, new MiniCssExtractPlugin()]
};
