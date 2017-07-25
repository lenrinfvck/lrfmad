require.config({
    baseUrl: 'js/UImodule',
    paths: {
        jquery: '../lib/jquery-1.11.0.min',
        widgetUI: '../widgetUI.module.min',
        actionsheet: 'actionsheet.module.min',
        list: 'list.module.min',
        nm_banner: 'nm_banner.module.min',
        offcanvas: 'nm_offcanvas.module.min',
        tab: 'tab.module.min',
        touch: 'touch.module.min'
    }
});

require(['jquery', 'nm_banner', 'actionsheet', 'list', 'tab', 'offcanvas', 'touch'], function($, Mb) {
    $(".nm_list").list_child();
    $(".nm_banner").each(function(){
        var $dom = $(this);
        var imgList = $dom.data('imglist').split(',');
        var banner = new Mb();
        banner.init({dom : $dom, list : imgList});
    });
    $(".nm_offcanvas").offcanvas();

//    测试初始化
    $("#bottom_04").click(function() {
        $(".nm_offcanvas").trigger("show");
    });

    $("#bottom_01").actionsheet();

    $(".js-tab").each(function() {
        $(this).tab();
    });
});