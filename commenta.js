// create a web server 
// 1. load the http module
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');
var querystring = require('querystring');
var comments = [];
http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname == '/') {
        res.setHeader('Content-Type', 'text/html');
        fs.readFile('./index.html', function (err, data) {
            res.end(data);
        });
    } else if (pathname == '/load') {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(comments));
    } else if (pathname == '/add') {
        var str = '';
        req.on('data', function (data) {
            str += data;
        });
        req.on('end', function () {
            var obj = querystring.parse(str);
            comments.push(obj);
            res.end(JSON.stringify(obj));
        });
    } else {
        fs.exists('.' + pathname, function (exists) {
            if (exists) {
                res.setHeader('Content-Type', mime.lookup(pathname));
                fs.readFile('.' + pathname, function (err, data) {
                    res.end(data);
                });
            } else {
                res.statusCode = 404;
                res.end('Not Found');
            }
        });
    }
}).