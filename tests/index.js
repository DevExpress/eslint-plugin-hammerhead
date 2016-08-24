var fs = require('fs');

fs.readdir(__dirname, readDirCallback.bind(''));

function readDirCallback (err, items) {
    if (err)
        throw err;

    var currentDirectory = this;

    for (var i = 0; i < items.length; i++) {
        var path = currentDirectory + '/' + items[i];

        fs.lstat(__dirname + path, lStatCallback.bind(path));
    }
}

function lStatCallback(err, stats) {
    if (err)
        throw err;

    var currentPath = this.toString();

    if (stats.isFile()) {
        if (currentPath !== '/index.js' && /\.js$/.test(currentPath))
            require('.' + currentPath);
    } else if (stats.isDirectory())
        fs.readdir(__dirname + currentPath, readDirCallback.bind(currentPath));
}
