import * as path from "path"
import CopyPlugin from "copy-webpack-plugin"
import HtmlPlugin from "html-webpack-plugin"
import { Configuration, EnvironmentPlugin } from "webpack"
import "webpack-dev-server"

const config = (env: unknown, argv: any): Configuration => ({
  devtool: "source-map",
  module: {
    rules: [
      {
        resourceQuery: /raw/,
        type: "asset/source",
      },
      {
        test: /\.tsx?$/,
        include: [path.resolve(__dirname, "src")],
        use: {
          loader: "@sucrase/webpack-loader",
          options: {
            transforms: ["typescript", "jsx"],
            production: argv.mode === "production",
          },
        },
      },
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre",
      },
      {
        test: /\.(glslx?|vert|frag)$/,
        use: {
          loader: "val-loader",
          options: {
            executableFile: path.resolve(__dirname, "glsl-loader.mjs"),
          },
        },
      },
      {
        resourceQuery: { not: /raw/ },
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
    clean: true,
    devtoolModuleFilenameTemplate: "/dev/[namespace]/[resource-path]?[loaders]",
  },
  resolve: {
    extensions: [".ts", ".js", ".tsx", ".jsx"],
    alias: {
      ts3dutils: __dirname + "/node_modules/ts3dutils/lib/index.es.min",
      tsgl: __dirname + "/node_modules/tsgl/lib/index.es.min",
      pdfkit: __dirname + "/node_modules/pdfkit/js/pdfkit.standalone.js",
      // standalone version of blob-stream, to avoid
      // having to polyfill buffer etc
      "blob-stream": __dirname + "/node_modules/blob-stream/.js",
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
})

export default config
