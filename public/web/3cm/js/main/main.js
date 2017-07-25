/**
 * 3cmMain.js by lenrinfvck on 2015/2/5.
 * info: RouterControl
 * frame: Avalon 1.3.9  zepto 1.1.6
 */
avalon.config({debug: false});
require.config({
    paths:{
        databus: "module/databus",
        mobiscroll: "plugin/mobiscroll.custom-2.14.4.min",
        zepto: "http://zeptojs.com/zepto.min",
        c_index: './vm/index',
        c_user: './vm/user',
        c_userInfo: './vm/userInfo',
        c_res:'./vm/res',
        c_shop: './vm/shop',
        c_proInfo: './vm/proInfo',
        c_proBind: './vm/proBind',
        c_iSearch: './vm/iSearch',
        c_brand: './vm/brand',
        fn_login: './module/login'
    }
});
var routerList = ["fn_login","c_index","c_user","c_userInfo","c_res","c_shop","c_proInfo","c_proBind","c_iSearch","c_brand","databus","zepto","ready!","mmState"];
require(routerList, function(fn_login,c_index,c_user,c_userInfo,c_res,c_shop,c_proInfo,c_proBind,c_iSearch,c_brand,dbus,zepto) {

    //一个顶层VM
    var vm = avalon.define({
        $id: "test",
        topShow: false,
        shareShow: false,
        topBntInit: function(){
            $(window).scroll(function(){
                var scrollY=document.documentElement.scrollTop||document.body.scrollTop;
                if(scrollY > 480){
                    vm.topShow = true;
                }else{
                    vm.topShow = false;
                }
            });
        },
        fnShare: function(){
            vm.shareShow = !vm.shareShow;
            window._bd_share_config.common.bdDUrl = location.href;
//            var data="{'url':'" + location.href + "'}";
//            $('.bdsharebuttonbox').attr('data',data);
            //vmodel.fnShareInit();
        },
        scrollTop: function(){
            $body = $("body, html");
            $body.scrollTop(0);
        }
    });
    vm.topBntInit();
    /*1*home**/
    avalon.state("home", {
        controller: "test",
        url: "/",
        views: {
            "page@": {
                templateUrl: './tpl/index.html'
            }
        },
        onChange: c_index
    });

    /*2*user**/
    avalon.state("user", {
        controller: "test",
        url: "/user",
        views: {
            "page@": {
                templateUrl: './tpl/user/user.html'
            }
        },
        onChange: c_user
    });
    avalon.state("user.pIndex",{
        controller: "c_user",
        url:"/pIndex",
        views: {
            "uPage@": {
                templateUrl: './tpl/user/u.index.html'
            }
        }
    });
    avalon.state("user.proBind", {
        controller: "c_user",
        url: "/proBind",
        views: {
            "uPage@": {
                templateUrl: './tpl/user/u.proBind.html'
            }
        },
        onChange: c_proBind
    });
    avalon.state("user.proSave", {
        controller: "c_user",
        url: "/proSave",
        views: {
            "uPage@": {
                templateUrl: './tpl/user/u.proSave.html'
            }
        }
    });
    avalon.state("user.shopSave", {
        controller: "c_user",
        url: "/shopSave",
        views: {
            "uPage@": {
                templateUrl: './tpl/user/u.shopSave.html'
            }
        }
    });

    /*3*userInfo**/
    avalon.state("userInfo", {
        controller: "test",
        url: "/userInfo",
        views: {
            "page@": {
                templateUrl: './tpl/userInfo.html'
            }
        },
        onChange: c_userInfo
    });

    /*4*res**/
    avalon.state("res", {
        controller: "test",
        url: "/res",
        views: {
            "page@": {
                templateUrl: './tpl/res.html'
            }
        },
        onChange:c_res
    });
    /*5*ad**/
    avalon.state("ad", {
        controller: "test",
        url: "/ad",
        views: {
            "page@": {
                templateUrl: './tpl/ad.html'
            }
        }
    });
    /*6*shop**/
    avalon.state("shop", {
        controller: "test",
        url: "/shop",
        views: {
            "page@": {
                templateUrl: './tpl/shop.html'
            }
        },
        onChange: c_shop
    });
    /*7*proInfo**/
    avalon.state("proInfo", {
        controller: "test",
        url: "/proInfo",
        views: {
            "page@": {
                templateUrl: './tpl/proInfo.html'
            }
        },
        onChange: c_proInfo

    });
    /*8*resSelect**/
    avalon.state("resSelect", {
        controller: "test",
        url: "/resSelect",
        views: {
            "page@": {
                templateUrl: './tpl/resSelect.html'
            }
        }
    });
    /*9*addApp**/
    avalon.state("addApp", {
        controller: "test",
        url: "/addApp",
        views: {
            "page@": {
                templateUrl: './tpl/addApp.html'
            }
        }
    });
    /*10*proBind**/
    avalon.state("proBind", {
        controller: "test",
        url: "/proBind",
        views: {
            "page@": {
                templateUrl: './tpl/proBind.html'
            }
        },
        onChange: c_proBind
    });
    /*11*appList**/
    avalon.state("appList", {
        controller: "test",
        url: "/appList",
        views: {
            "page@": {
                templateUrl: './tpl/appointList.html'
            }
        }
    });
    /*12*map**/
    avalon.state("map", {
        controller: "test",
        url: "/map",
        views: {
            "page@": {
                templateUrl: './tpl/map.html'
            }
        }
    });
    /*13*map**/
    avalon.state("addPro", {
        controller: "test",
        url: "/addPro",
        views: {
            "page@": {
                templateUrl: './tpl/addPro.html'
            }
        }
    });
    /*14*iphone*/
    avalon.state("iSearch", {
        controller: "test",
        abstract:true,
        url: "/iSearch",
        views: {
            "page@": {
                templateUrl: './tpl/iSearch/iSearch.html'
            }
        },
        onChange: c_iSearch
    });
    /*14-1*iSearch.search*/
    avalon.state("iSearch.search", {
        controller: "c_iSearch",
        url: "",
        views: {
            "iphPage@": {
                templateUrl: "./tpl/iSearch/iSearch.search.html"
            }
        }
    });
    /*14-1-0*iSearch.search.pIndex*/
    avalon.state("iSearch.search.pIndex", {
        controller: "c_iSearch",
        url: "/pIndex",
        views: {
            "v_iphSel@": {
                templateUrl: "./tpl/iSearch/iSearch.search.pIndex.html"
            }
        }
    });
    /*14-1-1*iSearch.search.pSelect*/
    avalon.state("iSearch.search.pSelect", {
        controller: "c_iSearch",
        url: "/pSelect",
        views: {
            "v_iphSel@": {
                templateUrl: "./tpl/iSearch/iSearch.search.pSelect.html"
            }
        }
    });
    /*14-2*iSearch.res*/
    avalon.state("iSearch.res", {
        controller: "c_iSearch",
        url: "",
        views: {
            "iphPage@": {
                templateUrl: "./tpl/iSearch/iSearch.res.html"
            }
        }
    });
    /*14-2-0*iSearch.res.input*/
    avalon.state("iSearch.res.input", {
        controller: "c_iSearch",
        url: "/input",
        views: {
            "v_resCon@": {
                templateUrl: "./tpl/iSearch/iSearch.res.input.html"
            },
            "v_res_title@": {
                template: '<span class="ico_apLogo"></span>苹果产品最全查询'
            }
        }
    });
    /*14-2-1*iSearch.res.code*/
    avalon.state("iSearch.res.input", {
        controller: "c_iSearch",
        url: "/code",
        views: {
            "v_resCon@": {
                templateUrl: "./tpl/iSearch/iSearch.res.code.html"
            },
            "v_res_title@": {
                template: "地区代码"
            }
        }
    });
    /*14-2-2*iSearch.res.net*/
    avalon.state("iSearch.res.net", {
        controller: "c_iSearch",
        url: "/net",
        views: {
            "v_resCon@": {
                templateUrl: "./tpl/iSearch/iSearch.res.net.html"
            },
            "v_res_title@": {
                template: "网络制式一览表"
            }
        }
    });
    /*14-2-3*iSearch.res.select*/
    avalon.state("iSearch.res.select", {
        controller: "c_iSearch",
        url: "/select",
        onBeforeLoad: function() {
            //
        },
        onAfterLoad: function() {
            //
        },
        views: {
            "v_resCon@": {
                templateUrl: "./tpl/iSearch/iSearch.res.select.html"
            },
            "v_res_title@": {
                template: "产品型号对照"
            }
        }
    });
    /*15*proList*/
    avalon.state("proList", {
        controller: "test",
        url: "/proList",
        views: {
            "page@": {
                templateUrl: './tpl/proList.html'
            }
        }
    });
    /*16*brand*/
    avalon.state("brand", {
        controller: "test",
        url: "/brand",
        views: {
            "page@": {
                templateUrl: './tpl/brand.html'
            }
        },
        onChange: c_brand
    });
    /*17*login*/
    avalon.state("login", {
        controller: "test",
        url: "/login",
        views: {
            "page@": {
                templateUrl: './tpl/login.html'
            }
        },
        onChange: fn_login

});
    avalon.history.start({
        basepath: "/mmRouter"
    });
    avalon.scan();
});