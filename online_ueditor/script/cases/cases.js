/**
 * Created by dongyancen on 14-4-1.
 */
var testingElement = {}, te = testingElement;
(function () {
    function mySetup() {
        te.dom = [];
        te.obj = [];

        var div = document.body.appendChild(document.createElement('div'));
        $(div).css('width', '500px').css('height', '500px').css('border', '1px solid #ccc');
        var editor = new UM.Editor({'initialContent': '<p>欢迎使用umeditor</p>', 'autoFloatEnabled': false, webAppKey: 'Qr0M9yTEoLIiUSXXQTtq7yFt'});
        div.id = "testDefault";
        var ue = new UM.Editor({'UEDITOR_HOME_URL': '../../../', 'autoFloatEnabled': true, webAppKey: 'Qr0M9yTEoLIiUSXXQTtq7yFt'});
        var domUtils = UM.dom.domUtils;
        var div_dom = document.body.appendChild(document.createElement('div'));
        div_dom.id = 'test';
        var utils = UM.utils;
        QUnit.readyFlag = 0;
        editor.render(div);
        stop();
        setTimeout(function () {
            editor.ready(function () {
                var range = new UM.dom.Range(editor.document, editor.body);
                te.dom.push(div);
                te.dom.push(div_dom);

                te.obj.push(editor);
                te.obj.push(range);
                te.obj.push(ue);
                te.obj.push(utils);
                te.obj.push(domUtils);

                QUnit.readyFlag = 1;
            });
        }, 50);
        document.getElementsByClassName = function (eleClassName) {
            var getEleClass = [];//定义一个数组
            var myclass = new RegExp("\\b" + eleClassName + "\\b");//创建一个正则表达式对像
            var elem = this.getElementsByTagName("*");//获取文档里所有的元素
            for (var h = 0; h < elem.length; h++) {
                var classes = elem[h].className;//获取class对像
                if (myclass.test(classes)) getEleClass.push(elem[h]);//正则比较，取到想要的CLASS对像
            }
            return getEleClass;//返回数组
        }
    }

    var _td = function () {
        if (te) {
            if (te.dom && te.dom.length) {
                for (var i = 0; i < te.dom.length; i++) {
                    if (te.dom[i] && te.dom[i].parentNode)
                        te.dom[i].parentNode.removeChild(te.dom[i]);
                }

            }
        }
        te.dom = [];
        te.obj = [];
    }
    var s = QUnit.testStart, td = QUnit.testDone;
    QUnit.testStart = function () {
        s.apply(this, arguments);
        mySetup();
    };
    QUnit.testDone = function () {
        _td();
        d.apply(this, arguments);
    };
    var d = QUnit.done;
    function _d(args /* failures, total */) {
        saveResult(args);
//                failed : args[0],
//                passed : args[1],
//                detail:args[2]

    }
    QUnit.done = function() {
        _d(arguments);
        d.apply(this, arguments);
    };
})();
function saveResult(re){
    $.ajax({
        url: '../recode.php',
        type: 'post',
        data: {'failed':re[0]},
        success: function (msg) {
//            if (!msg || !eval("(" + msg + ")")) {//没有返回结果或者返回false

        },
        error: function (xhr, msg) {
            alert("error 1");
        }
    });
}

//saveResult([0]);
//test("stop", function () { stop();});
/**
 * browser
 */
test('core.browser', function () {
    var browser = UM.browser;
    /*ie*/
    if (browser.ie) {
        ok(true, 'is ie');
        var version = ua.browser.ie;
        if (browser.version == 11) {
            equal(browser.version, ua.browser.ie, 'check ie version');
        }
        if (browser.version < 7) {
            ok(browser.ie6Compat, 'ie6 compat mode');
            equal(version, browser.version, 'check ie version');
        }
        if (browser.version == 7) {
            ok(browser.ie7Compat, 'ie7 compat mode');
            equal(version, browser.version, 'check ie version');
            ok(browser.isCompatible, 'is compatible');
        }
        switch (document.documentMode) {
            case 7:
                ok(browser.ie7Compat, 'ie7 document Mode');
                equal(version, browser.version, 'check ie version');
                ok(browser.isCompatible, 'is compatible');
                break;
            case 8:
                ok(browser.ie8Compat, 'ie8 document Mode');
                equal(version, browser.version, 'check ie version');
                ok(browser.isCompatible, 'is compatible');
                break;
            case 9:
                ok(browser.ie9Compat, 'ie9 document Mode');
                equal(version, browser.version, 'check ie version');
                ok(browser.isCompatible, 'is compatible');
                break;
        }
    }
    /*opera*/
    if (browser.opera) {
        ok(ua.browser.opera, 'is opera');
        equal(browser.version, ua.browser.opera, 'check opera version');
    }
    /*webKit*/
    if (browser.webkit) {
        ok(ua.browser.webkit, 'is webkit');
        equal(browser.webkit, ua.browser.webkit > 0, 'check webkit version');
    }
    /*gecko*/
    if (browser.gecko) {
        ok(ua.browser.gecko, 'is gecko');
        equal(browser.gecko, !!ua.browser.gecko, 'check gecko version');
    }
//    /*air*/
//    if ( browser.air ) {
//        ok( ua.browser.air, 'is air' );
//        equal( browser.air, ua.browser.air>0, 'check air version' );
//    }
//    /*mac*/
//    if ( browser.mac ) {
//        ok( ua.browser.air, 'is air' );
//        equal( ua.browser.os, 'macintosh', 'check air version' );
//    }
    /*quirks*/
    if (browser.quirks) {
        equal(document.compatMode, 'BackCompat', 'is quirks mode');
        equal(browser.version, 6, 'ie version is 6');
    }
});
/**
 * domUtils
 */
test('core.domUtils: findParentByTagName--文本节点', function () {
    var domUtils = te.obj[4];
    var div = te.dom[1];
    div.innerHTML = '<strong>ddddd</strong><!----><!--hhhhh--><span id="span">span</span><b>xxxxx</b><p id="p"><br /><img /><table id="table"><tr><td>dddd</td></tr></table></p>';
    var span_text = document.getElementById('span').firstChild;
    var tagName = ['em', 'p', 'div'];
    same(domUtils.findParentByTagName(span_text, tagName), div, '文本节点');
});
test('core.domUtils: getComputedStyle', function () {
    var div = te.dom[1];
    var domUtils = UM.dom.domUtils;
    div.innerHTML = '<div class="div_class" name="div_name" style="color:red;font-size:12px"></div><span></span>';
    equal(domUtils.getComputedStyle(div.firstChild, 'font-size'), '12px');
    equal(domUtils.getComputedStyle(div.firstChild, 'display'), 'block');
    equal(domUtils.getComputedStyle(div.lastChild, 'display'), 'inline');
    equal(domUtils.getComputedStyle(div.firstChild, 'width'), div.firstChild.offsetWidth + 'px');
});

/**
 * Editor
 */

test("core.Editor: focus(true)", function () {
    var editor = te.obj[0];
    editor.setContent("<p>hello1</p><p>hello2</p>");
    editor.focus(true);
    var rng = editor.selection.getRange();
    var startNode = rng.startContainer;
    if (startNode.nodeName == 'P' && rng.startOffset == startNode.childNodes.length) {
        if (startNode = startNode.lastChild) {
            if (startNode.nodeType == 3) {
                rng.setStartAtLast(startNode).collapse(true);
            }
        }
    }
    equal(rng.collapsed, true);
    equal(rng.startContainer, editor.body.lastChild.lastChild, "focus( true)焦点在最后面");
    equal(rng.endOffset, editor.body.lastChild.lastChild.nodeValue.length, "focus( true)焦点在最后面");

});
test('core.Editor: getAllHtml', function () {
    var editor = te.obj[0];

    editor.focus();
    var html = editor.getAllHtml();
    ok(/umeditor.css/.test(html), '引入样式');

});

