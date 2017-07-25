/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("shop",["databus","zepto"],function(dbus,zepto){
   var vm = function(){
       var query = this.query;
       var user = dbus.loGet("loUser");
//       if (!avalon.vmodels.c_proInfo){
       var vmodel = avalon.define({
           $id: "c_shop",
           moreInfo: false,
           sModel:{
               sId: query.sId,
               sName:"",
               uType:0,
               pos:"",
               tel:"",
               service:[],
               reg:false,
               zan:0,
               save:0
           },
           fnMore:function(){
               vmodel.moreInfo = !vmodel.moreInfo;
           },

           fnSave: function(){
               var m = vmodel.sModel;
               dbus.fn_save(m.sId,user.uId);
               if(m.uType&4){
                   m.save = parseInt(m.save)-1;
                   m.uType = m.uType&(~4)
               }
               else{
                   m.save = parseInt(m.save)+1;
                   m.uType = m.uType|4
               }
           },
           fnZan: function(){
               var m = vmodel.sModel;
               dbus.fn_zan(m.sId,user.uId);
               if(m.uType&2){
                   m.zan = parseInt(m.zan)-1;
                   m.uType = m.uType&(~2)
               }
               else{
                   m.zan = parseInt(m.zan)+1;
                   m.uType = m.uType|2
               }
           },
           onload: function(){
                dbus.load_shop(vmodel.sModel.sId,user.uId,function(data){
                    vmodel.sModel=data.data;
                });
           }
       });
       vmodel.onload();

   }
   return vm
});