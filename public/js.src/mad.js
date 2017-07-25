$(document).ready(function($) {
    videoInit();
    //$(window).scroll(topBntSet);
    //lenrinfvck matchBox beta0.7
    function videoInit(){
        $('.centerBox').on('click', 'div.playHover', function(event) {
            var url=$(this).parent().parent().data('url');
            var playerAc='<div class="video" style="display:none"><div class="closeBnt">X</div>'+'<div class="videoBk"><iframe style="width:910px;height:552px" src="'+url+'" id="ACFlashPlayer-re" frameborder="0"></iframe></div>'+'</div>';
            var playerBili='<div class="video" style="display:none"><div class="closeBnt">X</div>'+'<div class="videoBk"><embed height="540" width="915" quality="high" allowfullscreen="true" type="application/x-shockwave-flash" src="http://static.hdslb.com/miniloader.swf" flashvars="'+ url +'" pluginspage="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash"></embed></div>'+'</div>';
            var mad;
            if(url.indexOf("acfun") >=0 ) {
                mad = playerAc;
            }else {
                mad = playerBili;
            }
            $('body').append('<div class="mask"></div>'+mad);
            $('.video').fadeIn('fast');
        });
        $('body').on('click', '.closeBnt', function(event) {
            $('.video').remove();
            $('.mask').remove();
        });
    }
    $(".proBox img").lazyload({
        threshold: 100,
        effect : "fadeIn"
    });          
});