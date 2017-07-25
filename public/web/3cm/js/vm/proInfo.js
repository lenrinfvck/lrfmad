/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("proInfo",["databus"],function(dbus){
    avalon.filters.pfilter = function(str){
        var ret = str.replace(/#/g,'、');
        return ret;
    };
    var vm = function(){
        var query = this.query;
        var user = dbus.loGet("loUser");
        var vmodel = avalon.define({
            $id: "c_proInfo",
            slide: false,
            tab: query.tab||'p3',
            pId: query.pId,
            tab2List:[],
            pModel:{
                "pName":"",
                "res":0,
                "save":0,
                "uType":0,
                "pInfo":[
                    {key:"","val":""}
                ]
            },
            fnSlide:function(){
                vmodel.slide = !vmodel.slide;
            },
//            chTab: function(num){
//                vmodel.tab = num;
//                vmodel.onload();
//            },
            res: function (type, title) {
                var url='#!/res?str='+vmodel.pModel.pInfo[0].val+'&type='+type+'&title='+title;
                dbus.open(url);
            },
//            load_tab1: function () {
//
//            },
//            load_tab2: function () {
//                dbus.load_proTab2(vmodel.pId,function(data){
//                    vmodel.tab2List = data;
//                })
//            },
            load_tab3: function () {
                dbus.load_proTab3(user.uId,vmodel.pId,function(data){
                    vmodel.pModel = data.data;
                })
            },
            fn_save: function(){
                var m = vmodel.pModel;
                dbus.fn_proSave(user.uId,vmodel.pId);
                if(m.uType&2){
                    m.save = parseInt(m.save)-1;
                    m.uType = m.uType&(~2)
                }
                else{
                    m.save = parseInt(m.save)+1;
                    m.uType = m.uType|2
                }
            },
            onload: function(){
                vmodel.load_tab3();
//                    switch (vmodel.tab){
//                        case 'p1': vmodel.load_tab1();break;
//                        case 'p2': vmodel.load_tab2();break;
//                        case 'p3': vmodel.load_tab3();break;
//                    }
            }
        });
        vmodel.onload();
    }
    return vm
});