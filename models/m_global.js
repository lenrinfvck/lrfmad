var db = require("../my_modules/mongoose");
var Schema = db.Schema;
var ObjectId = Schema.Types.ObjectId;

var GlobalSchema = new Schema({
    index_game: {
        score: Number
    }
});

GlobalSchema.statics = {
    fetch: function(cb) {
        return this.find({})
            .sort("-mate.createAt")
            .exec(cb);
    },
    findById: function(id, cb) {
        return this
            .findOne({_id: id})
            .exec(cb);
    },
    findByName: function(name, cb) {
        return this
            .findOne({name: name})
            .exec(cb);
    }
}

var Global = db.model("Global", GlobalSchema);

module.exports = Global;












