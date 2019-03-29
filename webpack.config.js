const webpack = require('webpack');
const miniCssExtractPlugin = require('mini-css-extract-plugin'); //分离css
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	devtool: "source-map",
	entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
	output: {
		path: __dirname + "/public", //打包后的文件存放的地方
		filename: "js/bundle.js" //打包后输出文件的文件名
	},
	module: {
		rules: [{
				test: /(\.jsx|\.js)$/, //这是正则
				use: {
					loader: "babel-loader", //编码转换器
					options: {
						presets: [
							"@babel/preset-env"
						]
					}
				},
				exclude: /node_modules/
			},

			{
				test: /\.css$/, //这是正则
				use: [
					miniCssExtractPlugin.loader,
					'css-loader', 'postcss-loader' //打包css和兼容不同浏览器自动加前缀
				]
			},
			{
				test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/, //这是正则
				use: [{
					loader: 'url-loader', //和file-loader一起处理css的url
					options: {
						limit: 4096, //如果小于大约4k则会自动帮你压缩成dataUrl(base64编码)的图片,否则拷贝文件到outputpath目录
						outputPath: "img/",
						name: '[name].[ext]'
						//publicPath:output,
					}
				}]
			}

		]
	},
	plugins: [
		new miniCssExtractPlugin({
			filename: 'css/[name].css' //css打包到单独的文件夹下单独的文件
		}),
		new webpack.BannerPlugin('xy版权所有，翻版必究')
	]

}

//注：“__dirname”是node.js中的一个全局变量，它指向当前执行脚本所在的目录。
