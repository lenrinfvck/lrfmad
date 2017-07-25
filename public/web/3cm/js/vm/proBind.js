/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("proBind",["databus","zepto"],function(dbus,zepto){
   var vm = function(){
       //if (!avalon.vmodels.c_proBind){
       var user = dbus.loGet("loUser");
       var vmodel = avalon.define({
           $id: "c_proBind",
           flexModel: false,
           addModel: false,
           editModel: false,
           addApp:-1,
           //isInput:false,
           send_addModel:{
               uId: user.uId,
               brand:'default',
               pId:'default',
               buyShop:'',
               uTel:'',
               active:''
           },
           scro_focus: function(){
               avalon.vmodels.c_user.isInput = true;
           },
           scro_blur: function(){
               avalon.vmodels.c_user.isInput = false;
           },
           send_clear: function(){
               vmodel.send_addModel = {uId: user.uId,brand:'default',pId:'default',buyShop:'',uTel:'',active:''};
           },

           //我要预约
           fnAddApp:function(n){
               vmodel.addApp = n;
           },
           fnBindBack:function(){
               vmodel.addApp = -1;
           },
           fnBindSub:function(){
               alert("提交成功");
               vmodel.addApp = -1;
           },
           //增加提交
           fnAddBox:function(){
               if(!vmodel.flexModel) {
                   vmodel.flexModel=vmodel.addModel=true;
                   vmodel.send_clear();
                   vmodel.fnSubmit=vmodel.fnAddSub;
               }
           },
           fnSubmit:function(){},
           fnAddSub:function(){
               dbus.send_addPro(vmodel.$model.send_addModel,function(){
                   console.log("添加",vmodel.$model.send_addModel);
                   alert("增加成功");
                   vmodel.flexModel =vmodel.addModel = false;
               });
           },
           fnAddBack:function(){
               vmodel.flexModel =vmodel.addModel=vmodel.editModel= false;
           },
           //修改
           fnEditBox:function(el){
               if(!vmodel.flexModel) {
                   vmodel.send_addModel = {
                       uId: user.uId,
                       brand:el.brand,
                       pId:el.pId,
                       buyShop:el.buyShop,
                       uTel:el.uTel,
                       active:el.active
                   };
                   //vmodel.send_addModel = $.extend(false,{},vmodel.send_addModel,el);
                   vmodel.flexModel=vmodel.editModel=true;
                   vmodel.fnSubmit=vmodel.fnEditSub;
               }
           },
           fnEditSub:function(){
               dbus.send_editPro(vmodel.$model.send_addModel,function(){
                   console.log("修改",vmodel.$model.send_addModel);
                    alert("修改成功");
                    vmodel.flexModel =vmodel.editModel= false;
               });
           },
           onload: function () {
           }
       });
       //vmodel.onload();
   }
   return vm
});