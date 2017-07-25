var Web = require("../models/m_web.js"); 

function render(req, res, next) {
    Web.findByProj("3c_webapp", function(err, cb) {
        if(err) return next(err);
        res.render("admin", {
            test: cb,
            locals: {
                user: req.session.uid || ""
            },
        });  
    });
}

module.exports = render;