$(document).ready(function() {
	var viewX=document.documentElement.clientWidth;
	var viewY=document.documentElement.clientHeight;
	// var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	// document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3Fc182c362c098a7bfb663a0292d9becd0' type='text/javascript'%3E%3C/script%3E"));
	var a = 0;
	roles = {};
	var game = $(".lb-con").lb_game();
	//game.run();
	$(".play-btn").click(function() {
		$(this).fadeOut();
		game.play();
	});
	// $(".rin, .komani, .haruka, .mio, .kudo, .yui").each(function(index, el) {
	// 	roles[el.className] = {w: $(el).width(), h: $(el).height()};
	// });
	// console.log(JSON.stringify(roles));
});