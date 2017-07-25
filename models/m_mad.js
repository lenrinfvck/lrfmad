var db = require("../my_modules/mongoose");
var Schema = db.Schema;
var ObjectId = Schema.Types.ObjectId;

var MadSchema = new Schema({
    name: String,
    events: String,
    bgm: String,
    material: String,
    desc: String,
    img: String,
    video: String,
    type: [String],
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

MadSchema.pre("save", function(next) {
    if(this.isNew) {
        this.mate.createAt = Date.now();
    } else {
        this.mate.updateAt = Date.now();
    }
    next();
});

MadSchema.statics = {
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

var Mad = db.model("Mad", MadSchema);

module.exports = Mad;












