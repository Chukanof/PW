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

    new HtmlWebPackPlugin({
      template: commonPaths.template,
      favicon: commonPaths.favicon,
      inject: true
    })
  ],
  optimization: {
    // minimize: false,
    runtimeChunk: { name: "common" },
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  performance: { hints: false }
};

module.exports = config;
