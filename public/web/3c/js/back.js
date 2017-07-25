jQuery.fn.edit =function(editBox,other){
    var model=false,
        $editBnt=$(this),
        $editBox=$(editBox);

    $editBnt.click(function(){
        model=!model;
        $editBnt.trigger('change.edit',model);
    })
    $editBnt.bind('change.edit', function (e,model) {
        if(model){
            $editBox.find('input.able').prop('readonly',!model);
            $editBox.find('select').prop('disabled',!model);
            $('.addTr').append('<td class="add" data-select="a">添加</td>');
            $('.removeTr').append('<td class="removeAdd">删除</td>');
        }else{
            $editBox.find('input.able').prop('readonly',!model);
            $editBox.find('select').prop('disabled',!model);
            $('.add,.removeAdd').remove();
        }
    });
};
var aTabsInit=function(){
    $('.baseInfo').testOpen('back01.html','_self');
    $('.CXsend').testOpen('Edit04.html','_self');
    $('.CXview').testOpen('Edit05.html','_self');
};
var listEdit=function(){
    $('.listEdit').toggle(function(){
            $(this).parent().find('input').prop('readonly',false);
            $(this).text('确认')
        },function(){$(this).parent().find('input').prop('readonly',true);
        $(this).text('修改');
    })
};