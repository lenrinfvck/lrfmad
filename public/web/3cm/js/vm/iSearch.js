/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("iSearch",["databus"],function(dbus){
    var vm = function(){
        //avalon.router.go("iSearch.search");
        if(!avalon.vmodels.c_iSearch){
            var lastPage;
            var vmodel = avalon.define({
                $id: "c_iSearch",
                iph: "",
                uImg: "images/logo.png",
                pTitle: "",
                isInput: false,
                onSelect: false,
                tab1List:[],
                p4res: {
                    "iPhone":["iPhone 6 8G 黑色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色","iPhone 6 8G 金色","iPhone 6 8G 白色","iPhone 6 8G 金色"],
                    "MacBook Air":["MacBook Air"],
                    "iPad":["iPad4","iPad Air"],
                    "MacBook Pro":["MacBook Pro"],
                    "iMac":["iMac"],
                    "Mac mini":["Mac mini"],
                    "iPod touch":["iPod touch"],
                    " ":[""]
                },
                p5resList:[
                    //["MF265CH/A","A1431","中国","移动/联通","无","支持","通用"],
                    //["MB543xx/A","1.6GHz","2GB","120GB","9400M","1280X800","2008"]
                    //["MD720XX/A","AS","wifi","1136X640","4.0/Retina屏","500/120万","2012.09"],
                    ["MB462xx/A","i2","2.0GHz","1GB","120GB","9400GM","2009"]
                ],
                p6List:[
                    {title:"美版T-Mobile",list:[1,0,0,0,1,1]},
                    {title:"美版Verizon",list:[1,1,0,0,1,1]},
                    {title:"美版AT&T",list:[1,1,0,0,1,1]},
                    {title:"美版Sprint",list:[1,1,1,1,1,1]},
                    {title:"日版",list:[1,1,1,1,1,1]},
                    {title:"港版",list:[1,0,1,1,1,1]},
                    {title:"国行联通",list:[1,1,1,1,1,1]},
                    {title:"国行电信",list:[1,1,1,1,1,1]},
                    {title:"国行移动",list:[1,0,1,1,2,2]}
                ],
                p4Select_1:'',
                p4Select_2:'',
                p4Select_2List: [],
                chTab: function(num){
                    if(num === 'p1'&& !vmodel.tab1List[0]){
                        alert("请先输入序列号");
                        vmodel.chPage('p3');
                        //vmodel.tab = 'p3';
                        //vmodel.inputPage = !vmodel.inputPage;
                    }else {
                        vmodel.chPage(num);
                        //vmodel.tab = num;
                    }
                },
                chPage: function(p){
                    switch (p){
                        case 'pIndex': dbus.open('#!/iSearch/pIndex');break;
                        case 'pSelect': dbus.open('#!/iSearch/pSelect');break;
                        case 'pRes': dbus.open('#!/iSearch/input');break;
                        case 'pCode': dbus.open('#!/iSearch/code');break;
                        case 'pNet': dbus.open('#!/iSearch/net');break;
                        case 'pResSel': dbus.open('#!/iSearch/select');break;
                    }
                    //vmodel.tab=p;
                    vmodel.scro_blur();
                },
                scro_focus: function(){
                    vmodel.isInput = true;
                },
                scro_blur: function(){
                    vmodel.isInput = false;
                },
                clearInput: function(){
                    vmodel.iph = '';
                },
                fnEnter: function(e){
                    if(e.keyCode == 13)
                        vmodel.load_tab1();
                },
                fnSelcetNext: function(){
                    vmodel.onSelect = !vmodel.onSelect;
                    //console.log(vmodel.onSelect);
                },
                fnSelcetPrev: function(){
                    if(vmodel.onSelect){
                        vmodel.onSelect = false;
                        return false
                    }
                },
                fnSelect_1: function(select){
                    vmodel.p4Select_1 = select;
                    vmodel.p4Select_2List = vmodel.p4res[select];
                    if(vmodel.p4Select_2List.length===1){
                        vmodel.fnSelect_2(vmodel.p4Select_2List[0]);
                    }
                    vmodel.fnSelcetNext();
                },
                fnSelect_2: function(select){
                    vmodel.p4Select_2 = select;
                    vmodel.fnSelcetNext();
                    vmodel.chPage('pResSel');
                },
                fnAutoH: function(arg, num){
                    return arg.length*num
                },
                load_tab1: function () {
                    if(vmodel.iph){
                        dbus.load_iphList(vmodel.iph,function(data){
                            vmodel.tab1List = data;
                            vmodel.chPage('pRes');
                        });
                        vmodel.scro_blur();
                    }else{
                        $('input').focus();
                    }
                }
            });
            vmodel.$watch('iph',function(newValue){
                vmodel.iph = newValue.toUpperCase();
            });
        }
    }
    return vm
});