test('core.Editor: destroy', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'edu';
    var editor = UM.getEditor('edu');
    stop();
    editor.ready(function () {
        setTimeout(function () {
            editor.destroy();
            equal(document.getElementById('edu').tagName.toLowerCase(), 'textarea', '容器被删掉了');
            UM.clearCache('edu');
            document.getElementById('edu') && te.dom.push(document.getElementById('edu'));
            start();
        }, 200);

    });
});

/**
 * EventBase
 */

test("core.EventBase: domUtilsaddListener,fireEvent --同一个侦听器绑定多个事件", function () {
    var editor = te.obj[0];
    expect(2);
    editor.focus();
    editor.addListener("event1", function () {
        ok(true, "listener1 is fired");
    });
    editor.addListener("event1", function () {
        ok(true, "listener2 is fired");
    });
    editor.fireEvent("event1");
    stop();
    setTimeout(function () {
        start();
    }, 100);

});

/**
 * filterNode
 */

test('core.filterNode: 过滤掉整个标签', function () {
    var uNode = UM.uNode;
    var node = uNode.createElement('<div id="aa"><p>sdf<b>sdf</b></p><i>sdf</i></div>');
    UM.filterNode(node, {
        'p': {},
        'b': '-'
    });
    equals(node.toHtml().replace(/[ ]+>/g, '>'), '<div id="aa"><p>sdf</p>sdf</div>', '保留p，过滤b');
});

/**
 * filterword
 */
test('core.filterWord', function () {
    var str = '<p>         欢迎使用<span>umeditor!</span>                       </p>     <p>         <span style="font-family:黑体">欢迎使用<span>umeditor!</span>                          </span>     </p>     <p>         <span style="font-family:楷体_gb2312">欢迎使用<span>umeditor!</span>                          </span>     </p>';
    var txt = '<p>         欢迎使用<span>umeditor!</span>                       </p>     <p>         <span style="font-family:黑体">欢迎使用<span>umeditor!</span>                          </span>     </p>     <p>         <span style="font-family:楷体_gb2312">欢迎使用<span>umeditor!</span>                          </span>     </p>';
    equal(UM.filterWord(str), txt, '字体、字号、颜色');
});

/**
 * htmlparser
 */

test('core.htmlparser: 特殊标签处理', function () {
    var root = UM.htmlparser('<i dsf="sdf" sdf="wewe" readonly >sd<!--fasdf-->f</i>');
    ua.checkSameHtml(root.toHtml(), '<i dsf="sdf" sdf="wewe" readonly=\"\" >sd<!--fasdf-->f</i>', '包含注释');
    root = UM.htmlparser('<script type="text/javascript" charset="utf-8" src="editor_api.js"></script>');
    equals(root.toHtml().replace(/[ ]+>/g, '>'), '<script type="text/javascript" charset="utf-8" src="editor_api.js"></script>', 'script标签');
});

/**
 * node
 */

test('core.node: appendChild && insertBefore', function () {
    var uNode = UM.uNode;
    var node = uNode.createElement('<div id="aa">sdfadf</div>');
    node.innerHTML('<p><td></td></p>');
    equals(node.innerHTML().replace(/[ ]+>/g, '>'), '<p><table><tbody><tr><td></td></tr></tbody></table></p>', '补全html标签');
    var tmp = uNode.createElement('div');
    node.appendChild(tmp);
    equals(node.innerHTML().replace(/[ ]+>/g, '>'), '<p><table><tbody><tr><td></td></tr></tbody></table></p><div></div>', 'appendChild');
    node.insertBefore(tmp, node.firstChild());
    equals(node.innerHTML().replace(/[ ]+>/g, '>'), '<div></div><p><table><tbody><tr><td></td></tr></tbody></table></p>', 'insertBefore');
});

/**
 * Range
 */

test('core.Range: shrinkBoundary--not ignore end', function () {
    var div = te.dom[1];
    var range = new UM.dom.Range(document);
    div.innerHTML = '<div>div1_text</div><a>a_text</a><div><span>span_text</span>div3_text</div>';

    var a = div.firstChild.nextSibling;
    var div_2 = div.lastChild;
    range.setStart(div, 1).setEnd(div, 3);
    range.shrinkBoundary();
    ua.checkResult(range, a, div_2, 0, 2, false, 'shrinkBoundary--not ignore end');
});
var checkBookmark = function (bookmark, pre, latter, id) {
    same(bookmark['start'], pre, '检查start返回值');
    same(bookmark['end'], latter, '检查end返回值');
    equal(bookmark['id'], id, '检查id');
};
test('core.Range: createBookmark/moveToBookmark--元素闭合', function () {
    var div = te.dom[1];
    var range = new UM.dom.Range(document);
    div.innerHTML = 'first_text<b><i>i_text</i>xxxxxxx</b><span id="span">span_text</span><p id="second"><em id="em">em_text</em>p_text</p>';
    var em_text = document.getElementById('em').firstChild;
    var em = em_text.parentNode;
    range.setStart(em_text, 1).setEnd(em_text, 1);
    var bookmark = range.createBookmark(true, true);
    ua.checkResult(range, em, em, 2, 2, true, '元素闭合');
    var pre = em.firstChild.nextSibling;
    checkBookmark(bookmark, pre.id, null, true);
    equal('_baidu_bookmark_start_', pre.id, '检查前面span的id');

});

/**
 * Selection
 */

test('core.Selection: getRange--闭合选区的边界情况', function () {
    var editor = te.obj[0];
    var range = new UM.dom.Range(editor.document, editor.body);
    editor.setContent('<p><strong>xxx</strong></p>');
    range.setStart(editor.body.firstChild.firstChild, 0).collapse(true).select();
    range = editor.selection.getRange();
    var strong = editor.body.firstChild.firstChild;
    if (ua.browser.ie && ua.browser.ie > 8) {//todo ie9,10改range
        ok(range.startContainer === strong, 'startContainer是strong');
        ok(range.startOffset == 1, 'startOffset是1')
    }
    else {
        ok(range.startContainer.nodeType == 3, 'startContainer是文本节点');
        /*startContainer:ie is xxx,others are strong.firstChild*/
        ok(( range.startContainer === strong.firstChild) && strong.firstChild.length == 1 || (range.startContainer.nodeValue.length == 3 && range.startContainer === strong.lastChild), 'startContainer是xxx左边的占位符或者xxx');
    }
    ua.manualDeleteFillData(editor.body);
    range.setStart(editor.body.firstChild.firstChild, 1).collapse(true).select();
    /*去掉占位符*/
    range = editor.selection.getRange();
    /*可能为(strong，1)或者(xxx，3)*/
    ok(( range.startContainer === strong) || ( range.startContainer === strong.lastChild) && strong.lastChild.length == 1 || (range.startContainer.nodeValue.length == 3 && range.startContainer === strong.firstChild), 'startContainer是xxx或者xxx右边的占位符');

});

/**
 * utils
 */

test('core.utils: transUnitToPx 转换', function () {
    equal(UM.utils.transUnitToPx('20pt'), '27px');
    equal(UM.utils.transUnitToPx('0pt'), '0');
});

/**
 * adapter
 */

test('adapter.adapter: delEditor', function () {
    var div = document.createElement('div');
    div.id = 'editor';
    document.body.appendChild(div);
    var ue = UM.getEditor('editor');
    stop();
    ue.ready(function () {
        setTimeout(function () {
            UM.delEditor('editor');
            equal(document.getElementById('editor').tagName.toLowerCase(), 'textarea');
            var div = document.getElementById("editor")
            div.parentNode.removeChild(div);
            start();
        }, 500)
    });
});

/**
 * autofloat
 */

