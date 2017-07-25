/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("res",["databus"],function(dbus){
   var vm = function(){
       var query = this.query;
//       if (!avalon.vmodels.c_res) {
           var vmodel = avalon.define({
               $id: "c_res",
               resList: [],
               searchVal: query.str,
               title: query.str+query.title,
               type: query.type || 0,       //
               click_li: function (sId) {
                   window.open('#!/shop?sId=' + sId, '_self');
               },
               mapModel: function () {
                   window.open('#!/map?str=' + vmodel.searchVal + '&type=' + vmodel.type, '_self');
               },
               onload: function () {
                   dbus.load_search(vmodel.searchVal, vmodel.type, function (data) {
                       vmodel.resList = data.data;
                   })
               }
           });
           vmodel.onload();
//       }else{
//           vmodel.onload();
//       }
   };
   return vm
});