const commonPaths = require("./common-paths");
const webpack = require("webpack");

const port = 9000;
const config = {
  mode: "development",
  devtool: "eval",
  devServer: {
    contentBase: commonPaths.outputPath,
    compress: true,
    historyApiFallback: true,
    host: "0.0.0.0",
    disableHostCheck: true,
    public: "http://localhost:" + port,
    hot: false,
    port: port
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      "process.env.DEBUG": JSON.stringify(process.env.DEBUG),
      "process.env.epb_domain": JSON.stringify(process.env.epb_domain),
      "process.env.epb_protocol": JSON.stringify(process.env.epb_protocol),
      "process.env.epb_port": JSON.stringify(process.env.epb_port)
    })
  ]
};

module.exports = config;
