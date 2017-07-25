/**
 * 3cm SPA.databus by lenrinfvck on 2015/1/14.
 */
define("databus",["zepto"],function(zepto){
    var dataBus={
        //首页初始化
        load_index : function(callback){
            $.ajax({
                type: 'POST',
                url: 'http://115.28.90.118:2000/api/Search/GetOneGroup?json=true',
                //data: ,
                success: function(data){
                    callback(data)
                }
            });
        },
        //辅助输入
        inputAjax : function(send, callback){
            var url = 'http://115.28.90.118:2000/api/Search/GetInput?textStr='+send+'&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    callback(data);
                }
            });
        },
        //搜索页返回
        load_search : function(send, type, callback){
            var type = type||0;
            var url = 'http://115.28.90.118:2000/api/Search/GetSJInfo?arr='+send+'&type='+type+'&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    callback(data)
                }
            });
        },
        //proInfo-tab3
        load_proTab3 : function(uId, cpId, callback){
            var url = 'http://115.28.90.118:2000/api/GetMsg/GetCPinfo?userId='+uId+'&cpId='+cpId+'&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    callback(data)
                }
            });
        },
        fn_proSave : function(uId, pId, callback){
            var url = 'http://115.28.90.118:2000/api/GetMsg/SelectState?ssId='+pId+'&uuId='+uId+'&types=3&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    if(callback){callback(data)}
                }
            });
        },
        //proInfo-tab2
        load_proTab2 : function(pId, callback){
            var d={};
            d.pId=pId;
            $.ajax({
                url: 'service/proTab2.json',
                data: d,
                success: function(data){
                    if(callback){callback(data)}
                }
            });
        },
        //shop
        load_shop : function(sId,uId, callback){
            var url = 'http://115.28.90.118:2000/api/GetMsg/GetShopInfo?sId='+sId+'&uId='+uId+'&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    callback(data)
                }
            });
        },
        //shop-zan
        fn_zan : function(sId,uId, callback){
            url = 'http://115.28.90.118:2000/api/GetMsg/SelectState?ssId='+sId+'&uuId='+uId+'&types=2&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    if(callback){callback(data)}
                }
            });
        },
        fn_save : function(sId,uId, callback){
            url = 'http://115.28.90.118:2000/api/GetMsg/SelectState?ssId='+sId+'&uuId='+uId+'&types=1&json=true';
            $.ajax({
                type: 'POST',
                url: url,
                success: function(data){
                    if(callback){callback(data)}
                }
            });
        },
        //user
        load_user : function(uId, callback){
            var url = 'http://115.28.90.118:2000/api/UserInfo/GetMe?uid='+uId+'&json=true';
            $.ajax({
                type:'POST',
                url: url,
                success: callback
            });
        },
        //userInfo
        load_userInfo : function (uId, callback) {
            $.ajax({
                type:'POST',
                url: 'http://115.28.90.118:2000/api/UserInfo/GetUserInfo?wxid='+uId+'&json=true',
                success: function(data){
                    callback(data)
                }
            });
        },
        send_userInfo : function (form, callback) {
            var d=form;
            $.ajax({
                type:'POST',
                url: 'http://115.28.90.118:2000/api/UserInfo/AddUser',
                data: d,
                success:callback
            });
        },
        //proBind
        send_addPro : function (form, callback){
            $.ajax({
                type:'POST',
                url: 'service/user.json',
                data: form,
                success:callback
            });
        },
        send_editPro : function (form, callback){
            $.ajax({
                type:'POST',
                url: 'service/user.json',
                data: form,
                success:callback
            });
        },
        //苹果设备查询
        load_iphList : function(ipStr, callback){
            var _this = this;
            _this.ajax_addLoad();
            var url = 'http://115.28.90.118:2000/WebForm1.aspx?number='+ipStr;
            $.getJSON(url,
                function(data){
                    _this.ajax_removeLoad();
                    var res = [];
                    if(data.result){
                        var d = data.result;
                        var dateFilter = function(str){
                            var resStr;
                            if(str){
                                if(str.length > 4){
                                    resStr = str.slice(4,-1);
                                }
                                else{
                                    resStr = '已过期';
                                }
                                return resStr
                            }
                            else{
                                return false
                            }
                        };
                        //var MakeTime = dateFilter(d.MakeTime);
                        var Telephone = dateFilter(d.Telephone);
                        var Repairs = dateFilter(d.Repairs);
                        res.push({key:'查询结果',val: ipStr});
                        res.push({key:'设备名称',val: d.Model});
                        res.push({key:'产品容量',val: d.Size});
                        res.push({key:'产品颜色',val: d.Color});
                        res.push({key:'产品型号',val: d.modelNumber});
                        //res.push({key:'产品序号',val: d.Key});
                        res.push({key:'激活状态',val: d.Active});
                        res.push({key:'生产日期',val: d.MakeTime});
                        res.push({key:'电话支持',val: Telephone});
                        res.push({key:'保修状态',val: Repairs});
                        res.push({key:'生产工厂',val: d.MakeLocation});
                        res.push({key:'备注',val: d.desc});

                    }
                    callback(res);
                });
        },
        //获取hash变量
        urlArg : function(){
            var url = window.location.search;
            var query = {};
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                var strs = str.split("&");
                for(var i = 0; i < strs.length; i ++) {
                    query[strs[i].split("=")[0]]=(strs[i].split("=")[1]);
                }
            }
            return query
        },
        ajax_addLoad: function () {
           $('body').append('<div class="ajaxMask"><div class="spinner"><span>loading</span><div class="double-bounce1"></div><div class="double-bounce2"></div></div><div class="mask"></div></div>');
           setTimeout(function(){
              if($('.ajaxMask').length > 0){
                  $('.ajaxMask').remove();
                  alert('服务器繁忙，请稍后再试');
              }
           },20000);
        },
        ajax_removeLoad: function(){
           $('.ajaxMask').remove();
        },
        open : function(url, type){
            window.location.href = url;
            //window.open(url, type||'_self');
        },
        loSet : function(key, obj){
            sessionStorage.setItem(key ,JSON.stringify(obj));
        },
        loGet : function(key){
            var res = sessionStorage.getItem(key);
            if(!res){
                //alert("您还未使用微信授权登陆，暂无法使用");
                //this.open("#!/");
                return false
            }
            return JSON.parse(res)
        }
    };
    return dataBus
});