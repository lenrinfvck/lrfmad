function viewInput(){
    var proid=document.forms['cxmsg'].proid.value,
            //form.find('input[name="proid"]').val(),
        price=document.forms['cxmsg'].price.value,
    //other=form.find('input[checked="checked"]').html(),
        date=document.forms['cxmsg'].date.value;
    var
        html='<table class="inBorder" cellspacing="0" cellpadding="0">';
        html+='<tr class="first"><th>品牌型号</th><td><input type="text" value="'+proid+'" readonly="readonly" /></td></tr>';
        html+='<tr><th>促销价格</th><td><input type="text" value="'+price+'" readonly="readonly" /></td></tr>';
        //html+='<tr>'+other+'</tr>';
        html+='<tr>';
        html+='<th>截止时间</th><td>'+date+'</td>';
        html+='</tr>';
        html+='<tr><th>产品图库</th><td></td></tr>';
        html+='</table>';
        $('.diaCon').prepend(html);
};
/**
 * jQuery plugin Mytab by lenrinfvck 2014/11/11.
 */
jQuery.fn.tabs = function(tabCon,type){
    var tab = $(this),
        tabList=tab.find('.tab');
    tabCon =$(tabCon);
    //首尾初始化
    switch(type) {
        case '1':tabList.eq(0).addClass('firTab').end().eq(-1).addClass('endTab');break;
    }
    tab.on("click",'.tab',function(){
        var select=$(this).data('tab');
        tab.trigger("change.tabs",select);
    });
    tab.bind("change.tabs",function(e, select){
        tabList.removeClass('active');
        tab.find(">[data-tab='"+select+"']").addClass('active');
        tabCon.find(">[data-tabcon]").removeClass("active");
        tabCon.find(">[data-tabcon='"+select+"']").addClass("active");
    });
    return this;
};

/*
* test<a>
*/
jQuery.fn.testOpen = function(url,type,stop){
    $(this).bind('click',function(event){
        window.open(url,type);
        if(stop){
            event.stopPropagation()
        }
    });
     return this;
};

/*
 * jQuery plugin Mydialog by lenrinfvck 2014/11/13.
 */
jQuery.fn.diaAjax = function(){
    var dia = $(this),
        diaBnt=dia.find('.diaBnt');
    //首尾初始化
    dia.on("click",'.diaBnt',function(){
        var diaUrl=$(this).data('url'),
            diaCon='<div class="dialog"></div>';
        $('body').append('<div class="mask"></div>'+diaCon);
        $('.dialog').load(diaUrl,function(){
            $(this).append('<h4 class="closeBnt diaBottom">关闭</h4>')
                .prepend('<div class="closeBnt"></div>')
                .fadeIn();
            $('.closeBnt').click(function(event) {
                $('.dialog').fadeTo(300,0,function(){
                    $(this).remove()
                });
                $('.mask').remove();
            });
        });
    });
    return this;
};
jQuery.fn.dialog = function(dialog,type,callback){
    var dia = $(this),
        diaBnt=dia.find('.diaBnt');
    dialog =$(dialog);
    //首尾初始化
    switch(type) {
        case '1': break;
    }
    dia.on("click",'.diaBnt',function(){
        var select=$(this).data('dialog');
        dialog.trigger("change.dialog",select);
    });
    dialog.bind("change.dialog",function(e, select){
        var $active=dialog.find("[data-dialog='"+select+"']");
//        dialog.find("[data-dialog]").fadeOut();
        $('body').append('<div class="mask"></div>');
        $active.append('<h4 class="closeBnt diaBottom">关闭</h4>');
        $active.prepend('<div class="closeBnt"></div>');
        $active.fadeIn();
        if(callback){
            callback();
        }
        $('.closeBnt').click(function(event) {
            $('.dialog').fadeOut();
            $('.mask').remove();
            $('.diaBottom').remove();
            $('.closeBnt').remove();
        });
    });
    return this;
};
jQuery.fn.formDialog = function(dialog,type,callback){
    var dia = $(this),
        diaBnt=dia.find('.diaBnt');
    dialog =$(dialog);
    //首尾初始化
    switch(type) {
        case '1': break;
    }
    dia.on("click",'.diaBnt',function(){
        var select=$(this).data('dialog');
        dialog.trigger("change.dialog",select);
    });
    dialog.bind("change.dialog",function(e, select){
        var $active=dialog.find("[data-dialog='"+select+"']");
//        dialog.find("[data-dialog]").fadeOut();
        $('body').append('<div class="mask"></div>');
        $active.append('<h4 class="diaBottom"><span class="submit">确认修改</span><span class="closeBnt bottom">返回修改</span></h4>');
        $active.prepend('<div class="closeBnt">返回</div>');
        $active.fadeIn();
        if(callback){
            callback();
        }
        $('.closeBnt').click(function(event) {
            $('.dialog').fadeOut();
            $('.mask').remove();
            $('.diaCon table').html(' ');
            $('.diaBottom').remove();
            $('.closeBnt').remove();
        });
        $('.diaForm .submit').click(function(){
            document.forms['cxmsg'].submit();
        })
    });
    return this;
};

