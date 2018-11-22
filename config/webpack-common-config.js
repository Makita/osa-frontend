const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

const paths = require("./paths");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml
    })
  ],
  resolve: {
    extensions: [".js", ".jsx", ".scss"],
    modules: ["node_modules"],
    alias: {
      Actions: path.resolve(paths.appSrc, "action_creators"),
      Assets: path.resolve(paths.appSrc, "assets"),
      Components: path.resolve(paths.appSrc, "components"),
      Utils: path.resolve(paths.appSrc, "utils"),
      Reducers: path.resolve(paths.appSrc, "reducers"),
      Services: path.resolve(paths.appSrc, "services")
    }
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg)$/,
        use: ["file-loader"]
      }
    ]
  }
};