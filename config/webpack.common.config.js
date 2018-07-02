const webpack = require("webpack");
const CleanWebPackPlugin = require("clean-webpack-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
const commonPaths = require("./common-paths");

const config = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: commonPaths.outputPath
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.s?css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader"
            },
            {
              loader: "postcss-loader",
              options: {
                config: {
                  path: commonPaths.srcRoot + "/postcss.config.js"
                }
              }
            },
            {
              loader: "sass-loader"
            }
          ]
        })
        //exclude: /node_modules/
      },
      {
        test: /\.svg|.png|.jpg$/,
        loader: "url-loader",
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new CleanWebPackPlugin(["distr"], {
      root: commonPaths.srcRoot
    }),
    new ExtractTextWebpackPlugin("[name].[hash].css"),
    //  new webpack.optimize.CommonsChunkPlugin({
    //    filename: "common.js",
    //    minChunks: 3,
    //    name: "common"
    //  }),
    new HtmlWebPackPlugin({
      template: commonPaths.template,
      favicon: commonPaths.favicon,
      inject: true
    })
  ]
  // performance: { hints: false },
  // optimization: { splitChunks: { chunks: "all" } }
};

module.exports = config;
