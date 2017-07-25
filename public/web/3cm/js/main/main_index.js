/**
 * m3c main_index by lenrinfvck 2014/12/25.
 */
require.config({
    baseUrl:'js',
    paths:{
        jquery : 'jquery-1.8.3.min',
        widgetUI : 'widget/widgetUI',
        Mbanner : 'module/Mbanner'
    },
    shim: {
        'jqPlug': ['jquery']
    }
});

require(['Mbanner','jquery','jqPlug'],function(Mb,$){
    var imgList = ['images/pro/1.jpg','images/pro/2.jpg','images/pro/3.jpg','images/pro/4.jpg'];
    var banner = new Mb();
    banner.init({dom : $('.mBanner'),list : imgList});
});
