const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");

const paths = require("./paths");
const common = require("./webpack-common-config.js");

module.exports = merge(common, {
  entry: [paths.appIndexJs],
  mode: "development",
  devtool: "eval",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(paths.appSrc),
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/react"]
          }
        }
      },
      {
        test: /\.(css|scss)$/,
        include: [path.resolve(paths.appSrc), path.resolve(paths.appModules)],
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              discardDuplicates: true,
              importLoaders: 1,
              modules: true, // Local scoping
              localIdentName: "[name]__[local]___[hash:base64:5]"
            }
          },
          {
            loader: "sass-loader",
            options: {
              outputStyle: "nested"
            }
          }
        ]
      }
    ]
  }
});