(function($) {
    var lb_opt = {
        roles: {
            rin: {
                w: 102,
                h: 172
            },
            yui: {
                w: 70,
                h: 90
            },
            komani: {
                w: 78,
                h: 147
            },
            haruka: {
                w: 112,
                h: 148
            },
            mio: {
                w: 122,
                h: 140
            },
            kudo: {
                w: 122,
                h: 139
            }
        },
        pos: {
            p1: {
                x: 480,
                y: 60,
                z: 0,
            },
            p2: {
                x: 410,
                y: 320,
                z: 0,
            },
            p3: {
                x: 100,
                y: 350,
                z: 1,
            },
            p4: {
                x: 240,
                y: 330,
                z: 1,
            },
            p5: {
                x: 700,
                y: 330,
                z: 1,
            },
            p6: {
                x: 850,
                y: 340,
                z: 1
            }
        },
        lv: [1100, 900, 850],
    };
    Array.prototype.remove = function(item) {
        var index = this.indexOf(item);
        if(index < 0) {
            return false;
        }else {
            return this.splice(index, 1);
        }
    }
    /* obj Role START */
    function Role(name, roles) {
        this.base = {
            w: roles[name].w,
            h: roles[name].h
        }
        this.pos = {
            x: 0,
            y: 0,
            z: 0
        }
        this.name = name;
        this.S_LEAVING = false;
        this.hp = 1;
        this.dom = {};
    }
    Role.prototype = {
        show: function(pos) {
            this.pos = pos;
            this.dom = $("<div></div>");
            this.dom
                .addClass("lb-ele role-enter "+this.name)
                .css({
                    left: pos.x,
                    top: pos.y,
                });
        },
        hide: function(cb, clk) {
            //animation
            var _this = this;
            var time = 150;
            this.S_LEAVING = true;
            this.dom.removeClass("role-enter").addClass("role-leave");
            if(clk) {
                time = 700;
            }
            setTimeout(function() {
                _this.dom.remove();
                if(cb) {
                    cb();
                }
            }, time);
        },
        checkClick: function(x, y) {
            if(this.S_LEAVING) {
                return false;
            }
            var base = this.base;
            var pos = this.pos
            var offX = x - pos.x;
            var offY = y - pos.y;
            if((Math.abs(offX) - 30 < (base.w/2))&&(offY - 30 < base.h && offY > -30)) {
                this.dom.addClass("role-click");
                return true;
            }
            return false;
        }
    }
    /* obj Role END */

    /* obj GameCtrl START */
    function GameCtrl(dom, lb_opt) {
        this.opt = lb_opt;
        this.cont = 0;
        this.timeout = 1500;
        this.ableList = []; //可使用name
        this.showList = []; //已用name
        this.ablePos = [];  //可使用pos
        this.dom = dom;
        this.gg = 3;
        this.S_STARTING = false;
        this.S_RESTART = false;
        this.S_DEADMOD = 0;
        this.init();
        this.bindFn();
    }

    GameCtrl.prototype = {
        init: function() {
            var _this = this;
            this.cont = 0;
            this.gg = 3;
            this.timeout = 1500;
            $(".life span").text(this.gg);
            $(".score span").text(this.cont);
            var opt = this.opt;
            var posList = this.posList;
            for(var key in opt.roles) {
                this.ableList.push(key);
            }
            for(var key in opt.pos) {
                this.ablePos.push(opt.pos[key]);
            }
            window.onload = function() {
                _this.dom.addClass("loaded");
            };
        },
        bindFn: function() {
            var _this = this;

            this.dom.bind("mousedown touchstart", fnClick);
            
            function fnClick(e) {
                var x = e.pageX - $(this).offset().left;
                var y = e.pageY - $(this).offset().top;

                _this.showList.forEach(function(role) {
                    if(role.checkClick(x, y)) {
                        if(role.flag) {
                            clearTimeout(role.flag);
                            role.flag = false;
                            if(_this.S_STARTING) {
                                _this.cont++;
                                if(_this.cont%10 === 0) {
                                    _this.lvChange();
                                }
                            }
                            $(".score span").text(_this.cont);
                            _this.removeRole(role, true);
                        }
                        return false;
                    }
                });
            }
        },
        addRole: function(name, pos) {
            var _this = this;
            var role = new Role(name, this.opt.roles);
            role.show(pos);
            $(".z"+pos.z).append(role.dom);
            role.dom.css("animation-duration", _this.timeout/3000 + "s");
            setTimeout(function() {
                role.dom.css("animation-duration", "");
            }, _this.timeout/3 + 200);
            _this.showList.push(role);
            _this.ableList.remove(name);
            _this.ablePos.remove(pos);
            role.flag = setTimeout(function(){
                role.flag = false;
                _this.removeRole(role);
            }, _this.timeout);
        },
        removeRole: function(role, clk) {
            var _this = this;
            if(clk) {
                _this.showList.remove(role);
            }
            role.hide(function() {
                if(_this.showList.remove(role)) {
                    _this.ablePos.push(role.pos);
                    _this.ableList.push(role.name);
                    if(_this.S_STARTING) {
                        _this.gg--;
                        $(".life span").text(_this.gg);
                        if(_this.gg === 0) {
                            _this.S_STARTING = false;
                            _this.over();
                        }
                    }
                    if(!_this.S_RESTART) {
                        _this.run();
                    }
                }else {
                    _this.ablePos.push(role.pos);
                    _this.ableList.push(role.name);
                    if(!_this.S_RESTART) {
                        _this.run();
                        if(_this.S_DEADMOD === 1) {
                            _this.S_DEADMOD++;
                            setTimeout(function(){
                                _this.run();
                            }, _this.timeout/2);
                        }
                    }
                }
            }, clk);
        },
        lvChange: function() {
            var _this = this;
            var lv_len = _this.opt.lv.length;
            var conts = Math.floor(_this.cont/10);
            _this.gg++;
            $(".life span").text(_this.gg);
            if(conts >= lv_len) {
                _this.timeout = _this.opt.lv[lv_len-1];
                _this.S_DEADMOD++;
            }else {
                _this.timeout = _this.opt.lv[conts];
            }
        },
        run: function() {
            var _this = this;
            var ableList = _this.ableList;
            var ablePos = _this.ablePos;
            var namelen = ableList.length;
            var poslen = ablePos.length;
            var name = ableList[Math.floor(Math.random()*namelen)%namelen];
            var pos = ablePos[Math.floor(Math.random()*poslen)%poslen];
            this.addRole(name, pos);
        },
        play: function() {
            var _this = this;
            _this.S_RESTART = true;
            _this.init();
            _this.dom.addClass("starting");
            setTimeout(function() {
                _this.S_RESTART = false;
                _this.S_STARTING = true;
                _this.run();
                // setTimeout(function() {
                //     _this.run();
                // }, 500);
            }, 2000);
        },
        over: function() {
            var _this = this;
            alert("GG,得分:"+this.cont);
            $(".play-btn").fadeIn();
            $.ajax({
                url: "/index_game/",
                type: "POST",
                data: {score: _this.cont}
            }).success(function(data) {
                $(".maxscore span").text(data.score);
            });
        }
    }
    /* obj GameCtrl END */
    $.fn.lb_game = function() {
        return new GameCtrl($(this), lb_opt);
    }
})(jQuery);