/*
conFade.js v0.9
*/
var viewX=document.documentElement.clientWidth;
var viewY=document.documentElement.clientHeight;
//$(window).load(conFade);
if (window.console){
	console.log('lenrinfvck')
}

//function conFade(){
//	$('.content').show();
//}
function ntrfBox(){ 
	var viewX=document.documentElement.clientWidth;
	var match;
	var mlBoxX=630;
	var proBoxX=300;
	var lgBoxX=930;
	var firstFlag=1;
	if (viewX>=990) {
		match=990;
	}else if((viewX>=660)&&(viewX<990)){
		match=660;
		lgBoxX=630;
	}else if(viewX<660&&viewX>=460){
		match=460;
		mlBoxX=proBoxX=430;
		lgBoxX=430
	}else{
		match=360;
		lgBoxX=mlBoxX=proBoxX=330;
		firstFlag=0;
	}
	$('.proBox').width(proBoxX);
	$('.mlBox').width(mlBoxX);
	$('.lgBox').width(lgBoxX);
	$('.centerBox').width(match);
	$('.centerWrap').width(match-30);
	if(firstFlag){
		$('.mlBox').addClass('firstBk');
		$('.lgBox').removeClass('imgCenter')
	}
	else{
		$('.mlBox').removeClass('firstBk');
		$('.lgBox').addClass('imgCenter')
	}
}

function topBntSet(){
	var viewY=document.documentElement.clientHeight;
	var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
	if(scrollY>200)
		$('div.topBnt').fadeIn('fast');
	else
		$('div.topBnt').fadeOut('fast');
}
function navAnime(){
	$('li.navTag').each(function(index, el) {
		$(this).hover(function() {
			if(!$(this).find('div').is(":animated"))
				$(this).find('div').animate({top: '0px'},'fast');
		}, function() {
				$(this).find('div').animate({top: '-72px'},'fast');
		});
	});
}
function navInit(){
	$body = $("body, html");
	$('.navTag').each(function(index, el) {
		var color=$(this).data('color');
		var img=$(this).data('bg');
		var div='<div class="tagBox" style="background:'+img+' '+color+' center no-repeat"></div>';
		$(this).append(div);
	});
	$('.topBnt').click(function(){
		$body.animate({scrollTop:0}, '200')
	});
}
function urlInit(){
	$('.centerBox').on('click', '.proBox', function(event) {
		var url=$(this).data('url');
		window.open(url,'_blank');
	});
}
function animeShowInit(){
	$('.animeShow,.showThing').css('height', viewY-$('.topBar').height());
	$('.showThing').css('width', viewX);
}
function proBoxInit(page){
	var $proBox=$('.proBox');
	if (page=='web')
		$proBox.eq(0).addClass('mlBox');
	else if (page=='mad') 
		$('.lgBox').addClass('firstBk');
	$proBox.each(function(index, el) {
		var HproImg;
		var Hstyle='<div class="styleBar">';
		var html;
		if (page=='web'){
			var style=parseInt($(this).data('style'));
			HproImg='<div class="proImg"><img src="'+$(this).data('src')+'" width="100%"></div>';
			if(style&1)	
				Hstyle+='<div class="webStyle" style="background:#FF763A">FD</div>';
			if(style&2)
				Hstyle+='<div class="webStyle" style="background:#25B2D5">JS</div>';
			if(style&4)
				Hstyle+='<div class="webStyle" style="background:#990F93">CSS</div>';
			if(style&8)
				Hstyle+='<div class="webStyle" style="background:#31A527">PHP</div>';
			if(style&16)
				Hstyle+='<div class="webStyle" style="background:#FF763A">HL5</div>';
			// switch(){
			// 	case 0: Hstyle='<div class="webStyle" style="background:#FF763A">WEB</div>';break;
			// 	case 1: Hstyle='<div class="webStyle" style="background:#25B2D5">JS</div>';break;
			// 	case 2: Hstyle='<div class="webStyle" style="background:#990F93">CSS</div>';break;
			// 	case 3: Hstyle='<div class="webStyle" style="background:#31A527">HTML</div>';break;
			// }
			$proBox.parent().on('mouseover', '.proBox', function(e) {
			$(this).find('.proImg').stop().fadeTo('fast', 0.7);
			});		
			$proBox.parent().on('mouseout', '.proBox', function(e) {
				$(this).find('.proImg').stop().fadeTo('fast', 1);
			});
			var HproText='<div class="proText"><div class="proTextBk"></div><h3>'+$(this).data('title')+'</h3><div class="proDate">'+$(this).data('date')+'</div>'+Hstyle+'</div></div>';	
		}else if(page=='mad'){
			HproImg='<div class="proImg"><div class="playHover"></div><img src="'+$(this).data('src')+'" height="100%" /><h2>'+$(this).data('title')+'</h2></div>';
			// style=parseInt($(this).data('style'));
			// if(style&1)	
			// 	Hstyle+='<div class="madStyle" style="background:#FF763A">静止系</div>';
			// if(style&2)
			// 	Hstyle+='<div class="madStyle" style="background:#25B2D5">混合系</div>';
			// if(style&4)
			// 	Hstyle+='<div class="madStyle" style="background:#990F93">纯碱</div>';
			// if(style&8)
			// 	Hstyle+='<div class="madStyle" style="background:#31A527">PV</div>';
			// if(style&16)
			// 	Hstyle+='<div class="madStyle" style="background:#FF763A">片头</div>';
			// if(style&32)
			// 	Hstyle+='<div class="madStyle" style="background:#25B2D5">MEP</div>';
			// switch($(this).data('style')){
			// 	case 0: Hstyle='<div class="madStyle" style="background:#FF763A">静止MAD</div>';break;
			// 	case 1: Hstyle='<div class="madStyle" style="background:#25B2D5">AMV</div>';break;
			// 	case 2: Hstyle='<div class="madStyle" style="background:#990F93">混合系</div>';break;
			// 	case 3: Hstyle='<div class="madStyle" style="background:#31A527">PV</div>';break;

			$proBox.parent().on('mouseover', '.playHover', function(e) {
				$(this).stop().fadeTo('fast', 1);
			});		
			$proBox.parent().on('mouseout', '.playHover', function(e) {
				$(this).stop().fadeTo('fast', 0);
			});	
			var HproText=
				'<div class="proText"><h3>EVENT</h3><p>'+$(this).data('event')+'</p>'+
				'<h3>BGM</h3><p>'+$(this).data('bgm')+'</p>'+
				'<h3>MATERIAL</h3><p>'+$(this).data('material')+'</p>'+
				'<h3>PS</h3><p>'+$(this).data('ps')+'</p>'+
				'</div>';
		}
		html=HproImg+HproText;
		$(this).append(html);	
	});
}

