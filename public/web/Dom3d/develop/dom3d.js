/**
 * Created by lenrinfvck on 2015-02-27.
 */
    //dom类库
    /*var $ = function(selector){
        var $$ = function(str){
            return document.querySelectorAll(str);
        };
        if($$(selector).length > 1)
            return $$(selector);
        return document.querySelector(selector)
    };
    $.extend = function(obj, parObj){
        for(var n in parObj){
            obj[n] = parObj[n];
        }
        return obj;
    };
    NodeList.prototype.each = function(callback){
        var _this = this;
        console.log(this);
        for(var n in _this){
            if(_this[n].style)
                callback.apply(_this[n],[_this[n],parseInt(n)]);
        }
    };*/

    //dom3d对象
    var Ntrf3d = function(el,pos){
        this.dom = el;
        this.ePos = pos;
        this.transform = function(element, value, key){
            key = key || "Transform";
            ["Moz", "O", "Ms", "Webkit", ""].forEach(function(prefix) {
                element.style[prefix + key] = ' '+value;
            });
            return element;
        };
        this.init();
    };
    Ntrf3d.prototype = {
        init : function(){
            var el = this;
            el.setPos(this.ePos);
            $(this.dom).bind('camera_move',function(e, x, y, z){el.viewPos(x, y, z)});
        },
        setPos : function(pos){
            var el = this.dom;
            this.ePos = pos;
            this.transform(el, 'translate3d('+pos[0]+'px,'+pos[1]+'px,'+pos[2]+'px)');
        },
        viewPos : function(x, y, z){
            var cPos = [];
            cPos.push(x,y,z);
            var ePos = this.ePos;
            var pos = [];
            cPos.forEach(function(val, index){
                pos[index] = ePos[index]-val
            });
            this.transform(this.dom, 'translate3d('+pos[0]+'px,'+pos[1]+'px,'+pos[2]+'px)');
        }
    };

    //摄像机对象
    var Camera = function(space, cOpt){
        this.space = space;
        this.cOpt = cOpt;
        this.cPos = [0,0,0];
        this.init(cOpt);
    };
    Camera.prototype = {
        init : function(){
            this.setFous(this.cOpt);
            if(this.cOpt&&('cPos' in this.cOpt)){
                this.setPos(this.cOpt.cPos);
            }
        },
        setFous : function(cOpt){
            var space = this.space;
            var preset = {
                filmSize : 36,
                focalDis : 35
            };
            var opt = $.extend({},preset, cOpt);
            var perspective = (opt.focalDis/(opt.filmSize/2))*(space.width()/2);
            space.css('perspective', perspective+'px');
        },
        setPos : function(cPos){
            var space = this.space;
            this.cPos = cPos;
            $(space).children('.dom3d').trigger('camera_move', cPos);
        }
    };
jQuery.fn.dom3d = function(opt){
    var $space = $(this);
    $space.children('.dom3d').each(function(index,el){
        new Ntrf3d(el,[index*100+100,index*100,-index*200])
    });
    var camera = new Camera($space, opt);
    return {
        camera : camera
    }
};