test('adapter.autofloat: 检查toolbar是否浮动在页面顶端', function () {
    var sc = document.createElement("script");
    sc.id = "sc";
    sc.type = "text/plain";
    document.body.appendChild(sc);
    var me = UM.getEditor(sc.id, {autoFloatEnabled: true, initialFrameWidth: 800, initialFrameHeight: 100, autoHeightEnabled: true});
    stop();
    me.ready(function () {
        me.setContent('<p><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>sdf</p>');
        var screenX = window.screenX || window.screenLeft;//不同浏览器兼容
        var screenY = window.screenY || window.screenTop;
        setTimeout(function () {
            var range = new UM.dom.Range(me.document, me.body);
            range.setStart(me.body.firstChild, 1).collapse(1).select();
            me.focus();
            setTimeout(function () {
                window.scrollBy(screenX, screenY + $(document.body).height());
                setTimeout(function () {
                    var $eduiToolbar = me.$container.find('.edui-toolbar'),
                        getScrollTop = function () {
                            return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;//不同浏览器兼容
                        };

                    if (ua.browser.ie != 6) { //ie6下，工具栏浮动不到正确位置
                        equal(getScrollTop(), $eduiToolbar.offset().top, '检查toolbar是否在页面顶端');
                    }
                    window.scrollTo(screenX, screenY - $(document.body).height());
                    setTimeout(function () {
                        equal(me.$container.children()[0].className, me.$container.find('.edui-toolbar')[0].className, 'toolbar是第一个元素');
                        UM.delEditor('sc');

                        document.getElementById('sc').parentNode.removeChild(document.getElementById('sc'));
                        start();
                    }, 500);
                }, 500);
            }, 200);
        }, 200);
    });
});

/**
 * button
 */

test('adapter.button: 判断有没有触发fullscreenchanged事件', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');

    editor.ready(function () {
        var $btn = editor.$container.find('.edui-btn-bold');
        equal($btn.edui().disabled(), editor.queryCommandState('bold') == -1, '判断初始化后ui对象disable状态是否正常');
        equal($btn.edui().active(), editor.queryCommandState('bold') == 1, '判断初始化后ui对象active状态是否正常');
        editor.focus();
        $btn.click();//直接用$btn.click()在ie8下,模拟有问题,要先focus,不然document找不对
        setTimeout(function () {
            equal($btn.edui().disabled(), editor.queryCommandState('bold') == -1, '判断点击加粗后ui对象disable状态是否正常');
            equal($btn.edui().active(), editor.queryCommandState('bold') == 1, '判断点击加粗后ui对象active状态是否正常');
            UM.delEditor('ue');
            document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
            start();
        }, 800);
    });
    stop();
});

/**
 * combobox
 */

test('adapter.combobox: 检测combobox的控制否正常', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {
        setTimeout(function () {
            var editor = te.obj[0],
                components = [ "paragraph", "fontfamily", "fontsize" ],
                $body = $(document.body),
                colors = [ "forecolor", "backcolor" ];

            for (var i = 0, component; component = components[ i ]; i++) {

                $(".edui-btn-name-" + component, editor.container).trigger("click");

                equal($(".edui-combobox-" + component, editor.container).css("display"), "block", component + ' combobox打开正常');

                $body.trigger("click");

                equal($(".edui-combobox-" + component, editor.container).css("display"), "none", component + ' combobox关闭正常');

            }

            for (var i = 0, color; color = colors[ i ]; i++) {

                $(".edui-splitbutton-" + color + " .edui-dropdown-toggle", editor.container).trigger("click");

                equal($(".edui-colorpicker-" + color, editor.container).parents(".edui-popup").css("display"), "block", color + ' combobox打开正常');

                $body.trigger("click");

                equal($(".edui-colorpicker-" + color, editor.container).parents(".edui-popup").css("display"), "none", color + ' combobox关闭正常');

            }
            setTimeout(function () {
                UM.delEditor('ue');
                document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                start();
            }, 500);
        }, 200);
    });

});

/**
 * dialog
 */

test('adapter.dialog: 检查video的按钮和弹出的dialog面板是否正常显示', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {
        setTimeout(function () {//这句本身没有用,但是当用例自动执行下一个时,时序上可能有问题,所以在这儿先等一下
            var $vedioBtn = editor.$container.find('.edui-btn-video');
            ok($vedioBtn.data('$mergeObj').parent()[0] === undefined, '判断点击按钮前dialog是否未插入到dom树里面');
            editor.focus();
            $vedioBtn.click();
            ok($vedioBtn.data('$mergeObj').parent()[0] !== undefined, '判断点击按钮后dialog是否已插入到dom树里面');
            $vedioBtn.click();
            equal($vedioBtn.edui().disabled(), editor.queryCommandState('video') == -1, '判断初始化后btn对象disable状态是否正常');
            equal($vedioBtn.edui().active(), editor.queryCommandState('video') == 1, '判断初始化后btn对象active状态是否正常');
            editor.setContent('<img src="" class="edui-faked-video" />');
            setTimeout(function () {
                editor.execCommand('selectall');
                setTimeout(function () {
                    equal($vedioBtn.edui().disabled(), editor.queryCommandState('video') == -1, '判断点击按钮后btn对象disable状态是否正常');
                    equal($vedioBtn.edui().active(), editor.queryCommandState('video') == 1, '判断点击按钮后btn对象active状态是否正常');
                    UM.delEditor('ue');
                    document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                    start();
                }, 500);
            }, 100);
        }, 100);
    });
});

/**
 * fullscreen
 */

test('adapter.fullscreen: 检测全屏操作是否正常', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {
        setTimeout(function () {
            if (ua.browser.ie == 8) {//todo trace 3628 focus有问题,select代替
                var range = new UM.dom.Range(editor.document, editor.body);
                range.setStart(editor.body, 0).collapse(true).select();
            }
            var oldState = { //切换前的状态
                    width: editor.$container.innerWidth(),
                    height: editor.$container.innerHeight()
                },
            //切换之后的新状态
                newState = {},
                $fullscreenBtn = $(".edui-btn-fullscreen", editor.$container);

            //切换至全屏
            $fullscreenBtn.trigger("click");

            newState = {
                width: editor.$container.innerWidth(),
                height: editor.$container.innerHeight()
            };

            equal(newState.width, $(window).width(), '切换至全屏状态后宽度正常');
            equal(newState.height, $(window).height(), '切换至全屏状态后高度正常');

            equal($fullscreenBtn.hasClass("edui-active"), true, '切换至全屏状态后按钮状态正常');

            //模拟resize
            $(window).trigger("resize");
            equal(newState.width, $(window).width(), 'resize后宽度正常');
            equal(newState.height, $(window).height(), 'resize后高度正常');


            //退出全屏
            $fullscreenBtn.trigger("click");

            newState = {
                width: editor.$container.innerWidth(),
                height: editor.$container.innerHeight()
            };

            equal(newState.width, oldState.width, '退出全屏状态后宽度正常');
            equal(newState.height, oldState.height, '退出全屏状态后高度正常');

            equal($fullscreenBtn.hasClass("active"), false, '退出全屏状态后按钮状态正常');

            //模拟resize
            $(window).trigger("resize");
            setTimeout(function () {
                equal(newState.width, oldState.width, 'resize后宽度未改变');
                equal(newState.height, oldState.height, 'resize后高度未改变');
                UM.delEditor('ue');
                document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                start();
            }, 500);
        }, 200);

    });
});


/**
 * imagescale
 */

