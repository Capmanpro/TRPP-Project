const path = require('path');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
        field: './js/field.js',
        game: './js/game.js',
    },
    output: {
        path: path.resolve(__dirname, 'js'),
        filename: '[name].bundle.js',
    },
};