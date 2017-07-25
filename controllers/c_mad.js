var Mad = require("../models/m_mad.js"); 

function madRender(req, res, next) {
    Mad.fetch(function(err, madlist) {
        if(err) return next(err);
        res.render("mad", {
            locals: {
                user: req.session.uid || ""
            },
            nav: 'mad',
            mad: madlist
        });
    });
    
}
function madUpdate(req, res, next) {
    var data = req.body;
    Mad.findOne({name:data.name}, function(err, item) {
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
            var add = new Mad(data);
            add.save(function(err) {
                next(err);
            });
        }
        res.redirect("/admin/");
    });
}

exports.list = madRender;
exports.form = madUpdate;