test('adapter.imagescale: webkit下图片可以被选中并出现八个角', function () {
    stop();
    if (ua.browser.webkit) {
        var sc = document.createElement("script");
        sc.id = "sc";
        sc.type = "text/plain";
        document.body.appendChild(sc);
        var editor = UM.getEditor(sc.id, {initialFrameWidth: 800, initialFrameHeight: 320, autoHeightEnabled: true});
        editor.ready(function () {
            editor.setContent('<p>修正webkit下图片选择的问题<img src="" width="200" height="100" />修正webkit下图片选择的问题</p>');
            var img = editor.body.getElementsByTagName('img')[0];
            var p = editor.body.firstChild;
            ua.click(img);
            var range = editor.selection.getRange();
            ua.checkResult(range, p, p, 1, 2, false, '检查当前的range是否为img');
            var scale = editor.$container.find('.edui-scale')[0];
            ok(scale && scale.style.display != 'none', "检查八个角是否已出现");
            ok($(img).width() == $(scale).width() && $(img).height() == $(scale).height(), "检查八个角和图片宽高度是否相等");
            setTimeout(function () {
                UM.clearCache(sc.id);
                domUtils.remove(editor.container);
                start();
            }, 500);
        });
    }
});

/**
 * popup
 */

test('adapter.popup: 检查表情的popup显示是否正常', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {
        setTimeout(function () {//这句本身没有用,但是当用例自动执行下一个时,时序上可能有问题,所以在这儿先等一下
            var $emotionBtn = editor.$container.find('.edui-btn-emotion');
            ok($emotionBtn.data('$mergeObj').parent()[0] === undefined, '判断点击按钮前pupop是否未插入到dom树里面');
            editor.focus();
            $emotionBtn.click();
            ok($emotionBtn.data('$mergeObj').parent()[0] !== undefined, '判断点击按钮后pupop是否已插入到dom树里面');

            equal($emotionBtn.edui().disabled(), editor.queryCommandState('emotion') == -1, '判断初始化后btn对象disable状态是否正常');
            equal($emotionBtn.edui().active(), editor.queryCommandState('emotion') == 1, '判断初始化后btn对象active状态是否正常');
            editor.focus();
            $emotionBtn.click();
            setTimeout(function () {
                equal($emotionBtn.edui().disabled(), editor.queryCommandState('emotion') == -1, '判断点击按钮后btn对象disable状态是否正常');
                equal($emotionBtn.edui().active(), editor.queryCommandState('emotion') == 1, '判断点击按钮后btn对象active状态是否正常');

                UM.delEditor('ue');
                document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                start();
            }, 500);
        }, 50);
    });
});

/**
 * source
 */

test('adapter.source: 判断有没有触发fullscreenchanged事件', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {
        editor.focus();

        editor.execCommand('source');
        setTimeout(function () {
            var $textarea = editor.$container.find('textarea');
            editor.fireEvent('fullscreenchanged');
            setTimeout(function () {
                equal($textarea.width(), editor.$body.width() - 10, "textarea的宽是否正确");
                equal($textarea.height(), editor.$body.height(), "textarea的高是否正确");
                UM.delEditor('ue');
                document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                start();
            }, 500);
        }, 100);
    });

});

/**
 * autosave
 */

test('plugins.autosave:重建编辑器,加载草稿箱', function () {
    if (ua.browser.ie && ua.browser.ie < 9)return;//延迟问题,手动过
    UM.clearCache('testDefault');
    $('.edui-body-container')[0].parentNode.removeChild($('.edui-body-container')[0]);
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue', {saveInterval: 0});
    setTimeout(function () {
        var content = '<p>内容</p>';
        editor.setContent(content);
        setTimeout(function () {
            UM.delEditor('ue');
            document.getElementById('ue') && document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
            var div = document.body.appendChild(document.createElement('div'));
            div.id = 'ue';
            var editor2 = UM.getEditor('ue');
            setTimeout(function () {
                equal(editor2.queryCommandState('drafts'), 0, '草稿箱可用');
                editor2.execCommand('drafts');
                ua.checkSameHtml(editor2.body.innerHTML, content, '内容加载正确');
                setTimeout(function () {

                    UM.delEditor('ue');
                    document.getElementById('ue') && document.getElementById('ue').parentNode.removeChild(document.getElementById('ue'));
                    start();
                }, 500);
            }, 500);
        }, 200);
    }, 500);
    stop();
});

/**
 * basestyle
 */

test('plugins.basestyle:ctrl+i', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    editor.ready(function () {
        var range = new UM.dom.Range(editor.document, editor.body);
        var body = editor.body;
        editor.setContent('<p>没有加粗的文本</p>');
        range.selectNode(body.firstChild).select();
        var p = body.firstChild;
        editor.focus();
        setTimeout(function () {
            ua.keydown(editor.body, {'keyCode': 73, 'ctrlKey': true});
            editor.focus();
            setTimeout(function () {
                if (ua.browser.ie)
                    equal(ua.getChildHTML(p), '<em>没有加粗的文本</em>');
                else
                    equal(ua.getChildHTML(p), '<i>没有加粗的文本</i>');
                UM.delEditor('ue');
                te.dom.push(document.getElementById('ue'));
                start();
            }, 500);
        }, 100);
    });
    stop();
});


/**
 * cleardoc
 */

test('plugins.cleardoc:选中文本，清空', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent('<p>hello</p><p>hello1</p>')
    range.selectNode(editor.body.firstChild).select();
    editor.execCommand('cleardoc');
    var br = ua.browser.ie ? '' : '<br>';
    equal(ua.getChildHTML(editor.body), '<p>' + br + '</p>', '');
});


/**
 * dropfile
 */

//test('plugins.dropfile:dropfile', function () {
//    var div = document.body.appendChild(document.createElement('div'));
//    div.id = 'ue';
//    var editor = UM.getEditor('ue');
//    editor.ready(function () {
//        var fileList = [
//            {type: "image/jpeg", size: 42466, name: "cc50ddfcc3cec3fdd59d8becd688d43f8694274d.jpg"}
//        ];
//        var originalEvent = {dataTransfer: {files: fileList}};
//        editor.$body.trigger({type: "drop", originalEvent: originalEvent});
//        setTimeout(function () {
//            UM.delEditor('ue');
//            te.dom.push(document.getElementById('ue'));
//            start();
//        }, 600);
//    });
//    stop();
//});

/**
 * enterkey
 */

test('plugins.enterkey:formatBlock', function () {
    if (ua.browser.ie) return;//ie时没有做处理
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent('<table><tbody><tr><td>hello1</td><td ></td></tr><tr><td >hello2</td><td ></td></tr></tbody></table>');
    var tds = editor.body.getElementsByTagName('td');
    range.setStart(tds[0].firstChild, 6).collapse(true).select();
    ua.keydown(editor.body, {'keyCode': 13});
    setTimeout(function () {
        ua.keyup(editor.body, {'keyCode': 13});
        setTimeout(function () {
            var td = editor.body.getElementsByTagName('td')[0];
            if (!ua.browser.ie) {
                equal(td.firstChild && td.firstChild.tagName.toLowerCase(), 'p', '加上p');
                equal(td.firstChild.innerHTML, 'hello1', 'hello1');
            }
            else
                equal(ua.getChildHTML(td), 'hello1', 'try');
            start();
        }, 200);
    }, 200);
    stop();
});

/**
 * font
 */

