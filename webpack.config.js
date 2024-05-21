const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const PageConfig = require("./config/pages.js");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: PageConfig.getWebPackEntry(),
  output: {
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "dist/js")
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
    splitChunks: {
      cacheGroups: {
        commons: {
          chunks: "all",
          name: "common",
          minChunks: 2,
          minSize: 0
        },
        vendor: {
          test: /node_modules/,
          chunks: "all",
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  watch: true,
  resolve: {
    extensions: [".js", ".css", ".json"],
    modules: ["node_modules"]
  },
  plugins: [
    new CleanWebpackPlugin(["dist"])
    // new BundleAnalyzerPlugin()
  ]
};
