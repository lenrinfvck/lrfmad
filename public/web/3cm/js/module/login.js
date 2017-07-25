/**
 * Created by lenrinfvck on 2015/2/6.
 */
define("login",["databus"],function(dbus){
   var vm = function(){
       var query = this.query;
       function LoUser(uId,uImg){
           this.uId = uId;
           this.uImg = uImg;
       }
       function urlFilter(arg){
           if(arg[0] === '\''){
               arg = arg.slice(1,-1);
           }
           return arg
       }
       var user = new LoUser(urlFilter(query.id), urlFilter(query.img));
       dbus.loSet("loUser",user);
   }
   return vm
});