test('plugins.font:字体的状态反射', function () {
    var editor = te.obj[2];
    var div = document.body.appendChild(document.createElement('div'));
    $(div).css('width', '500px').css('height', '500px').css('border', '1px solid #ccc');
    editor.render(div);
    stop();
    editor.ready(function () {
        var range = new UM.dom.Range(editor.document, editor.body);
        editor.setContent('<p>欢迎你回来</p>');
        var p = editor.body.firstChild;
        range.selectNode(p).select();
        editor.execCommand('underline');
        var p1 = document.createElement('p');
        //p1.innerHTML = '<span style="text-decoration: underline;">欢迎你回来</span>';
        p1.innerHTML = '<u >欢迎你回来</u>';
        var html = '<p><span style="text-decoration:underline;">欢迎你回来</span></p>';
        if (!ua.browser.opera) {
            ok(ua.haveSameAllChildAttribs(p, p1), '检查是否添加了下划线');
            equal(editor.getContent('p'), html, '检查是否添加了下划线');
        }
        range.setStart(p.firstChild.firstChild, 3).setEnd(p.firstChild.firstChild, 4).select();
        editor.execCommand('fontfamily', '楷体');
        if (ua.browser.webkit || ua.browser.ie || ua.browser.gecko)
            var txt = '楷体';
        else if (ua.browser.opera)
            txt = '\"楷体\"';
        else
            txt = 'sans-serif';
        equal(editor.queryCommandValue('fontfamily'), txt, '检查字体的状态反射');
        setTimeout(function () {
            div.parentNode.removeChild(div);
            start();
        }, 50);
    });
});

/**
 * formula
 */

test('plugins.formula:插入公式', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p><br></p>');
    range.setStart(body.firstChild, 0).collapse(1).select();

    editor.execCommand('formula', '\\frac{x}{y}');

    var $iframe = $('iframe', editor.body);
    equal($iframe.length, 1, '正常插入公式');
    equal($iframe.hasClass('mathquill-embedded-latex'), true, '公式classname正常');
    equal($iframe.attr('data-latex'), "\\frac{x}{y}", '公式latex值设置正确');
    equal(editor.getContent(), '<p><span class="mathquill-embedded-latex">\\frac{x}{y}</span></p>', '正常设置内容');
});

/**
 * horizontal
 */

test('plugins.horizontal:horizontal', function () {
    if (ua.browser.ie)return;//
    var editor = te.obj[0];
    var d = editor.document;
    var range = te.obj[1];
    var db = editor.body;

    editor.setContent('<p>hello</p><b><i>top</i></b><p>bottom</p>');
    setTimeout(function () {
        range.setStart(d.getElementsByTagName('i')[0].firstChild, 0).setEnd(db.lastChild.firstChild, 5).select();
        editor.execCommand('horizontal');
        //<p>hello</p><hr>m
        if (ua.browser.gecko)
            equal(ua.getChildHTML(db), '<p>hello</p><hr>m', "horizontal");
        else
            equal(ua.getChildHTML(db), '<p>hello</p><hr><p>m<br></p>', "horizontal");
        start();
    }, 50);
    stop();
});

/**
 * image
 */

test('plugins.image:插入新图像', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p><br></p>');
    range.setStart(body.firstChild, 0).collapse(1).select();
    editor.execCommand('insertimage', {src: 'http://img.baidu.com/hi/jx2/j_0001.gif', width: 50, height: 52});
    ua.manualDeleteFillData(editor.body);
    var img = body.getElementsByTagName('img')[0];
    equal(img.getAttribute('src'), 'http://img.baidu.com/hi/jx2/j_0001.gif', '比较src');
    equal(img.getAttribute('width'), '50', '比较width');
    equal(img.getAttribute('height'), '52', '比较height');
});

/**
 * inserthtml
 */

test('plugins.inserthtml:闭合方式插入文本', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p><br></p>');
    range.setStart(body.firstChild, 0).collapse(1).select();
    editor.execCommand('inserthtml', 'hello2');
    equal(ua.getChildHTML(body), '<p>hello2</p>', '插入文本节点');
});

/**
 * justify
 */

test('plugins.justify:闭合在段落中设置对齐方式', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.focus();
    editor.setContent('<p><em>hello1</em></p>');
    if (ua.browser.gecko) {
        range.setStart(editor.body.firstChild.firstChild, 0).collapse(true).select();
    }
    editor.execCommand('justifycenter');
    setTimeout(function () {
        range.setStart(body.firstChild.firstChild.firstChild, 3).collapse(true).select();
        if (ua.browser.webkit)
            equal(body.firstChild.style['textAlign'], 'center', 'p对齐方式为居中对齐');
        else
            equal(editor.body.firstChild.align, 'center', 'p对齐方式为居中对齐');
        start();
    }, 50);
    stop();
});

/**
 * keystrokes
 */


test('plugins.keystrokes:删除块元素，块元素在后', function () {
    var editor = te.obj[0];
    editor.setContent('<h1>hello<br></h1><h2><img src="http://img.baidu.com/hi/jx2/j_0015.gif" /></h2>');
    var range = te.obj[1];
    setTimeout(function () {
        range.setStart(editor.body.lastChild.lastChild, 0).setEnd(editor.body.lastChild.lastChild, 1).select();
        ua.keydown(editor.body, {'keyCode': 8});
        ua.keyup(editor.body, {'keyCode': 8});
        setTimeout(function () {
            equal(te.obj[0].undoManger.index, 1, '');
            var html = '<h1>hello<br></h1>';
            if (!ua.browser.opera)
                equal(ua.getChildHTML(te.obj[0].body), html, '删除块元素');
            start();
        }, 20);
    }, 20);
    stop();
});

/**
 * link
 */

test('plugins.link:插入超链接', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent('<p>hello</p>');
    range.setStart(editor.body.firstChild, 1).collapse(1).select();
    editor.execCommand('link', {href: 'www.baidu.com'});
    var a = editor.body.getElementsByTagName('a')[0];
    range.selectNode(a).select();
    range = editor.selection.getRange();
    same(editor.queryCommandValue('link'), a, 'link value is a');
    equal(ua.getChildHTML(editor.body), '<p>hello<a href="www.baidu.com">www.baidu.com</a></p>');
    equal(editor.queryCommandState('unlink'), 0, 'link state is 0');
});
/**
 * paragraph
 */

test('plugins.paragraph:闭合h1和p之间的转换', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p>hello</p><p>hello2</p>');
    setTimeout(function () {
        range.setStart(body.firstChild.firstChild, 1).collapse(1).select();
        /*p===>h1*/
        editor.execCommand('paragraph', 'h1');
        equal(ua.getChildHTML(body), '<h1>hello</h1><p>hello2</p>');
        start();
    }, 50);
    stop();
});

/**
 * paste
 */

test('plugins.paste:粘贴', function () {
    if (ua.browser.ie || ua.browser.opera)return;
    var div = document.body.appendChild(document.createElement('div'));
    $(div).css('width', '500px').css('height', '500px').css('border', '1px solid #ccc');
    var me = te.obj[2];
    me.render(div);
    stop();
    me.ready(function () {
        var range = new UM.dom.Range(te.obj[2].document, te.obj[2].body);
        me.focus();
        me.setContent('<p>hello</p>');
        range.setStart(me.body.firstChild, 0).collapse(true).select();
        ua.keydown(me.body, {'keyCode': 65, 'ctrlKey': true});
        ua.keydown(me.body, {'keyCode': 67, 'ctrlKey': true});
        setTimeout(function () {
            me.focus();
            range.setStart(me.body.firstChild, 0).collapse(true).select();
            ua.paste(me.body, {'keyCode': 86, 'ctrlKey': true});
            equal(me.body.lastChild.id, 'baidu_pastebin', '检查id');
            equal(me.body.lastChild.style.position, 'absolute', '检查style');
            div.parentNode.removeChild(div);
            start();
        }, 500);
        stop();
    });
});

/**
 * preview
 */

//test('plugins.preview:设置内容后后预览', function () {
//    if (ua.browser.gecko)return;//ff总不停打开窗口,实际操作没问题
//    var editor = te.obj[0];
//    var body = editor.body;
//    var html = '<p><span style="color:#ff0000">你好，<strong><em>我亲爱</em></strong></span><strong><em>的朋</em></strong>友</p>';
//    var html_ie10 = "<p><span style=\"color: rgb(255, 0, 0);\">你好，<strong><em>我亲爱</em></strong></span><strong><em>的朋</em></strong>友</p>";
//    editor.setContent(html);
//    editor.focus();
//    editor.execCommand('preview');
//    ua.checkSameHtml(body.innerHTML, (ua.browser.ie > 8) ? html_ie10 : html, '预览不会对页面代码产生影响');
//});


