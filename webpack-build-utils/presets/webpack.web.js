const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const clientConfig = {
    entry: path.resolve(__dirname, './../../client/index.tsx'),
    output: {
        path: path.resolve(__dirname, './../../client/build/')
    },
    module: {
        rules: [
            {
              test: /\.css$/,
              use: [
                'style-loader',
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    publicPath: '../',
                  },
                },
                'css-loader',
              ],
            }
        ],
    },

};

module.exports = () => clientConfig;
