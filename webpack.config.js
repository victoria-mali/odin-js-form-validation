import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default (env, argv) => {
  const isProduction = argv.mode === "production";

  return {
    entry: "./src/index.js",
    output: {
      filename: isProduction ? "[name].[contenthash].js" : "main.js",
      path: path.resolve(import.meta.dirname, "dist"),
      // "./" so the prod build works from a GitHub Pages subdirectory; the dev
      // server needs an absolute "/" or it can't serve the app at root.
      publicPath: isProduction ? "./" : "/",
      clean: true,
    },
    devtool: isProduction ? "source-map" : "eval-source-map",
    devServer: {
      watchFiles: ["./src/template.html"],
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./src/template.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.html$/i,
          use: ["html-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: "asset/resource",
        },
      ],
    },
  };
};
