/**
 * 3cmMain.js by lenrinfvck on 2015/2/5.
 * info: RouterControl
 * frame: Avalon 1.3.9  zepto 1.1.6
 */
avalon.config({debug: false});
require.config({
    paths:{
        jquery: "jquery-1.11.0.min",
        home: "../main/home",
        banner: "../main/banner",
        switch: "../main/switch",
        list: "../../../dist/assets/js/UImodule/list.module.min",
        nm_banner: "../../../dist/assets/js/UImodule/nm_banner.module.min",
        widgetUI: "../../../assets/js/widgetUI.module.min",
        actionsheet: "../../../dist/assets/js/UImodule/actionsheet.module.min",
        offcanvas: "../../../dist/assets/js/UImodule/nm_offcanvas.module.min",
        range: "../../../dist/assets/js/UImodule/range.module.min",
        touch: "../../../assets/js/UImodule/touch.module.min",
        main_action: "../main/main_action",
        main_range: "../main/main_range",
        canvas: "../main/main_offcanvas"
    }
});
var routerList = ["jquery","switch","ready!","mmState"];
require(routerList, function($, c_switch) {
    //一个顶层VM
    var vm = avalon.define({
        $id: "demo"
    });
    /*1*home**/
    avalon.state("home", {
        controller: "demo",
        url: "/",
        views: {
            "page@": {
                templateUrl: "./tpl/home.html"
            }
        },
        onAfterLoad: function(){
            require(["home"], function(m){
                m();
            });
            $("body").unbind();
            $(".nm_mask").remove();
        }
    });
    /**list*/
    avalon.state("list1", {
        controller: "demo",
        url: "/list1",
        views: {
            "page@": {
                templateUrl: "./tpl/list/list1.html"
            }
        },
        onAfterLoad: function(){}
    });
    avalon.state("list2", {
        controller: "demo",
        url: "/list2",
        views: {
            "page@": {
                templateUrl: "./tpl/list/list2.html"
            }
        },
        onAfterLoad: function(){
            require(["home"], function(m){
                m();
            });
        }
    });
    /**accordion*/
    avalon.state("accordion", {
        controller: "demo",
        url: "/accordion",
        views: {
            "page@": {
                templateUrl: "./tpl/accordion.html"
            }
        },
        onAfterLoad: function(){
            require(["home"], function(m){
                m();
            });
        }
    });
    /**badge*/
    avalon.state("badge", {
        controller: "demo",
        url: "/badge",
        views: {
            "page@": {
                templateUrl: "./tpl/badge.html"
            }
        },
        onAfterLoad: function(){}
    });
    /**button1*/
    avalon.state("btn1", {
        controller: "demo",
        url: "/button1",
        views: {
            "page@": {
                templateUrl: "./tpl/button/btn1.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("btn2", {
        controller: "demo",
        url: "/button2",
        views: {
            "page@": {
                templateUrl: "./tpl/button/btn2.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("btn3", {
        controller: "demo",
        url: "/button3",
        views: {
            "page@": {
                templateUrl: "./tpl/button/btn3.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("btn4", {
        controller: "demo",
        url: "/button4",
        views: {
            "page@": {
                templateUrl: "./tpl/button/btn4.html"
            }
        },
        onChange: function(){}
    });

    /**form*/
    avalon.state("checkbox", {
        controller: "demo",
        url: "/form-checkbox",
        views: {
            "page@": {
                templateUrl: "./tpl/form/checkbox.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("radio", {
        controller: "demo",
        url: "/form-radio",
        views: {
            "page@": {
                templateUrl: "./tpl/form/radio.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("select", {
        controller: "demo",
        url: "/form-select",
        views: {
            "page@": {
                templateUrl: "./tpl/form/select.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("input", {
        controller: "demo",
        url: "/form-input",
        views: {
            "page@": {
                templateUrl: "./tpl/form/input.html"
            }
        },
        onChange: function(){}
    });
    avalon.state("range", {
        controller: "demo",
        url: "/form-range",
        views: {
            "page@": {
                templateUrl: "./tpl/form/range.html"
            }
        },
        onAfterLoad: function() {
            require(["main_range"], function(m) {
                m();
            });
        }
    });
    //dialog
    avalon.state("dialog", {
        controller: "demo",
        url: "/dialog",
        views: {
            "page@": {
                templateUrl: "./tpl/dialog.html"
            }
        },
        onChange: function(){}
    });

    /**banner*/
    avalon.state("banner", {
        controller: "demo",
        url: "/banner",
        views: {
            "page@": {
                templateUrl: "./tpl/banner.html"
            }
        },
        onAfterLoad: function(){
            require(["banner"], function(m){
                m();
            });
        }
    });

    /**grid*/
    avalon.state("grid3x3", {
        controller: "demo",
        url: "/grid3x3",
        views: {
            "page@": {
                templateUrl: "./tpl/grid/grid3x3.html"
            }
        },
        onAfterLoad: function(){}
    });
    avalon.state("grid", {
        controller: "demo",
        url: "/grid",
        views: {
            "page@": {
                templateUrl: "./tpl/grid/grid.html"
            }
        },
        onAfterLoad: function(){}
    });

    /**icon*/
    avalon.state("icon", {
        controller: "demo",
        url: "/icon",
        views: {
            "page@": {
                templateUrl: "./tpl/icon.html"
            }
        },
        onAfterLoad: function(){}
    });

    /**actionsheet*/
    avalon.state("actionsheet", {
        controller: "demo",
        url: "/actionsheet",
        views: {
            "page@": {
                templateUrl: "./tpl/actionsheet.html"
            }
        },
        onAfterLoad: function(){
            require(["main_action"], function(m){
                m();
            });
        }
    });

    /**switch*/
    avalon.state("switch", {
        controller: "demo",
        url: "/switch",
        views: {
            "page@": {
                templateUrl: "./tpl/switch.html"
            }
        },
        onChange: c_switch
    });

    /**font*/
    avalon.state("font", {
        controller: "demo",
        url: "/font",
        views: {
            "page@": {
                templateUrl: "./tpl/font.html"
            }
        }
    });

    /**offcanvas*/
    avalon.state("offcanvas", {
        controller: "demo",
        url: "/offcanvas",
        views: {
            "page@": {
                templateUrl: "./tpl/offcanvas.html"
            }
        },
        onAfterLoad: function() {
            require(["canvas"], function(m) {
                m();
            });
        }
    });



    avalon.history.start({
        basepath: "/mmRouter"
    });
    avalon.scan();
});