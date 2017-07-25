$(document).ready(function() {
    var $body = $("html, body");
    function topBntSet(){
        var viewY=document.documentElement.clientHeight;
        var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollY>200)
            $('div.topBnt').fadeIn('fast');
        else
            $('div.topBnt').fadeOut('fast');
    }

    $(window).scroll(topBntSet);

    $('.topBnt').click(function(){
        $body.animate({scrollTop:0}, '200');
    });
});
