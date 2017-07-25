/**
 * Created by SignalReal-2 on 2014/12/5.
 */
var navScroll=function(){
    var $search=$('header'),
        $topBnt=$('.top');
    $(window).scroll(function(){
        var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
        if(scrollY > 310){
            $search.show();
            $topBnt.show();
        }else{
            $search.hide();
            $topBnt.hide();
        }
    });
};
/*
 * bindTouch by lenrinfvck 2014/12/9.
 */
jQuery.fn.bindTouch = function(limit,bindfn){
    var $this = $(this);
    var viewX = $(window).width();
    //触摸开始函数
    var start = function (e) {
        //记录手指按下的坐标
        $this.startX = e.originalEvent.targetTouches[0].pageX;
        //清除偏移量
        $this.offsetX = 0;
    };
    //触摸移动函数
    var move = function (e) {
        e.preventDefault();
        e.stopPropagation();
        $this.offsetX = e.originalEvent.changedTouches[0].pageX  - $this.startX;
        $this.trigger('touch.move',$this.offsetX);
    };
    //触摸结束函数
    var end = function (e) {
        e.preventDefault();
        limit = limit||(viewX)/6;
        $this.endOffset = e.originalEvent.changedTouches[0].pageX  - $this.startX;
        if($this.endOffset >= limit){
            $this.trigger('touch.right',$this.endOffset);
        }else if($this.endOffset <= -limit){
            $this.trigger('touch.left',$this.endOffset);
        }else{
            $this.trigger('touch.small',$this.endOffset);
        }
    };
    $this.bind('touchstart', start);
    $this.bind('touchmove', move);
    $this.bind('touchend', end);
};

/*
 * Mbanner by lenrinfvck 2014/12/5.
 */
function Mbanner(arg){
    //参数生成位置，生成图片地址数组
    this.dom = arg.dom;
    this.list = arg.list;
    this.box = arg.box;
    //运行流程
    this.init();
    this.renderDOM();
    this.bindFn();
}
Mbanner.prototype = {
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
            html += '<li><img src="'+img[n]+'" width="100%" /></li>';
            htmlIndex +='<li></li>';
        }
        html += '</ul>';
        htmlIndex += '</ul>';
        $this.append(html).append(htmlIndex);
        //宽度初始化
        $('.bannerUl li').width(viewX);
        $('.bannerUl').width(viewX*len).css({'transform' :'translate3d(0px,0,0)','webkit-transform' :'translate3d(0px,0,0)'});
        $('.bannerIndex li').eq(0).addClass('active');
    },
    goIndex : function(mad){
        var $this = this.dom;
        var viewX = this.viewX;
        var $ul = $this.find('.bannerUl');
        var index = this.index;
        var len = this.list.length;
        var setTrans = function(trans,time){
            $ul.css({'transform' :'translate3d(-'+trans+'px,0,0)','webkit-transform' :'translate3d(-'+trans+'px,0,0)','transition-duration': time+'s','-webkit-transition-duration': time+'s'})
        };
        if(typeof (mad) == 'string'){
            switch(mad){
                case '+1':
                    index = index - 1;
                    index = index%(len);
                    setTrans(-viewX*index,0.2);
                    $ul.siblings('ul').trigger('change.index',-index);
                    break;
                case '-1':
                    index = index + 1;
                    if(index > 0)
                        index=-len+1;
                    setTrans(-viewX*index,0.2);
                    $ul.siblings('ul').trigger('change.index',-index);
                    break;
                case '0' :
                    setTrans(-viewX*index,0.2);
                    break;
            }
        }else if(typeof (mad) == 'number'){
            //自定义index跳转
        }
        this.index = index;
    },
    bindFn : function() {
        var $this = this.dom;
        var $ul = $this.find('.bannerUl');
        var self = this;
        var viewX = this.viewX;
        var len = this.list.length;

        $this.bindTouch();

        var indexChange = function(e,index){
            $this.find('.bannerIndex li').removeClass('active').eq(index).addClass('active');
        };
        var move = function(e,offset){
            var index = self.index;
            e.preventDefault();
            e.stopPropagation();
            clearInterval(auto);
            $ul.css({'transform':'translate3d('+(index*viewX+offset)+'px,0,0)','-webkit-transform' :'translate3d('+(index*viewX+offset)+'px,0,0)','transition-duration': '0s','-webkit-transition-duration': '0s'});
        };

        $this.bind('touch.left', function(){self.goIndex('+1');auto = setInterval(function(){self.goIndex('+1')},2000);});
        $this.bind('touch.right', function(){self.goIndex('-1');auto = setInterval(function(){self.goIndex('+1')},2000);});
        $this.bind('touch.small', function(){self.goIndex('0');auto = setInterval(function(){self.goIndex('+1')},2000);});
        $this.bind('touch.move', move);

        //banner底部圆点随动
        $this.find('.bannerIndex').bind('change.index',indexChange);
        //自动播放
        var auto = setInterval(function(){self.goIndex('+1')},2000);

        /*
         //transform字符串获取，可用index计算以替换
         var getTrans = function(){
         if($ul.css('transform')) {
         return $ul.css('transform').slice('matrix'.length).split(',')[4];
         }else if($ul.css('-webkit-transform')){
         return $ul.css($ul.css('-webkit-transform')).slice('translate3d'.length).split(',')[0].slice(0,-3);
         }
         };
         var transX = parseInt(getTrans());
         */
        /*
        //触摸开始函数
        var start = function (e) {
            //记录手指按下的坐标
            self.startX = e.originalEvent.targetTouches[0].pageX;
            //清除偏移量
            self.offsetX = 0;
            transX = parseInt(getTrans());
        };
        //触摸移动函数
        var move = function (e) {
            e.preventDefault();
            e.stopPropagation();
            self.offsetX = e.originalEvent.changedTouches[0].pageX  - self.startX;
            $ul.css({'transform':'translate3d('+(transX+self.offsetX)+'px,0,0)','-webkit-transform' :'translate3d('+(transX+self.offsetX)+'px,0,0)','transition-duration': '0s','-webkit-transition-duration': '0s'});
        };
        //触摸结束函数
        var end = function (e) {
            e.preventDefault();
            var limit = (viewX)/6;
            self.endOffset = e.originalEvent.changedTouches[0].pageX  - self.startX;
            if(self.endOffset >= limit){
                self.goIndex('-1');
            }else if(self.endOffset <= -limit){
                self.goIndex('+1');
            }else{
                self.goIndex('0');
            }
        };
        //事件绑定
        $this.bind('touchstart', start);
        $this.bind('touchmove', move);
        $this.bind('touchend', end);*/
    }
};