/**
 * Created by lenrinfvck on 2015/2/5.
 */
define("userInfo",["databus","zepto","ready!"], function(dbus,zepto){
    //mobi();
    var vm = function(){
        var user = dbus.loGet("loUser");
        if (!avalon.vmodels.c_userInfo) {
            var vmodel = avalon.define({
                $id: "c_userInfo",
                $uImg: user.uImg,
                form: {
                    id: '',
                    wxid: user.uId,
                    tName: '',
                    sex: '0',
                    birth: '',
                    tel: '',
                    email: '',
                    check: false
                },
                checkForm: function () {
                    var test = vmodel.form;
                    var tel = /^(\d{8}|\d{11})$/;
                    var email = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
                    /*TODO: 验证生日*/
                    if (!(test.tName)) {
                        alert('请确认必填部分');
                        return false
                    }
                    if (!tel.test(test.tel)) {
                        alert('请确认电话为8位或11位数字');
                        return false
                    }
                    if (!email.test(test.email)) {
                        alert('邮箱格式错误');
                        return false
                    }
                    return true
                },
                submit: function () {
                    //var ok = true;
                    if (!vmodel.checkForm()) {
                        return false
                    }
//                                alert(vmodel.$model.form.tName);
//                            alert(document.getElementById('birth').value);
//                               alert(vmodel.$model.form.birth);
//                                alert(vmodel.$model.form.tel);
//                                alert(vmodel.$model.form.email);
                    dbus.send_userInfo(vmodel.$model.form, function(data){
                        if(data.success){
                            alert('操作成功');
                            dbus.open("#!/");
                        }
                    })
                },
                chCheck: function () {
                    vmodel.form.check = !vmodel.form.check;
                },
                chDate: function (obj){
                    //alert(obj.value);
                    vmodel.form.birth = obj.value;
                },
                onload: function () {
                    dbus.load_userInfo(vmodel.form.wxid, function (data) {
                        if (!data.success) {
                            return false
                        }
                        vmodel.form = data.data;
                    });
                }
            });
            vmodel.onload();
        }else{
            //vmodel.onload();
        }
    }
    return vm
});
