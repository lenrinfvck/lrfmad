/**
 * Created by Administrator on 2015-05-10.
 */
define("range", ['range','jquery'], function(range,$) {
    var m = function(){
        var $rangelist = $(".nm_range");
        $rangelist.each(function() {
            $(this).range();
        });
    };
    return m
});