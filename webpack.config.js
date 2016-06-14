var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: {
    // 	app: path.join(__dirname, 'src/app.js'),
    // 	test: path.join(__dirname, 'src/test.js'),
    //     vendors: ['react']
    // },
    entry: {
    	app: path.join(__dirname,'src/index.js'),
    	mobile: path.join(__dirname,'src/mobile.js'),
    	vendors: ['jquery', 'moment']
    },
    output: {
        path: path.join(__dirname, 'dist'),
        //filename: '[name].[hash].js'
        filename: '[name].js'
    },
	module: {
	    loaders: [
		    {
		        test: /\.js$/,
		        exclude: /node_modules|bundle\.js/,
		        loader: 'babel-loader',
		        query: {
			        presets: ['es2015']
		      	}
		    },
		    {
		        test: /\.css$/,
		        loaders: ['style', 'css'],
		        include: path.join(__dirname,'src')
	        },
	        {
		        test: /\.scss$/,
		        loaders: ['style', 'css', 'sass'],
		        include: path.join(__dirname,'src')
	        },
	        {
		        test: /\.(png|jpg)$/,
		        loader: 'url?limit=40000'
	        }
	    ]
	},
	plugins: [
		new HtmlwebpackPlugin({
		    title: 'Hello World app',
		    template: path.resolve(path.join(__dirname,'template'), 'index.html'),
		    filename: '../index.html',
		    //chunks这个参数告诉插件要引用entry里面的哪几个入口
		    chunks: ['app', 'vendors'],
		    //要把script插入到标签里
		    inject: 'body',

      		minify: false
		  }),
	    new HtmlwebpackPlugin({
		    title: 'Hello Mobile app',
		    template: path.resolve(path.join(__dirname,'template'), 'mobile.html'),
		    filename: '../mobile.html',
		    chunks: ['mobile', 'vendors'],
		    inject: 'body',
      		minify: false
		}),

		new webpack.ProvidePlugin({
	      $: "jquery",
	      jQuery: "jquery",
	      "window.jQuery": "jquery"
	    }),
	    // new webpack.optimize.UglifyJsPlugin({
	    //   // 哪个不压缩
	    //   exclude: /js($|\?)/i,
	    //   compress: {
	    //     warnings: false
	    //   },
	    //   mangle: {
	    //     except: ['zhangyunlu']
	    //   }
	    // }),
	    // // 无论如何还是会piple完成
     //    new webpack.NoErrorsPlugin(),

     //    //new webpack.NormalModuleReplacementPlugin(/vendors.js/, 'react.js')
        
         new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
  	],
   // resolve: {
   //      root: 'E:/github/flux-example/src', //绝对路径
   //      extensions: ['', '.js', '.json', '.scss'],
   //      alias: {
   //          AppStore : 'js/stores/AppStores.js',
   //          ActionType : 'js/actions/ActionType.js',
   //          AppAction : 'js/actions/AppAction.js'
   //      }
   //  }
   	devtool: 'eval-source-map',
  	devServer: {
	    historyApiFallback: true,
	    hot: true,
	    inline: true,
	    progress: true,
	    proxy: {
          '/api/*': {
              target: 'http://localhost:5000',
              secure: false
          }
        }
  	},
};
