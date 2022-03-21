import * as path from "path"
import CopyPlugin from "copy-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"

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
        test: /\.glslx$|\.vert$|\.frag$|\.glsl$/,
        type: "asset/source",
        use: ["glslify-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|ttf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlPlugin({ template: "./index.html" }),
    new CopyPlugin({
      patterns: [{ from: "static", to: "." }],
    }),
  ],
  output: {
    path: path.resolve(__dirname, "docs"),
    publicPath: "/workshop/",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      ts3dutils: path.resolve(
        __dirname,
        "node_modules",
        "ts3dutils",
        "lib",
        "index.es.min",
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
    static: {
      publicPath: "/workshop/",
      directory: path.join(__dirname, "docs"),
    },
    historyApiFallback: { index: "/workshop/404.html" },
    hot: true,
  },
}
