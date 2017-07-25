/**
 * banner by lenrinfvck on 2014/11/11.
 */
var viewX=document.documentElement.clientWidth;
var viewY=document.documentElement.clientHeight;

var animeShowInit=function(){
    $('.animeShow,.showThing').css('height', viewY-$('.topBar').height());
    $('.showThing').css('width', viewX);
};
/*
*   轮播banner by lenrinfvck 2014/10/26
*   动画演绎，渐转场，循环
*/
var playInit=function(page,timeout){
    var autoPlay=function(){
        var index=($('.playThing').index($('.playing'))+1)%page;
        $('.playBnt li').eq(index).click();
    };
    playBnt='<ul class="playBnt">';
    for(var i=0,j=$('.playThing').length;i<j;i++){
        playBnt+='<li></li>';
    }
    playBnt+='</ul>';
    $('.playCenter').append(playBnt);
    $('.playBnt li').eq(0).css({
        'background': '#fff'
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
                        'left': '-50%',
                        'bottom': pos.yout},
                    600
                );
            });
            $act.css({
                'display':'none',
                'z-index':'3'
            }).addClass('playing').fadeIn('700',function(){
                $act.siblings('.playing').css('z-index', '1').removeClass('playing');
                $('.playBnt li').css('background', '#c9caca').eq($('.playThing').index($('.playing'))).css('background', '#fff');
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
            auto=setTimeout(autoPlay,timeout);
        });
    });
    var auto=setTimeout(autoPlay,timeout);
};
/*
*   dialog中图片预览
*/
var photoInit=function(){
    var num=$('.allPhoto li').length,
        $box=$('.photoBox');
    $('.allPhoto').width($('.allPhoto li').width()*num);
    $box.after('<div class="lBnt"></div><div class="rBnt"></div>');
    $('div.lBnt,div.rBnt').bind('click',function(){
        var $all=$('.allPhoto');
        var $offset = $('.allPhoto li').width();
        var min=-$offset+'px';
        var max=-$all.width()+2*$offset+'px';
        if(!$all.is(':animated')) {
            if ($(this).attr('class') === 'lBnt') {
                $all.animate({'left': '+=' + $offset + 'px'}, '150');
                bntHide(0);
            } else if ($(this).attr('class') === 'rBnt') {
                $all.animate({'left': '-=' + $offset + 'px'}, '150');
                bntHide(1);
            }
        }
        function bntHide(type){
            var left=$all.css('left');
            if(type==0){
                if(left===min){
                    $('.lBnt').fadeOut()}
                else $('.lBnt,.rBnt').fadeIn();
            }else {
                if (left === max) {
                    $('.rBnt').fadeOut()
                }
                else $('.lBnt,.rBnt').fadeIn();
            }
        }
    });
};
/*
*   nav响应
*/
var navScroll=function(){
    var $search=$('.search');
    $(window).scroll(function(){
        var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollY > 250){
            $('.search').slideUp();
        }else{
            $('.search').slideDown(150);
        }
    });
    $('.nav').hover(function(){
        if(!$search.is(':animated'))
            $('.search').slideDown(250);
    },function(){
        if(!$search.is(':animated'))
            $('.search').slideDown(250);
    })
};
/*
 *   banner by lenrinfvck 2014/12/9
 *   滚动轮播，循环
 *   arg.dom 目标dom   <div class="banner"></div>，jq对象
 *   arg.list 图片地址数组
 */
function Banner(arg){
    //参数生成位置，生成图片地址数组
    this.dom = arg.dom;
    this.list = arg.list;
    //运行流程
    this.init();
    this.renderDOM();
    this.bindFn();
}
Banner.prototype = {
    init : function(){
        this.viewX = $(window).width();
        this.index = 0;
    },
    renderDOM : function(){
        var $this = this.dom;
        var viewX = this.viewX;
        var img = this.list;
        var len = img.length;
        //节点html构建
        var html = '<ul class="bannerUl">';
        var htmlIndex = '<ul class="bannerIndex">';
        for(var n in img){
            html += '<li><img src="'+img[n]+'" height="100%" /></li>';
            htmlIndex +='<li></li>';
        }
        for(var n in img){
            html += '<li><img src="'+img[n]+'" height="100%" /></li>';
        }
        html += '</ul>';
        htmlIndex += '</ul>';
        $this.append(html).append(htmlIndex);
        //宽度初始化
        $('.bannerUl li').width(viewX);
        $('.bannerUl').width(viewX*len*2).css('left',0);
        $('.bannerIndex li').eq(0).addClass('active');
    },
    goIndex : function(mad){
        var $this = this.dom;
        var viewX = this.viewX;
        var $ul = $this.find('.bannerUl');
        var index = this.index;
        var len = this.list.length;
        var left = parseInt($ul.css('left'));
        if(typeof (mad) == 'string'){
            switch(mad){
                case '+1':
                    index = index + 1;
                    if(index >= len*2){
                        $ul.css({'left':-(len-1)*viewX});
                        index = len;
                        $ul.animate({'left':-viewX*index},'600');
                    }else{
                        $ul.animate({'left':-viewX*index},'600');
                    }
                    $ul.siblings('ul').trigger('change.index',index%len);
                    break;
                case '-1':
                    index = index + 1;
                    if(index > 0)
                        index=-len+1;
                    setAnime(-index);
                    $ul.siblings('ul').trigger('change.index',index%len);
                    break;
                case '0' :
                    setAnime(-index);
                    break;
            }
        }else if(typeof (mad) == 'number'){
            index = mad;
            $ul.animate({'left':-viewX*index},'600');
            $ul.siblings('ul').trigger('change.index',index%len);
        }
        this.index = index;
    },
    bindFn : function() {
        var $this = this.dom;
        var $ul = $this.find('.bannerUl');
        var self = this;
        var viewX = this.viewX;
        var len = this.list.length;
        var auto = setInterval(function () {
            self.goIndex('+1');
        }, 2000);
        var indexChange = function (e, index) {
            $this.find('.bannerIndex li').removeClass('active').eq(index).addClass('active');
        };
        //banner底部圆点随动
        $this.find('.bannerIndex').bind('change.index', indexChange);
        $this.find('.bannerIndex').on('click','li',function(){
            clearInterval(auto);
            self.goIndex($(this).index());
            auto = setInterval(function () {
                self.goIndex('+1');
            }, 2000);
        });
        //自动播放

        $(window).resize(function(){
            viewX =  $(window).width();
            self.viewX = viewX;
            $ul.find('li').width(viewX);
            $ul.width(viewX*len*2).css('left',0);
        });
    }
};
/*
 *  topBnt by lenrinfvck 2014/12/10
 *  arg.top 出现界限
 *  arg.width 按钮宽度  arg.height 按钮高度
 */
function TopBnt(arg){
    this.ops = arg;
    //运行流程
    this.renderDOM();
    this.bindFn();
}
TopBnt.prototype = {
    renderDOM : function(){
        var ops = this.ops;
        var width = ops.width||50;
        var height = ops.height||50;
        var html = '<div class="mTopBnt"></div>';
        $('body').append(html);
        $('.mTopBnt').css({'width':width,'height':height,'display':'none'});
    },
    bindFn : function(){
        var ops = this.ops;
        var limit = ops.top;
        var $bnt =$('.mTopBnt');
        $(window).scroll(function(){
            var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollY > limit){
                $bnt.show();
            }else{
                $bnt.hide();
            }
        });
        $bnt.bind('click',function(){$('html,body').animate({'scrollTop':0});})
    }
};
