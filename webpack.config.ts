import * as path from "path"
import CopyPlugin from "copy-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import { Configuration, EnvironmentPlugin } from "webpack"
import "webpack-dev-server"

const config: Configuration = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.cc\.(glslx?|vert|frag)$/,
        use: {
          loader: "val-loader",
          options: {
            executableFile: path.resolve(__dirname, "cc-glsl-loader.mjs"),
          },
        },
      },
      {
        test: /(?<!\.cc)\.(glslx?|vert|frag)$/,
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
    new EnvironmentPlugin({
      GIT_HASH: process.env.GITHUB_SHA ?? "??????",
      BUILD_TIME: new Date().toISOString(),
    }),
  ],
  output: {
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
    historyApiFallback: { index: "/workshop/404.html" },
    hot: true,
  },
}

export default config