/*
indexPlay.js v0.9
*/
function playInit(){
	var autoPlay=function(){
		var index=($('.playThing').index($('.playing'))+1)%3
		$('.playBnt li').eq(index).click();
	}
	playBnt='<ul class="playBnt">';
	for(var i=0,j=$('.playThing').length;i<j;i++){
		playBnt+='<li></li>';
	}
	playBnt+='</ul>';
	$('.playCenter').append(playBnt);
	$('.playBnt li').eq(0).css({
		'background': '#25B2D5',
		'top': '-20px'
	});
	$('.anime').children().each(function(index, el) {
			var pos=$(this).data();
			$(this).css({'left': pos.xout,'bottom': pos.yout});
			$(this).css({'margin-left': -$(this).width()/2,'margin-bottom':-$(this).height()/2});
		});
	$('.playing .anime').children().each(function(index, el) {		
			var pos=$(this).data();
			$(this).animate({
				'left': pos.xin,
				'bottom': pos.yin},
				600
			);
	});
	$('.playBnt li').each(function(index, el) {				
		$(this).click(function(event) {
			var $act=$('.playThing').eq(index);
			$act.siblings('.playing').css('z-index', '2');
			$('.playing .anime').children().each(function(index, el) {
				var pos=$(this).data();
				$(this).animate({
					'left': pos.xout,
					'bottom': pos.yout},
					600
				);
			});
			$act.css({
				'display':'none',
				'z-index':'3'
			}).addClass('playing').fadeIn('700',function(){
				$act.siblings('.playing').css('z-index', '1').removeClass('playing');
				$('.playBnt li').css('background', '#333').animate({'top': '0px'},50).eq($('.playThing').index($('.playing'))).css('background', '#25B2D5').animate({'top': '-20px'}, 50);
				$('.playing .anime').children().each(function(index, el) {
					var pos=$(this).data();
					$(this).css({'left': pos.xout,'bottom': pos.yout});
					$(this).animate({
						'left': pos.xin,
						'bottom': pos.yin},
						600
					);
				});
			});

			clearTimeout(auto);
			auto=setTimeout(autoPlay,5000);
		});
	})
	var auto=setTimeout(autoPlay,5000);
}

function pageInit(){
	$('.bBnt li').hover(function() {
		$(this).children('.bText').stop().animate({'top': '-50px'}, 150)
	}, function() {
		$(this).children('.bText').stop().animate({'top': '0px'}, 150)
	});
}