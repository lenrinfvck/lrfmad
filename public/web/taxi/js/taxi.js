/**
 * Created by Administrator on 2014-11-18.
 */
jQuery.fn.dialog = function(dialog,type){
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
        var $active=dialog.find("[data-dialog='"+select+"']")
//        dialog.find("[data-dialog]").fadeOut();
        $('body').append('<div class="mask"></div>');
        //$active.find('.diaBox').append('<h5 class="closeBnt diaBottom">返回</h5>');
        $active.fadeIn();
        $('.closeBnt').click(function(event) {
            $('.dialog').fadeOut();
            $('.mask').remove();
            //$(this).remove();
        })
    });

    return this;
};

/*
 * test<a>
 */
jQuery.fn.testOpen = function(select,type,stop){
    $(this).on('click',select,function(event){
        var url=$(this).data('url');
        window.open(url,type);
        if(stop){
            event.stopPropagation()
        }
    });
    return this;
};