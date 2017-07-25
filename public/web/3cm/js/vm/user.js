/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("user",["databus"], function(dbus){
    var vm = function(){
        var user = dbus.loGet("loUser");
        if(!avalon.vmodels.c_user){
        var vmodel = avalon.define({
            $id: "c_user",
            uModel:{
                uId:user.uId,
                uImg:user.uImg
            },
            title:'我关注的店',
            isInput:false,
            chPage: function(p){
                switch (p){
                    case 'pIndex': dbus.open('#!/user/pIndex');break;
                    case 'proBind': dbus.open('#!/user/proBind');break;
                    case 'proSave': dbus.open('#!/user/proSave');break;
                    case 'shopSave': dbus.open('#!/user/shopSave');break;
                    case 'uInfo': dbus.open('#!/user/uInfo');break;
                    //case 'pResSel': dbus.open('#!/iSearch/select');break;
                }
                //vmodel.tab=p;
                vmodel.scro_blur();
            },
            click_li: function(sId){
                dbus.open('#!/shop?sId='+sId);
            },
            go: function(pId){
                dbus.open('#!/proInfo?pId='+pId);
            },
            onload: function(){
                dbus.load_user(user.uId,function(data){
                    vmodel.uModel = data.data;
                    vmodel.uModel.uName = vmodel.uModel.uName||'西格瑞诺';
                });
            }
        });
        vmodel.onload();
        }
    };
    return vm
});
//vmodel.uModel = $.extend(vmodel.uModel,data);
//console.log(vmodel.uModel);