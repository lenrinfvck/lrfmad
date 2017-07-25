var express = require("express");
var router = express.Router();

var c_index = require("./controllers/c_index");
var c_web = require("./controllers/c_web");
var c_mad = require("./controllers/c_mad");
var c_admin = require("./controllers/c_admin");
var c_blog = require("./controllers/c_blog");

var webhook = require("./my_modules/webhook");
router.get("/", c_index.indexRender);

router.get("/web", c_web.list);
router.get("/admin", c_admin);
router.post("/admin/updateWeb", c_web.form);

router.get("/mad", c_mad.list);
router.post("/admin/updateMad", c_mad.form);

router.get("/blog", c_blog.list);
router.get("/blog/:md", c_blog.article);

router.post("/webhook", webhook);

router.post("/index_game", c_index.game);

module.exports = router;