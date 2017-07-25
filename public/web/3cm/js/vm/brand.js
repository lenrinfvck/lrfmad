/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("brand",["databus"],function(dbus){
   var vm = function(){
       var query = this.query;
       var vmodel = avalon.define({
           $id: "c_brand",
           slide: false,
           tab: query.tab||'p3',
           pId: query.pId,
           tab2List:[],
           tab3List:[],
           fnSlide:function(){
               vmodel.slide = !vmodel.slide;
           },
           chTab: function(num){
               vmodel.tab = num;
               vmodel.onload();
           },
           load_tab1: function () {

           },
           load_tab2: function () {
               dbus.load_proTab2(vmodel.pId,function(data){
                   vmodel.tab2List = data;
               })
           },
           load_tab3: function () {
               dbus.load_proTab3(vmodel.pId,function(data){
                   vmodel.tab3List = data;

               })
           },
           onload: function(){
               switch (vmodel.tab){
                   case 'p1': vmodel.load_tab1();break;
                   case 'p2': vmodel.load_tab2();break;
                   case 'p3': vmodel.load_tab3();break;
               }
           }
       });
       vmodel.onload();
   }
   return vm
});