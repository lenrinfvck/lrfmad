//var md = require("markdown").markdown;
var marked = require("marked");
var fs = require("fs");
var pathFn = require("path");
var Blog = require("../models/m_blog");
var parseInfo = require("../my_modules/parseMdInfo");


function mdWatch(app) {
    var path = pathFn.join(app.get("static"), "/blog/md/");
    var md_rePath = pathFn.relative(app.get("static"), path);
    fs.watch(path, function(event, filename) {
        checkUpadate(path);
    });
    checkUpadate(path);
}

function checkUpadate(path) {
    fs.readdir(path, function(err, files) {
        if(err) {
            console.log("check:",err);
            return false;
        }
        var fileLen;
        var ignore = [".DS_Store"];
        files.forEach(function(name) {
            if(ignore.indexOf(name) >= 0) {
                files.splice(ignore.indexOf(name), 1);
            }
        });
        fileLen = files.length;
        Blog.fetch(function(err, data) {
            if(err) {
                console.log("fetch:", err);
                return false;
            }
            upDateBlog(files, path);
            removeBlog(files, data);
        });
    });
}

function upDateBlog(files, path) {
    files.forEach(function(name) {
        Blog.findByDir(name, function(err, item) {
            if(err) {
                console.log("init_blogfetch:", err);
                return false;
            }

            if (!item) {
                var md_path = pathFn.join(path, name+"/index.md");
                fs.open(md_path, "r+", function(err, fd) {
                    if(err) {
                        console.log(err);
                        return false;
                    }
                    var fstatus = {};
                    fstatus = fs.fstatSync(fd);
                    fs.readFile(md_path, "utf8", function(err, str) {
                        if(err) {
                            console.log(err);
                            return false;
                        }
                        var type;
                        var tag = [];
                        var parse = parseInfo(str);
                        str = parse.str;
                        if(parse.parse) {
                            type = parse.parse.type;
                            tag = parse.parse.tag.split(",");
                        }
                        var mdObj = marked.lexer(str);
                        var add = new Blog({
                            title: mdObj[0].text,
                            dir: name,
                            type: type,
                            tag: tag,
                            mate: {
                                createAt: fstatus.mtime,
                                updateAt: Date.now()
                            }
                        });
                        add.save(function(err) {
                            console.log(err);
                            return false;
                        });
                        fs.close(fd);
                    });
                });
            }
        });
    });
}

function removeBlog(files, data) {
    data.forEach(function(d) {
        if(files.indexOf(d.dir) < 0) {
            Blog.remove({_id: d._id}, function(err, md) {
                if(err) return err;
            });
        }
    });
}

exports.run = mdWatch;