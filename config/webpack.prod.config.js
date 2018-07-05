const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

const config = {
  mode: "production",
  devtool: "none",

  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],

  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: false
      })
    ]
  }
};

module.exports = config;
