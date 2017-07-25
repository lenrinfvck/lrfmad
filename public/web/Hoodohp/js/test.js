$(document).ready(function() {
		var viewX=document.documentElement.clientWidth;
		var viewY=document.documentElement.clientHeight;
		var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
		var $body = $("body, html");
		var actIndex = 0;

		$('.allCom').css({'width': viewX*2+5,'left':-viewX});
		$('.allCom .com').css('width', viewX);
		$('.baseBox').css('height', viewY+'px');

		$Rnav=$('.rightNav');
		rightNav();
		$('.rightNav').css({
			top: '50%',
			marginTop: -$('.rightNav').height()/2 +'px'
		});
		$(".rightNav li").eq(0).addClass('actived');
		$('.baseCenter').each(function(index, el) {
			$(this).prepend('<div class="baseTitle">'+$(this).data("title")+'</div>');
		});
		
		setInterval('animate()',1000);

		//$('.baseBox:odd').css('background', '#2B303B'); //TestInfo
		$('.scale').css({transformOrigin:'50% 50%','-webkit-transformOrigin':'50% 50%'});
		$('.scaleReal').css({transformOrigin:'0% 0%','-webkit-transformOrigin':'0% 0%'});
		if(viewX<=480)
			scaleReal=480;
		else
			scaleReal=viewX;
		$('.descrip h2').css({
			marginTop: '-'+(1920/scaleReal*100-120)+'px',
		});
		$('.imgShow').prepend('<div class="preBnt" ></div>'+'<div class="nextBnt" ></div>');
		scrollDIY=function(e){
			var e=e || window.event; 
        	if (e.preventDefault) {
            	e.preventDefault();
        	} else {
            	e.returnValue = false;
        	}
        	var wheel;
        	if(e.wheelDelta){   //IE/Opera/Chrome 
           	 	wheel=-e.wheelDelta; 
        	}else if(e.detail){  //Firefox 
            	wheel=e.detail; 
        	}
        	console.log(wheel);
        	
        	if(!$body.is(':animated')){
	        	if(wheel>0){
	        		$body.animate({scrollTop:scrollY+viewY}, '200');
	        	}else{
	        		$body.animate({scrollTop:scrollY-viewY}, '200');

	        	}
        	}
     	}
     	scrollInit();
		$('div.showThing').each(function(index, el) {
			$(this).prepend('<div class="clearfix"><img  src="'+$(this).data('src')+'" /></div>');
			$('.showThing  img').each(function(index, el) {
	
					$('.showThing  img').css('marginTop',($('.showThing').height()*.8-350)/2+'px')
		
			});
			$('.scaleReal').css({
					transform: 'scale('+viewX/1920+')',
					'-webkit-transform': 'scale('+viewX/1920+')'
			});

			if(viewX<=850){
				$('.showThing img').css({
					'width': '350px',
				});
				$('.baseCenter').css('width','95%');
				$('.scale').css({
					transform: 'scale(0.75)',
					'-webkit-transform': 'scale(0.75)'
					//zoom: 0.75
				});
				$('#topFoot').css({
					marginTop: '-10px'
				});
				$('.help li').css({
					display: 'block',
					margin: '80px auto'
				});
			}
			else if(viewX<=1400){
				$('.baseCenter').css('width','95%');

				$('.scale').css({
					transform: 'scale(0.75)',
					'-webkit-transform': 'scale(0.75)'
					//zoom: 0.75
				});
				$('#topFoot').css({
					marginTop: '-10px'
				});
				$('.footLogo').css({marginTop: '-20px'});
				$('.proLink').css('top', '0');
			}
			 //IE/Opera/Chrome 
			if((viewY>=800)&&(viewY>viewX)){
				$('.downBnt').css({
					marginTop: '30%',
					transform: 'scale(1)',
					'-webkit-transform': 'scale(1)'
				});
				$('.proLink').css('top', '50px');						
			}else{
				$('.downBnt').css({
					marginTop: '70px'
				});
			}

		}).css('width',$('.baseCenter').width()*.85+'px');
		$('.allImg').each(function(index, el) {
			$(this).css('width', $(this).children('.showThing').length*($('.showThing').width())+5+'px');
			$(this).css('left',-$('.showThing').width());
			$(this).children('.showThing').last().prependTo($(this));
		});
		$(window).load(function() {
			startMad();
		});	
		$(window).resize(function(event) {
			viewX=document.documentElement.clientWidth;
			viewY=document.documentElement.clientHeight;

			if(viewX<=850){
				$('.showThing img').css({
					'width': '350px',
				});
				$('.help li').css({
					display: 'block',
					//property2: 'value2'
				});
				$('.help li').css({
					display: 'block',
					margin: '80px auto'
				});
				
				// $('.des').removerClass('scaleReal');
				// $('.des').addClass('scale');
			}
			else if(viewX<=1400){
				$('.baseCenter').css('width','95%');
				$('.showThing img').css({
					'width': '600px',
				});
				$('.scale').css({
					transform: 'scale(0.75)',
					'-webkit-transform': 'scale(0.75)'
					//zoom: 0.75
				});
				$('#topFoot').css({
					marginTop: '-10px'
				});
				$('.help li').css({
					display: 'inline-block',
					margin: '7%'
				});
				$('.footLogo').css({marginTop: '-20px'});
				$('.proLink').css('top', '0');
			}
			else{
				$('.baseCenter').css('width','75%');
				$('.showThing img').css({
					'width': '600px',
				});
				$('.scale').css({
					transform: 'scale(1)',
					'-webkit-transform': 'scale(1)'
					//zoom: 1.0
				});
				$('#topFoot').css({
					marginTop: '50px'
				});
				$('.help li').css({
					display: 'inline-block',
					margin: '7%'
				});
				$('.footLogo').css({margin: '40px auto'});
				$('.proLink').css('top', '40px');				
			}
			if((viewY>=800)&&(viewY>viewX)){
				$('.downBnt').css({
					marginTop: '30%',
					transform: 'scale(1)',
					'-webkit-transform': 'scale(1)'
					//zoom: 1	
				});		
				$('.proLink').css('top', '50px');		
			}else{
				$('.downBnt').css({
					marginTop: '70px'
				});
			}
			$('.scaleReal').css({
				transform: 'scale('+viewX/1920+')',
				'-webkit-transform': 'scale('+viewX/1920+')'
			});
			if(viewX<=480)
			scaleReal=480;
			else
			scaleReal=viewX;
			$('.descrip h2').css({
				marginTop: '-'+(1920/scaleReal*100-120)+'px',
			});
			$('.showThing').css('width',$('.baseCenter').width()*.85+'px')
			$('.baseBox').css('height', viewY+'px');
			$('.showThing  img').css('marginTop',($('.showThing').height()*.8-350)/2+'px');
			scrollY=document.documentElement.scrollTop||document.body.scrollTop;
			var offset=actIndex*viewY;
			if(viewX>viewY)
				$body.scrollTop(offset);
			$('.allImg').each(function(index, el) {
				$(this).css('width', $(this).children('.showThing').length*($('.showThing').width())+5+'px');
				$(this).css('left',-$('.showThing').width());
			});
			var topOffset;
			($('.allCom').css('left')=='0px') ? topOffset=0 : topOffset=-viewX;
			$('.allCom').css({'width': viewX*2+5,'left':topOffset+'px'});
			$('.allCom .com').css('width', viewX);
				
		});
		
		$(window).scroll(function(){
			scrollY=document.documentElement.scrollTop||document.body.scrollTop;
			actIndex=parseInt(scrollY/viewY);
			$(".rightNav li").removeClass('actived').eq(actIndex).addClass('actived');
		});
		
		$('.rightNav li').each(function(index, el) {
			$(this).click(function(event) { 
				$body.stop(false,true);
				$body.animate({scrollTop:index*viewY},'200')
			});
		});
		$('.nextBnt,.preBnt').click(function(event) {
			var $showThing=$(this).siblings('.allImg').find('.showThing');
			var $offset=$('.showThing').width();
			var $allImg=$(this).siblings('.allImg');
			if(!$allImg.is(':animated')){
				if($(this).attr('class')=='nextBnt'){
					$allImg.animate({left:'-='+$offset+'px'}, '150',function(){
						
						$(this).css('left','-'+$offset+'px').children('.showThing').last().after($showThing.first());
				
					});
				}else if($(this).attr('class')=='preBnt'){
					
					$allImg.animate({left:'0px'}, '150',function(){
						$(this).css('left','-'+$offset+'px').children('.showThing').first().before($showThing.last());
					});
				}
			}
		});
		$('.changeBnt').toggle(function() {
			$('.allCom').animate({left:'0px'},function(){$('.changeBnt div').css('backgroundPosition', '-275px -250px');})
		}, function() {
			$('.allCom').animate({left:-viewX+'px'},function(){$('.changeBnt div').css('backgroundPosition', '-305px -250px');})
		});
		$('.aboutBnt').click(function(event) {
			$('.changeBnt').click();
		});
		$('.downBnt').click(function(event) {
			$body.animate({scrollTop:viewY},'200')
		});
		$('.proLink').each(function(index, el) {
			$(this).click(function(event) {
				window.open($(this).data('url'),'_blank');
			});	
		});
		$('.helpApp').toggle(function() {
			$(this).siblings('.iosBnt').animate({marginLeft: '-185px'}, '150').siblings('.anBnt').animate({marginLeft: '65px'}, '100')
	
		},function() {
			$(this).siblings('.iosBnt').animate({marginLeft: '-65px'}, '150').siblings('.anBnt').animate({marginLeft: '-55px'}, '100')

		});

	})
function rightNav(){
	var html='<ul>';
	var foot='</ul>';
	var txt='';
	$('.baseBox').each(function(index, element) {
		txt+='<li><span>'+$(this).data('title')+'</span></li>';
	});
	html+=txt+foot;
	$('.rightNav').append(html);
}
function startMad(){
	$('.mid').fadeOut('200');
	$('.startMadL').delay(250).animate({width: '0%'}, 'slow').siblings('.startMadR').delay(250).animate({width: '0%'}, 'slow');

}
function animate(){
	$('.downBnt').fadeTo('500', 0.4,function(){
		$(this).fadeTo('500', 1)
	})
}
function scrollInit(){
	if(document.addEventListener){ 
		        document.addEventListener('DOMMouseScroll',scrollDIY,false); 
		    } //W3C 
	window.onmousewheel=document.onmousewheel=scrollDIY;
}

