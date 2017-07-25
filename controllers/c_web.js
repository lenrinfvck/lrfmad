var Web = require("../models/m_web.js"); 

function webRender(req, res, next) {
    Web.fetch(function(err, weblist) {
        if(err) return next(err);
        res.render("web", {
            locals: {
                user: req.session.uid || ""
            },
            nav: 'web',
            web: weblist
        });
    });
    
}
function webUpdate(req, res, next) {
    var data = req.body;
    Web.findOne({proj:data.proj}, function(err, item) {
        if (err) return next(err);
        console.log("itemFind:",item);
        if (item) {
            for(var key in data) {
                item[key] = data[key];
            }
            item.save(function(err) {
                next(err);
            });
        }else {
            var add = new Web(data);
            add.save(function(err) {
                next(err);
            });
        }
        res.redirect("/admin/");
    });
}

exports.list = webRender;
exports.form = webUpdate;