/* imgUp*/
jQuery.fn.imgUp = function(input,display){
    var $bnt=$(this),
        $display=$(display);
    $bnt.bind('click',function(){
        input.click();
    });
    input.bind('change',function(e){
        var value=$(this).val();
        $display.append('<img src="'+value+'"/>');
    });
};

/*
 * jQuery plugin scroTrans by lenrinfvck 2014/11/13.
 */
jQuery.fn.scroTrans = function(end,time){
    var scrollY=document.documentElement.scrollTop||document.body.scrollTop,
        viewY=document.documentElement.clientHeight,
        $body = $("body, html"),
        endTop=end.offset().top;
    $(this).click(function(){
        $body.animate({scrollTop:endTop},time);
    })
};

/*
 * jQuery plugin scroTrans by lenrinfvck 2014/11/13.
 */
jQuery.fn.menuSlide = function(){
    $(this).on('click','.tab',function(event){
        $(this).find('.mChild').slideToggle();
    });
    $('.mChild').click(function(e){
        e.stopPropagation();
    })
};

/*
 * jQuery plugin mySelect by lenrinfvck 2014/12/1.
 */
jQuery.fn.mySelect = function(listArray){
    var selectBnt=$(this);
    var select= {
        flag:false,
        html:'<ul class="selectCon">'
    };
    for(var list in listArray){
        select.html += '<li>'+listArray[list]+'</li>'
    }
    select.html +='</ul>';
    selectBnt.append(select.html);
    selectBnt.click(function(e){
        e.stopPropagation();
        if(select.flag==false){
            $('.selectCon').trigger('select.off');
            selectBnt.find('.selectCon').trigger('select.on');
            select.flag=true;
            $(document).click(function(){
                selectBnt.find('.selectCon').trigger('select.off');
                $(document).unbind();
            });
        }else{
            selectBnt.find('.selectCon').trigger('select.off');
        }
    });
    selectBnt.on('select.on','.selectCon',function(){
        var con=$(this);
        con.slideDown().on('click','li',function(e){
            var arg=$(this).html();
            con.trigger('select.off');
            selectBnt.trigger('select.change',arg);
        });
    });
    selectBnt.on('select.off','.selectCon',function(){
        var con=$(this);
        con.slideUp(function(){
            select.flag=false;
        }).unbind();
    });
    selectBnt.bind('select.change',function(e,arg){
        selectBnt.find('span').html(arg);
        selectBnt.find('input').val(arg).trigger('change',arg);
        //console.log(selectBnt.find('input').val());
    });
    return this
};
//mySelect-mySelectLink by lenrinfvck 2014/12/2.
jQuery.fn.mySelectLink=function(obj,list){
    var $this=$(this);

    obj.bind('change',function(e,arg){
        var thisList=[];
        var html='<ul class="selectCon">';
        $this.find('.selectCon').trigger('select.off').remove();
        for(var m in list){
            if(list[m].name==arg){
                thisList=list[m].cities;
                break;
            }
        }
        for(var n in thisList){
            html+= '<li>'+thisList[n]+'</li>';
        }
        html+='</ul>';
        $this.append(html).find('span').html(thisList[0]).siblings('input').val(thisList[0]);
    });
    return this
};

setTrans = function(trans,time){
    $ul.css({'transform' :'translate3d(-'+trans+'px,0,0)','webkit-transform' :'translate3d(-'+trans+'px,0,0)','transition-duration': time+'s','-webkit-transition-duration': time+'s'})
};