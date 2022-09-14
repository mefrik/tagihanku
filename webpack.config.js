const HtmlWebPackPlugin = requeire( 'html-webpack-plugin ');
const path = require( 'path ');
module.exports = {
    context: __dirname,
    entry: './public/index.html',
    output: {
        path: path.resolve( __dirname, 'public' ),
        filename: 'index.js',
        publicPath: '/',
    },
    devServer: {
        historyApiFallback: true
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: path.resolve( __dirname, 'public/index.html' ),
            filename: 'index.html'
        })
    ]
};