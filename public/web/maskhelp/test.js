/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2014-08-15 16:57:38
 * @version $Id$
 */
$(document).ready(function() {
		$('.bnt').click(function(event) {
			$('.test').fadeIn().css({'left':document.documentElement.clientWidth/2- 250 +'px','top':document.documentElement.clientHeight/2 - 200 +'px' });
			var mask='<div class="mask"></div>';
			$('body').before(mask);
			$('.mask').fadeIn()
			$('.closeBnt').click(function(event) {
				$(this).parent().fadeOut();
				$('.mask').fadeOut(function(){
					$(this).remove();
				});
			});
		});
		$('.drag').mousedown(function(e) {
			var MouseInX = e.clientX - $(this).offset().left; 
			var MouseInY = e.clientY - $(this).offset().top;
			var THIS=$(this);
			THIS.dragable=true;
			$(document).mousemove(function(e) {
				var ViewX=document.documentElement.clientWidth;
				var ViewY=document.documentElement.clientHeight;
				var ScrollY=document.documentElement.scrollTop||document.body.scrollTop;
				L=e.clientX - MouseInX;
				T=e.clientY - MouseInY -ScrollY;
				if(L<0){
					L=0;
				}else if(L>ViewX - THIS.offsetWidth){
					L = ViewX - THIS.offsetWidth;
				}
				if(T<0){
					T=0;
				}else if(T>ViewY - THIS.offsetHeight){
				 	T = ViewY - THIS.offsetHeight;
				}			
				THIS.css({'top':T+'px','left':L+'px'});
			}).mouseup(function(e) {
			 	$(document).unbind();
			}); 
		});
	});