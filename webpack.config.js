
const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = {
    devtool: 'source-map',
    entry: "./desktop-settings/src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js"
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react']
                }
            }
        }, {
			test: /\.css$/i,
			use: ['style-loader', 'css-loader'],
        },
        {
            test: /\.(png|jpg|gif)$/,
            use: [
                {
                    loader: 'file-loader'
                }
            ]
        }
        ]
	},
    plugins: [
        new HtmlWebPackPlugin({
            hash: true,
            filename: "index.html",  //target html
            template: "./desktop-settings/src/index.html" //source html
        })
	],
	target: 'electron-main'
}