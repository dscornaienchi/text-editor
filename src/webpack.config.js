const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

module.exports = () => {
  return {
    mode: 'development', // or 'production' for minified builds
    entry: {
      main: './js/index.js',
      install: './js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'), // Adjust the output path as needed
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html', // Adjust the path to your HTML template
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'J.A.T.E',
        short_name: 'JATE',
        description: 'Just Another Text Editor',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('./images/logo.png'), // Adjust the path to your app icon
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Adjust the path to your service worker file
        swDest: 'src-sw.js',
      }),
    ],
    module: {
      rules: [
        // Add your Babel and CSS loader configurations if needed
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};

