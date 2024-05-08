const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      new WebpackPwaManifest({
        name: "JATE Text Editor",
        short_name: "JATE",
        description: "Just Another Text Editor",
        background_color: "#ffffff",
        theme_color: "#3367D6",
        start_url: "/",
        icons: [
          {
            src: path.resolve("src/images/logo.png"),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      ...(process.env.NODE_ENV === 'production' ? [ 
        new InjectManifest({
          swSrc: './src-sw.js',
        })
      ] : []) // Include only in production
    ],

    module: {
      rules: [
        {
          // CSS rule
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          // Babel rule
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [["@babel/preset-env", { targets: "defaults" }]],
            },
          },
        },
      ],
    },
  };
};