/**
 * removeformat
 */

test('plugins.removeformat:不闭合方式清除样式', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p><em><strong>hello1</strong></em></p><p><strong><em>hello2</em></strong></p>');
    range.selectNode(body.firstChild.firstChild).select();
    editor.execCommand('removeformat');
    equal(ua.getChildHTML(body), '<p>hello1</p><p><strong><em>hello2</em></strong></p>');
});

/**
 * selectall
 */

test('plugins.selectall:selectall', function () {
    var editor = te.obj[0], db = editor.body;
    editor.setContent('<p><em>xxxx</em></p>ssss');
    editor.focus();
    editor.execCommand('selectAll');
    editor.execCommand("bold");
    if (ua.browser.gecko)
        equal(editor.getContent(db), "<p><strong><em>xxxx</em></strong></p><p><strong>ssss</strong></p>", "after calling selectall command");
    else
        equal(editor.getContent(db), "<p><em><strong>xxxx</strong></em></p><p><strong>ssss</strong></p>", "after calling selectall command");
});


/**
 * source
 */

test('plugins.source:b,i标签，切换源码后自动转换成strong和em', function () {
    var editor = te.obj[0];
    editor.setContent('<p><b>加粗的内容</b><i>斜体的内容<b>加粗且斜体</b></i></p>');
    setTimeout(function () {
        editor.execCommand('source');
        setTimeout(function () {
            editor.execCommand('source');
            start();
        }, 100);
    }, 100);
    stop();
    equal(editor.getContent(), '<p><strong>加粗的内容</strong><em>斜体的内容<strong>加粗且斜体</strong></em></p>');
});

/**
 * undo
 */

test('plugins.undo:ctrl+z/y', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    var body = editor.body;
    editor.setContent('<p>没有加粗的文本</p>');
    range.selectNode(body.firstChild).select();
    var p = body.firstChild;
    editor.focus();
    setTimeout(function () {
        ua.keydown(editor.body, {'keyCode': 66, 'ctrlKey': true});
        setTimeout(function () {
            if (ua.browser.ie)
                equal(ua.getChildHTML(p), '<strong>没有加粗的文本</strong>');
            else
                equal(ua.getChildHTML(p), '<b>没有加粗的文本</b>');
            ua.keydown(editor.body, {'keyCode': 90, 'ctrlKey': true});
            setTimeout(function () {
                editor.focus();
                equal(ua.getChildHTML(body.firstChild), '没有加粗的文本');
                ua.keydown(editor.body, {'keyCode': 89, 'ctrlKey': true});
                editor.focus();
                setTimeout(function () {
                    equal(ua.getChildHTML(body.firstChild), '<strong>没有加粗的文本</strong>');

                    start();
                }, 500);
            }, 100);
        }, 150);
    }, 100);
    stop();
});

/**
 * video
 */

test('plugins.video:视频', function () {
    var editor = te.obj[0];
    var range = te.obj[1];
    editor.setContent('<p>hello</p>');
    range.setStart(editor.body.firstChild, 0).collapse(true).select();
    var videoObject = {url: "http://player.youku.com/player.php/Type/Folder/Fid/19275705/Ob/1/sid/XNTU3Mjk4NzQ4/v.swf", width: "500", height: "400", align: "right"};
    editor.execCommand('insertvideo', videoObject);
    stop();
    setTimeout(function () {
        var img = editor.body.getElementsByTagName('img');
        equal(img.length, 1, '插入img');
        equal(img[0].width, "500");
        equal(img[0].height, "400");
        equal(img[0].src, editor.options.UMEDITOR_HOME_URL + 'themes/default/images/spacer.gif');
        equal(ua.getFloatStyle(img[0]), 'right');//trace 3653
        if (ua.browser.gecko || ua.browser.ie > 8) {
            ok(img[0].style.background.indexOf('url(\"' + editor.options.UMEDITOR_HOME_URL + 'themes/default/images/videologo.gif\")') > -1);
        }
        else {
            ok(img[0].style.background.indexOf("url(" + editor.options.UMEDITOR_HOME_URL + "themes/default/images/videologo.gif)") > -1);
        }
        start();
    }, 100);
});
/*
 *buttoncombobox
 * */
test('ui.buttoncombobox: 检测buttoncombobox行为是否正确', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.id = 'ue';
    var editor = UM.getEditor('ue');
    stop();
    editor.ready(function () {

        var coboboxOptions = {
                label: 'test',
                title: 'test',
                comboboxName: 'test',
                recordStack: [ 'h2', 'h4' ],
                items: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5' ],
                value: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5' ],
                autowidthitem: [ 'p', 'h1', 'h2', 'h3', 'h4', 'h5' ],
                autoRecord: true
            },
            $combox = null,
            $btn = null,
            $item = null,
            oldIE6 = $.IE6;

        $.IE6 = true;
        $combox = $.eduibuttoncombobox(coboboxOptions);
        $.IE6 = oldIE6;
        $btn = $combox.edui().button();


        $combox.appendTo(editor.$container.find('.edui-dialog-container'));
        $(".edui-btn-toolbar", editor.$container).append($btn.addClass("edui-combobox"));

        setTimeout(function () {

            //测试弹出层位置是否正常
            $btn.trigger("click");

            setTimeout(function () {

                equal(Math.abs($combox.position().left - $btn.position().left) < 3, true, '弹出层的左边界对齐正常');
                equal(Math.abs($combox.position().top - ($btn.position().top + $btn.outerHeight())) < 2, true, '弹出层的上边界对齐正常');

                //hover背景改变
                $item = $(".edui-combobox-item:first", $combox);

                $item.addClass("edui-combobox-item-hover");
                equal(ua.formatColor($item.css("backgroundColor")), "#d5e1f2", 'hover in 背景色正常');
                $item.removeClass("edui-combobox-item-hover");
                equal($item.css("backgroundColor") !== "rgb(213, 225, 242)", true, 'hover out 背景色正常');

                //选中第一个
                $item.trigger("click");
                equal($(".edui-button-label", $btn).text(), "p", "标签选择之后， 按钮文字正常");

                $item = $(".edui-combobox-item:first", $combox);

                equal($item.hasClass("edui-combobox-checked"), true, "标签选择之后， 标签已添加选中状态class");

                equal($(".edui-combobox-item-separator", $combox).length, 1, "历史记录的分割线正常出现");
                equal($(".edui-combobox-item", $combox).length, coboboxOptions.items.length + 1, "历史记录条数正确");
                //选中历史记录
                $item.trigger("click");
                equal($(".edui-button-label", $btn).text(), "p", "选择历史记录之后， 按钮文字正常");

                equal($(".edui-combobox-item", $combox).length, coboboxOptions.items.length + 1, "历史记录条数正确");

                //根据label选择
                $combox.edui().selectItemByLabel('h3');
                equal($(".edui-button-label", $btn).text(), "h3", "根据label选择后， 按钮文字正常");

                equal($(".edui-combobox-item", $combox).length, coboboxOptions.items.length + 2, "历史记录条数正确");
                setTimeout(function () {
                    UM.delEditor('ue');
                    document.getElementById('ue') && te.dom.push(document.getElementById('ue'));
                    start();
                }, 500);
            }, 500);
        }, 500);
    });
});
/*
 *colorpicker
 * */
