var md = require("markdown").markdown;
var marked = require("marked");
var fs = require("fs");
var pathFn = require("path");
var Blog = require("../models/m_blog");
var parseInfo = require("../my_modules/parseMdInfo");

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

function blogList(req, res, next) {
    var list_type = req.query.list || "all";
    var staticDir = req.app.get("static");

    if(list_type != "all") {
        Blog
            .find({type: list_type})
            .sort("-mate.updateAt")
            .exec(function(err, items) {
                if(err) return next(err);

                renderList(list_type, items, staticDir, res);
            });
    }else {
        Blog.fetch(function(err, items) {
            if(err) return next(err);

            renderList("all", items, staticDir, res);
        });
    }
}

function blogArticle(req, res, next) {
    var path = pathFn.join(req.app.get("static"), "/blog/md/");
    var md_dir = req.params.md;
    Blog.findByDir(md_dir, function(err, article) {
        if(err) return next(err);
        var md_path = pathFn.join(path, article.dir);
        var md_file = pathFn.join(md_path, "index.md");
        var md_rePath = pathFn.relative(req.app.get("static"), md_path);

        Blog.fetch(function(err, items) {
            if(err) return next(err);
            fs.readFile(md_file, "utf8", function(err, str) {
                if(err) return next(err);

                str = parseInfo(str).str;

                //var md2html = md.toHTML(str.replace(/\(\$PATH/g, "(/"+md_rePath));

                var md2html = marked(str.replace(/\(\$PATH/g, "(/"+md_rePath));
                res.render("blog_article", {
                    locals: {
                        user: req.session.uid || ""
                    },
                    nav: "blog",
                    p: md2html,
                    article: article,
                    items: items,
                });
            });
            article.view++;
            article.save();
        });
    });
}

function renderList(list, items, staticDir, res) {
    if(items.length > 0) {
        var path = pathFn.join(staticDir , "/blog/md/");
        var md_path = pathFn.join(path, items[0].dir);
        var md_file = pathFn.join(md_path, "index.md");
        var md_rePath = pathFn.relative(staticDir, md_path);
        fs.readFile(md_file, "utf8", function(err, str) {
            if(err) return next(err);

            str = parseInfo(str).str;
            str = str.replace(/\(\$PATH/g, "(/"+md_rePath);
            //var viewArr = token.slice(0, 5);
            //viewArr.links = {};
            //var firstItem = marked.parser(viewArr);
            var viewTree = marked.lexer(str).slice(1, 7);
            var block_end = 0;
            var list_end = 0;
            var list_item_end = 0;
            for(var i in viewTree) {
                if(viewTree[i].type === "blockquote_start") {
                    block_end++;
                } else if(viewTree[i].type === "blockquote_end") {
                    block_end--;
                } else if(viewTree[i].type === "list_item_start") {
                    list_item_end++;
                } else if(viewTree[i].type === "list_item_end") {
                    list_item_end--;
                } else if(viewTree[i].type === "list_start") {
                    list_end++;
                } else if(viewTree[i].type === "list_end") {
                    list_end--;
                }
            }
            while(block_end--) {
                viewTree.push({type: "blockquote_end"});
            }
            while(list_item_end--) {
                viewTree.push({type: "list_item_end"});
            }
            while(list_end--) {
                viewTree.push({type: "list_end"});
            }
            viewTree.links = {};

            var firstItem =  marked.parser(viewTree);//md.renderJsonML(md.toHTMLTree(viewTree));

            res.render("blog_list", {
                nav: "blog",
                items: items,
                firstItem: firstItem,
                list: list
            });
        });
    }else {
        res.render("blog_list", {
            nav: "blog",
            nodata: true,
            list: list
        });
    }
}

exports.list = blogList;
exports.article = blogArticle;