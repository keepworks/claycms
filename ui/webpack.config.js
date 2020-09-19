const dotenv                        = require('dotenv')
const path                          = require('path')
const webpack                       = require('webpack')
const merge                         = require('webpack-merge')
const BundleAnalyzerPlugin          = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CompressionPlugin             = require('compression-webpack-plugin')
const DotenvPlugin                  = require('webpack-dotenv-plugin')
const FaviconsWebpackPlugin         = require('favicons-webpack-plugin')
const HtmlWebpackPlugin             = require('html-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const MiniCssExtractPlugin          = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin       = require('optimize-css-assets-webpack-plugin')
const SentryWebpackPlugin           = require('@sentry/webpack-plugin')
const TerserPlugin                  = require('terser-webpack-plugin')
const WebpackNotifierPlugin         = require('webpack-notifier')

const envFilename = (() => {
  if (process.env.HEROKU) {
    return '.env.heroku'
  }

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    return '.env'
  }

  return `.env.${process.env.NODE_ENV}`
})()

const PATHS = {
  env: path.join(__dirname, envFilename),
  envExample: path.join(__dirname, '.env.example'),
  js: path.join(__dirname, 'src/index.js'),
  css: path.join(__dirname, 'src/assets/stylesheets/main.css'),
  favicon: path.join(__dirname, 'src/assets/images/favicon.png')
}

// Load environment variables to be used in webpack.config.js
dotenv.config({ path: PATHS.env })

const config = {}

config.common = {
  context: path.join(__dirname, 'src'),
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: process.env.PUBLIC_PATH
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /(node_modules|bower_components)/
      }, {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: 'file-loader?name=images/[name]-[hash:8].[ext]'
      }, {
        test: /\.(woff|woff2|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader?name=fonts/[name]-[hash:8].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      client: path.join(__dirname, 'src', 'client'),
      components: path.join(__dirname, 'src', 'components'),
      constants: path.join(__dirname, 'src', 'constants'),
      fonts: path.join(__dirname, 'src', 'assets', 'fonts'),
      images: path.join(__dirname, 'src', 'assets', 'images'),
      lib: path.join(__dirname, 'src', 'lib'),
      models: path.join(__dirname, 'src', 'models'),
      mutations: path.join(__dirname, 'src', 'mutations'),
      node_modules: path.join(__dirname, 'node_modules'),
      queries: path.join(__dirname, 'src', 'queries'),
      styles: path.join(__dirname, 'src', 'styles')
    }
  },
  plugins: [
    new DotenvPlugin({
      sample: PATHS.envExample,
      path: PATHS.env
    }),
    new LodashModuleReplacementPlugin({
      collections: true,
      paths: true,
      shorthands: true
    }),
    new FaviconsWebpackPlugin({
      logo: PATHS.favicon,
      background: 'transparent',
      prefix: 'images/favicons-[hash]/'
    }),
    new HtmlWebpackPlugin({ template: 'template.ejs' }),
    new BundleAnalyzerPlugin({
      analyzerMode: process.env.PROFILE ? 'server' : 'disabled'
    })
  ]
}

config.development = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: [
      PATHS.js,
      PATHS.css
    ]
  },
  output: {
    filename: 'javascripts/[name].js',
  },
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    hotOnly: true,
    historyApiFallback: true,
    open: true,
    noInfo: true,
    stats: 'errors-only'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new WebpackNotifierPlugin()
  ],
  module: {
    rules: [
      // Preloaders
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
        }
      },

      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

config.production = {
  mode: 'production',
  devtool: 'nosources-source-map',
  entry: {
    app: [
      PATHS.js,
      PATHS.css
    ]
  },
  output: {
    filename: 'javascripts/[name]-[chunkhash:8].js',
    sourceMapFilename: 'javascripts/[name]-[chunkhash:8].map.js'
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new MiniCssExtractPlugin({
      filename: 'stylesheets/[name]-[contenthash:8].css'
    }),
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new SentryWebpackPlugin({
      include: './dist',
      release: process.env.HEROKU_SLUG_COMMIT
    })
  ],
  module: {
    rules: [
      // Preloaders
      {
        test: /\.js$/,
        enforce: 'pre',
        loader: 'eslint-loader'
      },

      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  }
}

config.staging = config.production;

module.exports = merge(config.common, config[process.env.NODE_ENV]);
