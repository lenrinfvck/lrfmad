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
 *   arg.link 图片链接          [2014/12/12]
 *   arg.time 自动播放间隔
 */
function Banner(arg){
    //参数生成位置，生成图片地址数组
    this.dom = arg.dom;
    this.list = arg.list;
    this.link = arg.link||null;
    this.time = arg.time||2000;
    this.width = arg.width;
    //运行流程
    this.init();
    this.renderDOM();
    this.bindFn();
}
Banner.prototype = {
    init : function(){
        this.viewX = this.width||$(window).width();
        this.index = 0;
    },
    renderDOM : function(){
        var $this = this.dom;
        var viewX = this.viewX;
        var img = this.list;
        var link = this.link;
        var len = img.length;
        //节点html构建
        var htmlHead = '<ul class="bannerUl">';
        var html = '';
        var htmlIndex = '<ul class="bannerIndex">';
        if(link){
            for(var n in img){
                html += '<li style="background-image: url(' + img[n] + ')"><a href="'+link[n]+'" class="aboutBnt">了解详情</a></li>';
                htmlIndex +='<li></li>';
            }
            html += html;
        }else{
            for(var n in img){
                html += '<li style="background-image: url(' + img[n] + ')"></li>';
                htmlIndex +='<li></li>';
            }
            html += html;
        }
        html = htmlHead + html +'</ul>';
        htmlIndex += '</ul>';
        $this.append(html).append(htmlIndex);
        //宽度初始化
        $('.bannerUl li').width(viewX);
        $('.bannerUl').width(viewX*len*2).css('left',0);
        $('.bannerIndex').width(viewX);
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
            $ul.siblings('ul').trigger('change.index',mad%len);
        }
        this.index = index;
    },
    bindFn : function() {
        var $this = this.dom;
        var $ul = $this.find('.bannerUl');
        var self = this;
        var viewX = this.viewX;
        var len = this.list.length;
        //自动播放
        var auto = setInterval(function () {
            self.goIndex('+1');
        }, self.time);
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
            }, self.time);
        });

        //窗口随动
        $(window).resize(function(){
            viewX = self.width||$(window).width();
            self.viewX = viewX;
            $ul.find('li').width(viewX);
            $ul.find('ul').width(viewX);
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
        var width = ops.width||60;
        var height = ops.height||60;
        var html ='';
        switch (ops.type||'1'){
            case '1':
                html = '<ul class="fixBnt"><li class="mTopBnt"></li></ul>';

                break;
            case '2':
                html = '<ul class="fixBnt"><li class="mTopBnt"></li><li class="zanBnt"><span>4001</span></li><li class="caiBnt"><span>300</span></li></ul>';
                break;
        }
        $('body').append(html);
        $('.mTopBnt').css({'width':width,'height':height});
        $('.fixBnt').css('visibility','hidden');
    },
    bindFn : function(){
        var ops = this.ops;
        var limit = ops.top;
        var $bnt =$('.mTopBnt');
        var $zan =$('.zanBnt');
        var $cai =$('.caiBnt');
        var $this = $('.fixBnt');
        var zanflag =1;
        var caiflag =1;
        $(window).scroll(function(){
            var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
            if(scrollY > limit){
                $this.css('visibility','visible');
            }else{
                $this.css('visibility','hidden');
            }
        });
        $bnt.bind('click',function(){$('html,body').animate({'scrollTop':0});});
        $zan.bind('click',function(){
            if(zanflag) {
                var spa = $(this).find('span');
                var val = parseInt(spa.html());
                val++;
                spa.html(val);
                zanflag = 0;
            }
        });
        $cai.bind('click',function(){
            if(caiflag) {
                var spa = $(this).find('span');
                var val = parseInt(spa.html());
                val++;
                spa.html(val);
                caiflag = 0;
            }
        });
    }
};

/*
 *  hoverSlide by lenrinfvck 2014/12/10
 *  arg.list 条目
 *  arg.link 条目映射链接
 *  arg.width 按钮宽度  arg.height 按钮高度
 */
function HoverSlide(arg){
    this.ops = arg;
    //运行流程
    this.renderDOM();
    this.bindFn();
}
HoverSlide.prototype = {
    renderDOM : function(){
        var ops = this.ops,
            list = ops.list,
            link = ops.link,
            dom = ops.dom;
            html = '';
        html = '<ul class="userList">';
        for(var n in list){
            html += '<li><a href="'+ link[n] +'">'+ list[n] +'</a></li>'
        };
        dom.append(html);
        dom.find('.userList li').eq(0).addClass('firstLi');
        dom.find('.userList li').eq(ops.list.length-1).addClass('lastLi');
        dom.find('.userList').css({'position':'absolute','padding-top':'44px','margin-left':-dom.find('.userList').width()+dom.width(),'display':'none'});
    },
    bindFn : function(){
        var ops = this.ops,
            dom = ops.dom,
            $ul = dom.find('.userList');
        dom.hover(function(){
            if(!$ul.is(':animated')){
                $ul.css({'display':'block'}).animate({'padding-top':parseInt($ul.css('padding-top'))+5,'opacity':1},300);
            }
        },function(){
            $ul.stop().hide().css({'padding-top':'44px','opacity':0});
        });
    }
};