let path = require('path');

let conf = {
    entry: './js/main.js',
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: 'app.js'
    },

    devtool: "source-map",
}

module.exports = conf;
