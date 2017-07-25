/**
 * Created by Administrator on 2015-05-09.
 */
define("canvas", ['offcanvas','jquery'], function(Mo,$) {
    var m = function(){
        var $oc = $(".nm_offcanvas");
        $oc.offcanvas();
        $(".testBtn").click(function() {
            $oc.trigger("show");
        });
    };
    return m
});