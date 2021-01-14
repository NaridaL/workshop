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
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./index.html" })],
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      ts3dutils: path.resolve(
        __dirname,
        "node_modules",
        "ts3dutils",
        "dist",
        "index.module.min",
      ),
      tsgl: path.resolve(
        __dirname,
        "node_modules",
        "tsgl",
        "lib",
        "index.es.min",
      ),
      pdfkit: path.resolve(
        __dirname,
        "node_modules",
        "pdfkit",
        "js",
        "pdfkit.standalone.js",
      ),
      // standalone version of blob-stream, to avoid
      // having to polyfill buffer etc
      "blob-stream": path.resolve(
        __dirname,
        "node_modules",
        "blob-stream",
        ".js",
      ),
    },
  },
  node: {
    global: true,
  },
  optimization: {
    usedExports: true,
  },
  devServer: {
    publicPath: "/workshop/dist/",
    historyApiFallback: { index: "/workshop/dist/index.html" },
  },
}