test('ui.colorpicker:colorpicker--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test_');

    $colorPickerWidget = $.eduicolorpicker({
        lang_clearColor: '清除',
        lang_themeColor: '主题',
        lang_standardColor: '标准'
    }).appendTo(div);

    var $btn = $.eduibutton({
        icon: "bold",
        title: "测试"
    }).appendTo(div);

    stop();
    setTimeout(function () {
        $colorPickerWidget.edui().show($btn);

        var isshow = $colorPickerWidget.css("display") != "none";
        equal(isshow, true, '检查菜单是否显示');

        $colorPickerWidget.edui().hide();
        var ishide = $colorPickerWidget.css("display") == "none";
        equal(ishide, true, '检查菜单是否隐藏');

        var ele = $colorPickerWidget.find("table .edui-colorpicker-colorcell")[0];
        var color = $(ele).data('color');

        $colorPickerWidget.on('pickcolor', function (evt, value) {
            equal(value, color, '检查菜单点击颜色是否正确');
            setTimeout(function () {
                div.parentNode.removeChild(div);
                start();
            }, 100);
        });

        ua.click(ele);

    });
});
/*
 ui.dropmenu
 * */
test('ui.dropmenu:dropmenu--初始化', function () {


    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');
    expect(5);
    var item, value,
        $dropMenuWidget = $.eduidropmenu({data: [
            {"value": "decimal", "label": "1,2,3..."},
            {"value": "lower-alpha", "label": "a,b,c..."},
            {"value": "lower-roman", "label": "i,ii,iii..."},
            {"value": "upper-alpha", "label": "A,B,C..."},
            {"value": "upper-roman", "label": "I,II,III..."}
        ], click: function (evt, val) {
            equal(value, val, '检查菜单点击的value是否正确');
            div.parentNode.removeChild(div);

            $dropMenuWidget.edui().val('upper-alpha');
            equal($dropMenuWidget.edui().val(), 'upper-alpha', '检查设置菜单值是否正常');

            $dropMenuWidget.edui().disabled(true);
            equal($dropMenuWidget.find("li").hasClass('edui-disabled'), true, '检查选项失效后，菜单项是否有disabled的class');

            $dropMenuWidget.edui().disabled(false);
            equal($dropMenuWidget.find("li").hasClass('edui-disabled'), false, '检查选项失效后，菜单项是否没有disabled的class');
            var $subMenuWidget = $.eduidropmenu({data: [
                {"value": "decimal", "label": "1,2,3..."},
                {"value": "lower-alpha", "label": "a,b,c..."},
                {"value": "lower-roman", "label": "i,ii,iii..."},
                {"value": "upper-alpha", "label": "A,B,C..."},
                {"value": "upper-roman", "label": "I,II,III..."}
            ]});
            $dropMenuWidget.edui().addSubmenu('subMenu', $subMenuWidget, 5);
            equal($dropMenuWidget.find(".edui-dropdown-menu").length != 0, true, '检查是否已插入子节点');
            div.parentNode && div.parentNode.removeChild(div);
        }}).appendTo(div);

    var $btn = $.eduibutton({
        icon: "paragraph",
        title: "测试"
    }).appendTo(div);

    $dropMenuWidget.edui().show($btn);
    $item = $dropMenuWidget.find("li").eq(0);
    value = $item.data('value');


    $item.trigger('click');

    stop();
    setTimeout(function () {
        start();
    }, 200);
});
/*
 ui.menu
 * */
test('ui.menu:menu--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $dropMenuWidget = $.eduidropmenu({data: [
        {"value": "decimal", "label": "1,2,3..."},
        {"value": "lower-alpha", "label": "a,b,c..."},
        {"value": "lower-roman", "label": "i,ii,iii..."},
        {"value": "upper-alpha", "label": "A,B,C..."},
        {"value": "upper-roman", "label": "I,II,III..."}
    ]}).appendTo(div);

    var $btn = $.eduibutton({
        icon: "paragraph",
        title: "测试"
    }).appendTo(div);

    equal($btn.data('$mergeObj') == undefined, true, 'attachTo方法执行之前，按钮没有data("$mergeObj")');
    $dropMenuWidget.edui().attachTo($btn);
    equal($btn.data('$mergeObj') != undefined, true, 'attachTo方法执行之后，按钮有data("$mergeObj")');

    var $subMenuWidget = $.eduidropmenu({data: [
        {"value": "decimal", "label": "1,2,3..."},
        {"value": "lower-alpha", "label": "a,b,c..."},
        {"value": "lower-roman", "label": "i,ii,iii..."},
        {"value": "upper-alpha", "label": "A,B,C..."},
        {"value": "upper-roman", "label": "I,II,III..."}
    ]});
    //插入子菜单
    $dropMenuWidget.edui().addSubmenu('subMenu', $subMenuWidget, 5);

    ua.click($btn[0]);

    setTimeout(function () {
        var isshow = $dropMenuWidget.css("display") != "none";
        equal(isshow, true, '检查菜单是否显示');

        ua.click($dropMenuWidget.find('li')[0]);
        setTimeout(function () {
            var ishide = $dropMenuWidget.css("display") == "none";
            equal(ishide, true, '检查菜单是否隐藏');

            div.parentNode && div.parentNode.removeChild(div);
            start();
        }, 100);

    }, 100);
    stop();
});
/*
 ui.modal
 * */

test('ui.modal:modal--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');
    stop();
    setTimeout(function () {
        var $dialog = $.eduimodal({
            title: "titletest",
            width: 300,
            height: 400,
            oklabel: 'oktest',
            cancellabel: 'canceltest'
        }).appendTo(div);

        var title = $('.edui-title', $dialog).text();
        equal(title, 'titletest', '检查dialog标题');

        var oklabel = $('[data-ok="modal"]', $dialog).text();
        equal(oklabel, 'oktest', '检查dialog确定按钮文本');

        var cancellabel = $('.edui-modal-footer [data-hide="modal"]', $dialog).text();
        equal(cancellabel, 'canceltest', '检查dialog取消按钮文本');

        var wt = $dialog.width();
        equal(wt, 300, '检查dialog宽度');

        var ht = $('.edui-modal-body', $dialog).height();
        equal(ht, 400, '检查dialog高度');

        div.parentNode && div.parentNode.removeChild(div);
        start();
    });
});
/*
 * ui.popup
 * */
test('ui.popup:popup--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $btn = $.eduibutton({
        icon: "bold",
        title: "测试"
    }).appendTo(div);

    var $popupWidget = $.eduipopup({
        subtpl: '<span class="test">popup text</span>',
        width: '100',
        height: '100'
    });

    $popupWidget.edui().show($btn,{
        offsetTop:-5,
        offsetLeft:10,
        caretLeft:11,
        caretTop:-8
    });

    equal($popupWidget.edui().getBodyContainer()!=null, true, '检查getBodyContaine是否正常');

    setTimeout(function(){

        var isshow = $popupWidget.css("display") != "none";
        equal(isshow, true, '检查popup是否显示');

        $popupWidget.edui().hide();
        var ishide = $popupWidget.css("display") == "none";
        equal(ishide, true, '检查popup是否隐藏');


        $(div).remove();
        start();
    },100);
    stop();
});
/*
 * ui.scale
 * */

