/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("index",["databus"], function(dbus){
   var vm = function(){
       var user = dbus.loGet("loUser");
       if (!avalon.vmodels.c_index){
           var vmodel = avalon.define({
               $id: "c_index",
               searchVal: "",
               $uImg: user.uImg||"images/logo.png",
               hotLink: [],
               hotLinkShow:[],
               inputList:[],
               isInput: false,
               onSlide:true,
               fnSubmit:function(arg){
                   if(arg.str){
                       window.open('#!/res?str='+arg.str+'&type=0','_self');
                       vmodel.inputList = [];
                       vmodel.isInput = false;
                   }
                   else if(vmodel.searchVal) {
                       var srh = vmodel.inputList.$model;
                       if(srh.length>1){
                           dbus.open('#!/res?str='+vmodel.searchVal+'&type=0');
                           vmodel.isInput = false;
                       }else if(vmodel.inputList.length==1){
                           vmodel.go(srh[0]);
                       }else{
                           alert("对不起，未找到相关内容");
                       }
                       //vmodel.inputList = [];
                   }
                   else {
                       alert("请输入搜索内容");
                   }
               },
               fnEnter:function(e){
                   if(e.keyCode == 13)
                       vmodel.fnSubmit(false);
               },
               fnChangehot:function(){
                   var len = vmodel.hotLink.length;
                   if(vmodel.hotLinkShow[7] == vmodel.hotLink[7])
                       vmodel.hotLinkShow = vmodel.hotLink.slice(len-8);
                   else
                       vmodel.hotLinkShow = vmodel.hotLink.slice(0,8);
               },
               go: function(search){
                   switch (search.linkType){
                       case 'shop':dbus.open('#!/shop?sId='+search.value);break;
                       case 'pro':dbus.open('#!/proInfo?pId='+search.value);break;
                       case 'search':dbus.open('#!/res?str='+search.value);break;
                       case 'brand':dbus.open('#!/brand?bId='+search.value);break;
                   }
                   vmodel.inputList = [];
                   vmodel.isInput = false;
               },
               scro_focus: function(){
                   vmodel.isInput = true;
               },
               scro_blur: function(){
                   vmodel.isInput = false;
                   vmodel.inputList.removeAll();
                   vmodel.searchVal='';
               },
               fnSlide: function(num){
                   vmodel.onSlide= !vmodel.onSlide;
               },
               onload: function () {
                   dbus.load_index(function(data){
                       vmodel.hotLink = data.data;
                       vmodel.hotLinkShow = vmodel.hotLink.slice(0,8);
                       uImg = data.uImg;

                   });
               }
           });
           vmodel.$watch("searchVal",function(newValue){
               dbus.inputAjax(newValue,function(data){
                   if(data.data)
                    vmodel.inputList=data.data;
                   else
                    vmodel.inputList=[];
               })
           });
           vmodel.onload();
       }else{
           //vmodel.onload();
       }
   };
   return vm
});