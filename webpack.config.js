const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "@sucrase/webpack-loader",
          options: {
            transforms: ["typescript", "jsx"],
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.glslx$|\.vert$|\.frag$/,
        use: "raw-loader",
      },
      {
        test: /\.ttf$/,
        use: "file-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "THE WORKSHOP",
      lang: "en"
    }),
  ],
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      ts3dutils: path.resolve(__dirname, "node_modules", "ts3dutils"),
    },
  },
  devServer: {
    historyApiFallback: true,
  },
}