test( 'ui.scale:鼠标在八个角上拖拽改变图片大小', function() {
    if ( ua.browser.webkit ) {
        var sc = document.createElement("script");
        sc.id="sc";
        sc.type = "text/plain";
        document.body.appendChild(sc);
        var editor = UM.getEditor(sc.id, {initialFrameWidth:800,initialFrameHeight:320,autoHeightEnabled:true});
        editor.ready(function () {
            editor.setContent( '<p>修正webkit下图片选择的问题<img src="" width="200" height="100" />修正webkit下图片选择的问题</p>' );
            var img = editor.body.getElementsByTagName( 'img' )[0];

            var $scale = $.eduiscale({'$wrap':editor.$container}).css('zIndex', editor.options.zIndex);
            editor.$container.append($scale);
            $scale.edui().show($(img));
            ok($scale.css('display')!='none', "检查八个角是否已出现");

            var width = $scale.width(),
                height = $scale.height();

            ua.mousedown( $scale.find('.edui-scale-hand0')[0], {clientX: 322, clientY: 281} );
            ua.mousemove( document, {clientX: 352, clientY: 301} );
            equal(width-$scale.width(), 30, "检查鼠标拖拽中图片宽度是否正确 --");
            equal(height-$scale.height(), 20, "检查鼠标拖拽中图片高度是否正确 --");

            ua.mousemove( document, {clientX: 382, clientY: 321} );
            ua.mouseup( document, {clientX: 382, clientY: 321} );
            equal(width-$scale.width(), 60, "检查鼠标拖拽完毕图片高度是否正确 --");
            equal(height-$scale.height(), 40, "检查鼠标拖拽完毕图片高度是否正确 --");
            ok($(img).width() == $scale.width() && $(img).height() == $scale.height(), "检查八个角和图片宽高度是否相等");

            $scale.edui().hide();
            ok($scale.css('display')=='none', "检查八个角是否已消失");
            domUtils.remove(editor.container);
            start();
        });
        stop();
    }
} );
/*
 * ui.separator
 * */
test('ui.separator:separator--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $separatorWidget = $.eduiseparator().appendTo(div);
    equal($separatorWidget.parent()!=null,true, '判断ui是否已插入到dom上');
    equal($separatorWidget.hasClass('edui-separator'),true, '判断ui的html内容是否正确');
    $separatorWidget.parent();
    $(div).remove();
});
/*
 * ui.splitbutton
 * */
test('ui.splitbutton:splitbutton--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $btn = $.eduisplitbutton({
        "icon":"forecolor",
        "caret":true,
        "name":"forecolor",
        "title":"字体颜色",
        "click":function(){
            this.root().addClass('afterBtnClick');
        }
    }).appendTo(div);
    $btn.edui().disabled(true);
    equal($btn.hasClass('edui-disabled'), true, '检查是否有disabled的class');
    $btn.edui().disabled(false);
    equal($btn.hasClass('edui-disabled'), false, '检查是否没有disabled的class');

    $btn.edui().active(true);
    equal($btn.edui().active(), true, '检查是否有disabled的class');
    $btn.edui().active(false);
    equal($btn.edui().active(), false, '检查是否有disabled的class');

    $popup = $.eduipopup({
        subtpl: '<span class="test">popup text</span>',
        width: '100',
        height: '100'
    });
    equal($popup.edui().data('$mergeObj')==null, true, '检查是否没有disabled的class');
    $btn.edui().mergeWith($popup);
    equal($popup.edui().data('$mergeObj')!=null, true, '检查是否有disabled的class');

    $btn.find('.edui-btn:first').trigger('click');
    $btn.find('.edui-dropdown-toggle').trigger('click');
    setTimeout(function(){
        equal($btn.hasClass('afterBtnClick'), true, '判断点击是否触发设定好的监听函数');
        equal($popup.css('display')!='none', true, '判断是否已出现颜色选择面板');
        start();
    }, 50);

    $(div).remove();
    stop();
});
/*
 * ui.tab
 * */
test('ui.tab:tab--初始化 操作', function () {
    var div = document.body.appendChild(document.createElement('div'));
    div.innerHTML = '<ul class="edui-tab-nav">' +
        '<li class="edui-tab-item edui-active"><a href="#edui-test1" class="edui-tab-text">1</a></li>' +
        '<li class="edui-tab-item"><a href="#edui-test2" class="edui-tab-text">2</a></li>' +
        '</ul>' +
        '<div class="edui-tab-content" >' +
        '<div  class="edui-tab-pane active" id="edui-test1">1个</div>' +
        '<div class="edui-tab-pane" id="edui-test2">2个</div>' +
        '</div>';
    $(div).attr('id', 'edui-test');
    stop();
    setTimeout(function () {
        $tab = $.eduitab({selector: "#edui-test"})
            .edui();

        var index=$tab.activate();
        equal(index,0,'检查tab初始化时应该显示第一个tab');

        var $tgt=$('[href="#edui-test2"]',$tab.root());
        ua.click($tgt[0]);
        var index2=$tab.activate();
        equal(index2,1,'检查点击第2个tab时应该显示第2个tab');

        div.parentNode.removeChild(div);
        start();
    });
});
/*
 * ui.toolbar
 * */
test('toolbar--初始化', function () {
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $toolbarWidget = $.eduitoolbar().appendTo(div);
    equal($toolbarWidget.parent()!=null,true, '判断ui是否已插入到dom上');
    equal($toolbarWidget.hasClass('edui-toolbar'),true, '判断ui的html内容是否正确');

    var $btn = $.eduibutton({
        icon: "bold",
        title: "测试按钮"
    });

    $toolbarWidget.edui().appendToBtnmenu([$btn]);
    equal($toolbarWidget.html().indexOf('测试按钮')!=-1,true, '判断按钮是否已插入到toolbar');

    $(div).remove();
});
/*
 * ui.tooltip
 * */
test('ui.tooltip:tooltip', function () {
    var div = document.body.appendChild(document.createElement('div'));
    var $btn=$.eduibutton({
        icon : "bold",
        title: "测试"
    }).appendTo(div);

    $(div).attr('id', 'edui-test');
    $.eduitooltip('attachTo',$btn);

    setTimeout(function () {
        if(browser.ie){
            ua.mouseenter($btn[0]);
        }else{
            ua.mouseover($btn[0]);
        }
        var isshow=$(".edui-tooltip",$btn).css("display")!="none";
        equal(isshow,true,"检查按钮提示是否显示");

        ua.click($btn[0]);

        var ishide=$(".edui-tooltip",$btn).css("display")=="none";

        equal(ishide,true,"检查按钮提示是否隐藏");


        $btn.edui().disabled(true);
        if(browser.ie){
            ua.mouseenter($btn[0]);
        }else{
            ua.mouseover($btn[0]);
        }
        isHide=$(".edui-tooltip",$btn).css("display")=="none";
        equal(isHide,true,"检查不可用的按钮不应该有提示");

        div.parentNode.removeChild(div);

        start();
    });
    stop();
});
/*
 * ui.widget
 * */
test('ui.widget:widget--初始化',function(){
    var div = document.body.appendChild(document.createElement('div'));
    $(div).attr('id', 'test');

    var $widget = $.eduibutton({
            icon: "bold",
            title: "测试"
        }).appendTo(div),
        widgetedui = $widget.edui(),
        AddClassHandler = function(){
            $widget.addClass('testWidget');
        };
    equal($widget.parent()!=null, true, '判断ui是否已插入到dom上');

    //测试on和trigger方法
    widgetedui.on('click', AddClassHandler);
    widgetedui.trigger('click');
    equal($widget.hasClass('testWidget'), true, '判断是否已设置testWidget的class');

    $widget.removeClass('testWidget');
    equal($widget.hasClass('testWidget'), false, '判断是已去除testWidget的class');

    //测试off和trigger方法
    widgetedui.off('click', AddClassHandler);
    widgetedui.trigger('click');
    equal($widget.hasClass('testWidget'), false, '判断是否没有testWidget的class');

    //测试root和register方法
    widgetedui.register('click', widgetedui.root(), function(){
        $widget.addClass('registerClick');
    });
    equal($widget.hasClass('registerClick'), false, '判断是否未设置registerClick的class');
    $widget.parent().trigger('click');
    equal($widget.hasClass('registerClick'), true, '判断是否已设置registerClick的class');

    //测试data方法
    widgetedui.data('testdata', '123456');
    equal(widgetedui.data('testdata'), '123456', '判断是否data数据是否设置正常');
});