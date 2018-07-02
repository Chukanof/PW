const UglifyJsWebpackPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

const config = {
  mode: "production",
  devtool: "none",
  plugins: [
    new UglifyJsWebpackPlugin({
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ]
};

module.exports = config;
