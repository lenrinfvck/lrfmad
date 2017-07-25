/**
 * Created by SignalReal-2 on 2015/1/4.
 */
/*
 * bindTouch by lenrinfvck 2014/12/9.
 * limit : 滑动距离界限
 * 效果 : [触发自定义事件] 右滑-touch.right ， 左滑动-touch.left ， 轻微滑动-touch.small ， 未touchend前的移动-touch.move
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
 * jQuery plugin scroTrans by lenrinfvck 2014/11/13.
 */
jQuery.fn.scroTrans = function(end,time){
    var scrollY=document.documentElement.scrollTop||document.body.scrollTop,
        viewY=document.documentElement.clientHeight,
        $body = $("body, html"),
        endTop=end.offset().top;
    $(this).click(function(){
        $body.animate({scrollTop:endTop},time);
    })
};