var db = require("../my_modules/mongoose");
var Schema = db.Schema;
var ObjectId = Schema.Types.ObjectId;

var WebSchema = new Schema({
    proj: String,
    title: String,
    desc: String,
    img: String,
    url: String,
    tag: [String],
    mate: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

WebSchema.pre("save", function(next) {
    if(this.isNew) {
        this.mate.createAt = Date.now();
    } else {
        this.mate.updateAt = Date.now();
    }
    next();
});

WebSchema.statics = {
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
    findByProj: function(proj, cb) {
        return this
            .findOne({proj: proj})
            .exec(cb);
    }
}

var Web = db.model("Web", WebSchema);

module.exports = Web;












