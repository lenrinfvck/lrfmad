/*
 * Mbanner moudle重构 by lenrinfvck 2014/12/25.
 * cfg.dom : 目标DOM
 * cfg.list : 轮播图片列表
 * cfg.box : 轮播图片大小(暂未实现)
 */
define(['jquery','widgetUI'],function($,widget){
    function Mbanner(){
        //参数生成位置，生成图片地址数组
        this.cfg = {
            viewX : $(window).width(),
            index :0,
            dom :$('body'),
            list :[]
        };
    }
    Mbanner.prototype = $.extend({},new widget.Widget(),{
        init : function(cfg){
            //运行流程
            this.cfg = $.extend({},this.cfg, cfg);
            this.render();
        },
        renderUI : function(){
            var $this = this.cfg.dom;
            console.log($this,this.cfg.list);
            var viewX = this.cfg.viewX;
            var img = this.cfg.list;
            var len = img.length;
            //节点html构建
            var html = '<ul class="bannerUl">';
            var htmlIndex = '<ul class="bannerIndex">';
            for(var n in img){
                html += '<li style="background-image: url('+img[n]+')"></li>';
                htmlIndex +='<li></li>';
            }
            html += '</ul>';
            htmlIndex += '</ul>';
            $this.append(html).append(htmlIndex);
            //宽度初始化
            if(viewX < 320){
                viewX = 320;
            }
            $('.bannerUl li').width(viewX);
            $('.bannerUl').width(viewX*len).css({'transform' :'translate3d(0px,0,0)','webkit-transform' :'translate3d(0px,0,0)'});
            $('.bannerIndex li').eq(0).addClass('active');
        },
        goIndex : function(mad){
            var $this = this.cfg.dom;
            var viewX = this.cfg.viewX;
            var $ul = $this.find('.bannerUl');
            var index = this.cfg.index;
            var len = this.cfg.list.length;
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
            this.cfg.index = index;
        },
        bindUI : function() {
            var $this = this.cfg.dom;
            var $ul = $this.find('.bannerUl');
            var self = this;
            var viewX = this.cfg.viewX;
            var len = this.cfg.list.length;
            //jq触摸自定义事件
            $this.bindTouch();

            var indexChange = function(e,index){
                $this.find('.bannerIndex li').removeClass('active').eq(index).addClass('active');
            };
            var move = function(e,offset){
                var index = self.cfg.index;
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
            //窗口随动
            $(window).resize(function(){
                viewX = $(window).width();
                if(viewX >= 320){
                    self.cfg.viewX = viewX;
                    $ul.find('li').width(viewX);
                    $ul.width(viewX*len).css('left',0);
                }
            });
        }
    });
    return Mbanner
});

