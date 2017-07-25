var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bodyParser = require("body-parser");
var multer = require("multer");
var swig = require("swig");
var http = require("http");

var config = require("./config/app_config");

var routes = require("./all_routes");
var other = require("./controllers/other");

var app = express();

var init = require("./my_modules/init_mdWatch");

if (app.get("env") === "dev") {
	app.set('view cache', false);
	swig.setDefaults({
		root: path.join(__dirname, "public"),
		cache: false,
	    encoding: 'utf8',
	});
}else {
	app.set('view cache', true);
	swig.setDefaults({
		root: path.join(__dirname, "public"),
	    encoding: 'utf8',
	});
}
// view engine setup
swig.setDefaults({
	root: path.join(__dirname, "public"),
	//cache: view_cache,
    encoding: 'utf8',
});
app.engine("html", swig.renderFile);
app.set("view engine", "html");

app.set("views", path.join(__dirname, "views"));

//测试5xx错误
if (process.env.ERROR_ROUTE) {
	app.get("/error", function(req, res, next) {
		var err = new Error("baka miss");
		err.type = "db";
		next(err);
	});
}

app.set("static", path.join(__dirname, "public"));
init.run(app);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.set("port", process.env.PORT || config.port);
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(multer());

app.use(cookieParser());
app.use(session({
	secret: config.session.secret,
	name: config.session.name, //这里的name值得是cookie的name，默认cookie的name是：connect.sid
	cookie: {
		maxAge: 1000000
	}
	/*, //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
		resave: true,
		saveUninitialized: true,*/
}));
//public下静态文件服务器
app.use(express.static(path.join(__dirname, "public")));

//路由注册
app.use("/", routes);

//404
app.use(other.notfound);
app.use(other.error);

// development error handler
// will print stacktrace
if (app.get("env") === "dev") {
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render("error", {
			message: err.message,
			error: err
		});
	});
}

// production error handler
// no stacktraces leaked to user

// app.use(function(err, req, res, next) {
// 	res.status(err.status || 500);
// 	res.render("error", {
// 		message: err.message,
// 		error: {}
// 	});
// });

http.createServer(app).listen(app.get("port"), function() {
	console.log("Express server listening on port");
});
//module.exports = app;