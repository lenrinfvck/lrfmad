/**
 * Created by Administrator on 2015-04-06.
 */
define("c_switch", function(){
    var vm = function(){
        var vmodel = avalon.define({
            $id: "c_switch",
            s1: false,
            s2: false,
            s3: true,
            s4: false,
            s5: true,
            s6: false,
            con: function() {
                console.log(vmodel.s3);
            }
        });
    };
    return vm
});