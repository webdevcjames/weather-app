const path = require("path");

module.exports = {
  mode: "development",
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    filename: "build.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/",
  },
  devServer: {
    contentBase: "./public",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://dnu5embx6omws.cloudfront.net",
        pathRewrite: { "^/api": "" },
        changeOrigin: true,
        secure: false,
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node-modules/,
        enforce: "pre",
        enforce: "post",
        loader: "babel-loader",
        options: {
          presets: ["env", "react", "stage-0"]
        },
      },
      {
        test: /\.styl$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "stylus-loader" }
        ]
      },
    ],
  },
  resolve: {
    extensions: [".js", ".styl"]
  },
  plugins: [],
}