var Global = require("../models/m_global.js");

function indexRender(req, res, next) {
    var score = 0;
    Global.findOne({}, function(err, item){
        if (err) return next(err);
        if(item) {
            score = item.index_game.score;
        }
        res.render("index", {
            locals: {
                user: req.session.uid || ""
            },
            nav: 'index',
            score: score
        });
    });

}

function game_score(req, res, next) {
    var score = req.body.score;
    Global.findOne({}, function(err, item){
        if (err) return next(err);
        if(item) {
            if(item.index_game.score < score) {
                item.index_game.score = score;
                item.save();
                res.json({score: score});
            } else {
                res.json({score: item.index_game.score});
            }
        }else {
            var add = new Global({index_game:{score:score}});
            add.save();
            res.json({score: score});
        }
    });
}

exports.indexRender = indexRender;
exports.game = game_score;