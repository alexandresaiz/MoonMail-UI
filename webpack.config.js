import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const resolve = path.resolve;
const base = (...args) =>
  resolve.apply(null, [path.resolve(), ...args]);

const paths = {
  base,
  client: base.bind(null, 'src'),
  dist: base.bind(null, 'dist')
};

const cssModulesLoader = {
  loader: 'css-loader',
  query: {
    modules: true,
    importLoaders: 1,
    localIdentName: '[name]__[local]___[hash:base64:5]'
  }
};

export default function(options) {
  const webpackConfig = {
    name: 'client',
    target: 'web',
    entry: [
      paths.client('index.js')
    ],
    output: {
      path: __dirname + '/public',
      publicPath: '/',
      filename: 'bundle.[hash].js',
      devtoolModuleFilenameTemplate: '/[resource-path]'
    },
    resolve: {
      modules: [paths.client(), 'node_modules'],
      extensions: ['.js', '.jsx', '.json'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.client('index.html'),
        favicon: paths.client('static/favicon.png'),
        filename: 'index.html',
        inject: 'body',
        minify: {
          collapseWhitespace: true
        }
      }),
      new ExtractTextPlugin({
        filename: 'styles.[hash].css',
        allChunks: true
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          sassLoader: {
            includePaths: paths.client('styles')
          },
          postcss: [
            require('postcss-cssnext')({
              browsers: ['last 2 versions', '> 5%']
            }),
            require('postcss-reporter')(),
          ]
        }
      })
    ],
    module: {
      loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: [
            ['es2015', {'modules': false}],
            'react',
            'stage-0'
          ],
          env: {
            production: {
              presets: ['react-optimize'],
              compact: true
            },
            test: {
              plugins: [
                ['__coverage__', {'only': paths.client()}],
                'babel-plugin-rewire'
              ]
            }
          }
        }
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.html$/,
        loader: 'html-loader'
      }, {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          disable: options.dev,
          fallback: 'style-loader',
          use: [cssModulesLoader, 'postcss-loader', 'sass-loader']
        })
      }, {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          disable: options.dev,
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      }]
    }
  };

  if (options.dev) {
    webpackConfig.devtool = 'eval';
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        '__DEV_': true
      })
    );
  }

  if (options.test) {
    process.env.NODE_ENV = 'test';
    webpackConfig.devtool = 'cheap-module-source-map';
    webpackConfig.resolve.alias.sinon = 'sinon/pkg/sinon.js';
    webpackConfig.module.noParse = [
      /\/sinon\.js/
    ];
    webpackConfig.module.loaders.push([
      {
        test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]);
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    webpackConfig.externals = {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    };
    webpackConfig.plugins.push(
      new webpack.DefinePlugin({
        '__COVERAGE__': options.coverage,
        '__TEST_': true
      })
    );
  }

  if (options.prod) {
    process.env.NODE_ENV = 'production';
    webpackConfig.plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production'),
          '__PROD__': true
        }
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false
        }
      })
    );
  }

  if (options.deploy) {
    webpackConfig.output.publicPath = '/MoonMail-UI/';
  }

  return webpackConfig;
}
