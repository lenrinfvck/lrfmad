/**
 * widgetUI v1.0 by lenrinfvck 2014/12/25.
 *
 */
define(['jquery'],function($){
    function Widget(){
        //属性：最外层容器
        this.fnBox = null;
    }
    Widget.prototype = {
        renderUI:function(){},
        bindUI:function(){},
        syncUI:function(){},
        render:function(container){
            this.renderUI();
            this.handlers = {};
            this.bindUI();
            this.syncUI();
            //$(container || document.body).append(this.fnBox);
        },
        //销毁处理函数
        destructor:function(){},
        destroy:function(){
            this.destructor();
            this.fnBox.remove();
        }
    };
    return{
        Widget : Widget
    }
});
