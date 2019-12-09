const path = require('path');
const webpack = require('webpack');

module.exports = env => {
  const nodeExternals = require('webpack-node-externals');

  return {
    entry: './lib/index.ts',
    target: 'node',
    externals: [nodeExternals()],
    mode: 'development',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: [{
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.src.json'
            }
          }]
        },
        {
          test: /\.json$/,
          use: 'json-loader'
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }),
      new webpack.BannerPlugin({
        banner: '#!/usr/bin/env node',
        raw: true
      })
    ],
    resolve: {
      extensions: ['.ts', '.js', '.json']
    },
    watchOptions: {
      ignored: /node_modules/
    },
    output: {
      filename: 'bundle.js',
      sourceMapFilename: 'bundle.js.map',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs'
    }
  };
};

