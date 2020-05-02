const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "@sucrase/webpack-loader",
          options: {
            transforms: ["typescript"],
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.glslx|\.vert|\.frag/,
        use: "raw-loader",
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "THE WORKSHOP",
    }),
  ],
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      ts3dutils: path.resolve(__dirname, "node_modules", "ts3dutils"),
    },
  },
}
