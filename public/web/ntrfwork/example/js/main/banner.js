/**
 * Created by Administrator on 2015-04-04.
 */
define("banner", ['nm_banner','jquery'], function(Mb,$) {
    var m = function(){
        var imgList = ['img/b01.jpg', 'img/b02.jpg', 'img/b03.jpg'];
        var banner = new Mb();
        banner.init({dom : $('.nm_banner'),list : imgList});
    };
    return m
});
