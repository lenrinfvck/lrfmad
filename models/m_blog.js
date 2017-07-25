var db = require("../my_modules/mongoose");
var Schema = db.Schema;
var ObjectId = Schema.Types.ObjectId;

var BlogSchema = new Schema({
    title: String,
    view: {
        type: Number,
        default: 0
    },
    zan: Number,
    desc: String,
    type: String,
    dir: String,
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

BlogSchema.virtual("url").get(function() {
    return this.mate.createAt.getTime()+"";
});
BlogSchema.virtual("url").set(function(url) {
    this.mate.createAt = new Date(parseInt(url));
});

// BlogSchema.pre("save", function(next) {
//     if(this.isNew) {
//         //this.mate.createAt = Date.now();
//     } else {
//         this.mate.updateAt = Date.now();
//     }
//     next();
// });

BlogSchema.statics = {
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
    findByDir: function(dir, cb) {
        return this
            .findOne({dir: dir})
            .exec(cb);
    }
}

var Blog = db.model("Blog", BlogSchema);

module.exports = Blog;












