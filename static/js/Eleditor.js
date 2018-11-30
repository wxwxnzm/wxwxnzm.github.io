/**
* Version: 1.8.8
* Title: Eleditor 移动端富文本编辑器
* Site: https://eleditor.fixel.cn
* Doc: http://doc.eleditor.fixel.cn
* Author: Try
*/
	var _namespace = 'Eleditor';
	var _notctname = ['INPUT', 'IMG', 'TEXTAREA'];
	
	window[_namespace] = function(){};
	function pasteHtmlAtCaret(html, selectPastedContent) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ( (node = el.firstChild) ) {
                    lastNode = frag.appendChild(node);
                }
                var firstNode = frag.firstChild;
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    if (selectPastedContent) {
                        range.setStartBefore(firstNode);
                    } else {
                        range.collapse(true);
                    }
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if ( (sel = document.selection) && sel.type != "Control") {
            // IE < 9
            var originalRange = sel.createRange();
            originalRange.collapse(true);
            sel.createRange().pasteHTML(html);
            if (selectPastedContent) {
                range = sel.createRange();
                range.setEndPoint("StartToStart", originalRange);
                range.select();
            }
        }
    }
	// if( typeof jQuery === 'undefined' && typeof Zepto === 'undefined' ){
	// 	return console.warn('|--Eleditor 请引入jQuery或者Zepto！模块化环境请把依赖全局安装');
	// }else if( typeof $ === 'undefined' ){
	// 	var $ = typeof jQuery != 'undefined' ? jQuery : Zepto;
	// }


	var _inArray = function(s,a){
	    for(var i in a){
	        if(a[i]==s){
	            return true;
	        }
	    }
	    return false;
	};
	var _formatInnerText = function (t) {
		var s = t.replace(/\ +/g, "");
		s = s.replace(/[ ]/g, "");
		s = s.replace(/[\r\n]/g, "");
		return s.replace(/(^\s*)|(\s*$)/g, "");
	};
	var _getLayerMaxZIndex = function(){
	    var _max = Math.max.apply(null, 
	    　　$.map($('body *'), function(e) {
	    		var _$e = $(e);
				if (_$e.css('position') != 'static')
					return parseInt(_$e.css('z-index')) || 1;
	    }));
	    return (_max + '').indexOf('Infinity') >= 0 ? 1 : _max + 1;
	};

	var _genEditorUid = function(){
		return _namespace + '' + +new Date;
	};


	var _correctHtmlStructure = function(){

		var _$wrap = arguments[0],
			_empty = arguments[1];


		$.each(_$wrap.find('iframe,audio,video'), function() {
			var _$this = $(this),
				_tagName = this.tagName.toLocaleLowerCase();

			if( !_$this.parent().hasClass('Eleditor-'+_tagName+'-area') ){
				$(this).wrap('<div class="Eleditor-'+_tagName+'-area"></div>');
			}
		});



		if( _formatInnerText(_$wrap.text()) == '' && _$wrap.find('img,iframe,video').length === 0 ){
		}

	};

	var _buildEditorModule = function(_toolbars, _uid){

		var _html = '<div class="Eleditor-wrap" style="z-index:'+_getLayerMaxZIndex()+'" id="'+_uid+'">\
                                <div class="Eleditor-loading"><p></p></div>\
                                <div class="Eleditor-textEditor">\
                                    <div class="Eleditor-textStyle">\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bold"></div></div>\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-color"><span></span></div></div>\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-linedecoration"></div></div>\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-bgColor"></div></div>\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-fontSize"></div></div>\
                                        <div class="Eleditor-textStyle-item"><div class="Eleditor-textStyle-lineHeight"></div></div>\
                                    </div>\
                                    <div class="Eleditor-textStyle">\
                                        <div class="Eleditor-textStyle-item">\
                                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignLeft" align="left"></div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item">\
                                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignCenter" align="center">\
                                            </div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item">\
                                            <div class="Eleditor-textStyle-align Eleditor-textStyle-alignRight" align="right">\
                                            </div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upImg">\
                                            <div class="Eleditor-textStyle-upImg"></div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upVideo">\
                                            <div class="Eleditor-textStyle-upVideo"></div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upVoice">\
                                            <div class="Eleditor-textStyle-upVoice"></div>\
                                        </div>\
                                    </div>\
                                    <div class="Eleditor-textEditor-colors">\
                                        <div class="Eleditor-textEditor-modulePane"><span></span></div>\
                                        <ul>\
                                            <li><span style="background-color:#232323;"></span></li>\
                                            <li><span style="background-color:#2196F3;"></span></li>\
                                            <li><span style="background-color:#795548;"></span></li>\
                                            <li><span style="background-color:#00BCD4;"></span></li>\
                                            <li><span style="background-color:#4CAF50;"></span></li>\
                                            <li><span style="background-color:#E666E5;"></span></li>\
                                            <li><span style="background-color:#FF9800;"></span></li>\
                                            <li><span style="background-color:#FF5722;"></span></li>\
                                            <li><span style="background-color:#ff2a1a;"></span></li>\
                                            <li><span style="background-color:#FFEB3B;"></span></li>\
                                            <li><span style="background-color:#ffffff;border: 1px solid #ccc;"></span></li>\
                                            <li>\
                                                <span class="Eleditor-inheritValue" style="background-color:transparent; border: 1px solid #dedede;">\
                                                </span>\
                                            </li>\
                                        </ul>\
                                    </div>\
                                    <div class="Eleditor-textEditor-fontsizes">\
                                        <div class="Eleditor-textEditor-modulePane"><span>字体大小</span></div>\
                                        <ul>\
                                            <li class="Eleditor-inheritValue">默认</li>\
                                            <li>14px</li>\
                                            <li>16px</li>\
                                            <li>20px</li>\
                                            <li>28px</li>\
                                            <li>35px</li>\
                                        </ul>\
                                    </div>\
                                    <div class="Eleditor-textEditor-lineheight">\
                                        <div class="Eleditor-textEditor-modulePane"><span>行高</span></div>\
                                        <ul>\
                                            <li class="Eleditor-inheritValue">默认</li>\
                                            <li>20px</li>\
                                            <li>25px</li>\
                                            <li>30px</li>\
                                            <li>35px</li>\
                                            <li>40px</li>\
                                        </ul>\
                                    </div>\
                                    <div class="Eleditor-textEditor-linedecorations">\
                                        <div class="Eleditor-textEditor-modulePane"><span>文本修饰</span></div>\
                                        <ul>\
                                            <li class="Eleditor-inheritValue">无</li>\
                                            <li style="text-decoration: overline">上划线修饰</li>\
                                            <li style="text-decoration: line-through">删除线修饰</li>\
                                            <li style="text-decoration: underline">下划线修饰</li>\
                                        </ul>\
                                    </div>\
                                    <div class="Eleditor-textEditor-formats">\
                                        <div class="Eleditor-textEditor-format"></div>\
                                        <div class="Eleditor-textEditor-clean"></div>\
                                    </div>\
                                    <div class="Eleditor-inputarea ">\
                                        <div placeholder="点击输入内容"  class="textarea needsclick" contenteditable="true"></div>\
                                    </div>\
								</div>\
								<input type="file" accept="video/*" class="Eleditor-input-file-video needsclick">\
            					<input type="file" accept="image/*" class="Eleditor-input-file-image needsclick">\
                            </div>';
		return _html;
	};

	window[_namespace] = function(){

		console.log('|--Eleditor Initing');

		var _args = arguments[0];
			_args.upload = _args.upload || {};
			_args.mounted = _args.mounted || function(){};
			_args.changer = _args.changer || function(){};
			_args.toolbars = _args.toolbars || [],
			// _undolen = isNaN(_args._undolen) ? 10 : _args._undolen;
			_editorUid = _genEditorUid(),
			_historys = [],
			_lastEditRange = null,
			_uploadRole = null;


		if( _args.el instanceof jQuery ){
			var _$wrap = _args.el;
		}else{
			var _$wrap = $(_args.el);
			
			if( _$wrap.length === 0 ){
				return console.warn('|--Eleditor '+_args.el+'元素不存在，请在DOMContentLoaded后初始化Eleditor');
			}else if( _$wrap.length != 1 ){
				var _$wrap = $(_$wrap[0]);
			}

		}

		if( _$wrap.attr('Eleditor-Inited') === 'true' ){
			return console.warn('|--Eleditor '+_args.el+'已经绑定了Eleditor');
		}

		_$wrap.attr({'Eleditor-Inited': 'true', 'Eleditor-Uid': _editorUid});

		_correctHtmlStructure(_$wrap);

		/*insert editor*/
		var _lastScrollH = null;
		var _$window = $(window);
		var _$scrollWrap = $('html,body');
		var _$editorWrap = $(_buildEditorModule(_args.toolbars, _editorUid));
		var _$editorLoadingMask = _$editorWrap.find('.Eleditor-loading');
		var _$editorTextModule = _$editorWrap.find('.Eleditor-textEditor');
		var _$editorTextArea = _$editorTextModule.find(".Eleditor-inputarea .textarea");
		var _$editorColorModule = _$editorTextModule.find(".Eleditor-textEditor-colors");
		var _$editorFontsizeModule = _$editorTextModule.find(".Eleditor-textEditor-fontsizes");
		var _$editorUndoBtn = _$editorWrap.find(".Eleditor-undo");
		var _$editorLineheightModule = _$editorTextModule.find(".Eleditor-textEditor-lineheight");
		var _$editorLinedecorationsModule = _$editorTextModule.find(".Eleditor-textEditor-linedecorations");

		_$wrap.after(_$editorWrap);

		console.log('|--Eleditor Mounted To', _$wrap);

		/*bindEvent*/
		var _$selected = null,


			_hideEditorControllerLayer = function(){

				_$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
				_$selected = null;
			};

			_flushEditorDeleteLayerHistoryBtn = function(){

				if( _historys.length > 0 ){
					_$editorWrap.find('.Eleditor-delete-revoke').removeClass('Eleditor-delete-revoke-disabled')
				}else{
					_$editorWrap.find('.Eleditor-delete-revoke').addClass('Eleditor-delete-revoke-disabled')
				}
			},
			_hideEditorDeleteLayer = function(){
				_$wrap.removeClass('Eleditor-deleteMode');
				_$editorDeleteLayer.hide();
			};

		var _showEditorWrapMask = function(){
				_$editorWrap.addClass('Eleditor-mask');
				_lastScrollH = _$window.scrollTop();
				_$scrollWrap.addClass('Eleditor-scrollLocked');
			},
			_hideEditorWrapMask = function(){
				_$editorWrap.removeClass('Eleditor-mask');
				_$scrollWrap.removeClass('Eleditor-scrollLocked');
				_$window.scrollTop(_lastScrollH);
			};

		var _showLoadingMask = function(){
				_showEditorWrapMask();
				_$editorLoadingMask.show();
				_$editorLoadingMask.html('<p>'+arguments[0]+'</p>')
			},
			_hideLoadingMask = function(){
				_hideEditorWrapMask();
				_$editorLoadingMask.hide();
			};

		var _appendHistory = function(){

				_historys.push( _$wrap.html() );

				// if( _historys.length > _undolen ){
				// 	_historys.splice(0, 1)
				// }

				_flushHistoryBtn();
				_flushEditorDeleteLayerHistoryBtn();
				return true;
			},
			_revokeEdit = function(){

				if( _historys.length === 0 ){
					return;
				}

				_$wrap.html(_historys.pop());
				_args.changer();

				_flushHistoryBtn();
				_flushEditorDeleteLayerHistoryBtn();
			},
			_flushHistoryBtn = function(){

				if( _historys.length == 0 ){
					_$editorUndoBtn.hide();
				}else{
					_$editorUndoBtn.show();
				}

			};





		/*text area click*/



		/*textEditor*/
		_$editorTextModule.on('click', '.Eleditor-textStyle-bold', function() {
			_$editorTextArea.css("font-weight", $(this).hasClass("Eleditor-active") ? "normal" : "bold");
            $(this).toggleClass("Eleditor-active");
		});
		_$editorTextModule.on('click', '.Eleditor-textStyle-linedecoration', function() {
			_$editorLinedecorationsModule.show();
			$(this).addClass('Eleditor-active');
		});		
		_$editorTextModule.on('click', '.Eleditor-textStyle-color,.Eleditor-textStyle-bgColor', function() {
			var _$this = $(this);
			var _role = _$this.hasClass('Eleditor-textStyle-bgColor') ? 'bgcolor' : 'color';
			_$editorColorModule.find('.Eleditor-textEditor-modulePane span').html(_role == 'bgcolor' ? '文字背景颜色' : '文字颜色');
			_$editorColorModule.attr('role', _role).show();
			$(this).addClass('Eleditor-active');
		});
		_$editorTextModule.on('click', '.Eleditor-textStyle-fontSize', function() {
			_$editorFontsizeModule.show();
			$(this).addClass('Eleditor-active');
		});	
		_$editorTextModule.on('click', '.Eleditor-textStyle-lineHeight', function() {
			_$editorLineheightModule.show();
			$(this).addClass('Eleditor-active');
		});		
		_$editorLinedecorationsModule.on('click', 'ul li', function() {
			if( !$(this).hasClass('Eleditor-inheritValue') ){
				_$editorTextArea.css("text-decoration", $(this).css('text-decoration'));
			}else{
				_$editorTextArea.css("text-decoration", 'inherit');
				_$editorTextModule.find('.Eleditor-textStyle-linedecoration').removeClass('Eleditor-active');
			}
			_$editorLinedecorationsModule.hide();
		});	
		_$editorLineheightModule.on('click', 'ul li', function() {
			if( !$(this).hasClass('Eleditor-inheritValue') ){
				_$editorTextArea.css("line-height", $(this).html());
			}else{
				_$editorTextArea.css("line-height", 'inherit');
				_$editorTextModule.find('.Eleditor-textStyle-lineHeight').removeClass('Eleditor-active');
			}
			_$editorLineheightModule.hide();
		});						
		_$editorFontsizeModule.on('click', 'ul li', function() {
			if( !$(this).hasClass('Eleditor-inheritValue') ){
				_$editorTextArea.css("font-size", $(this).html());
			}else{
				_$editorTextArea.css("font-size", 'inherit');
				_$editorTextModule.find('.Eleditor-textStyle-fontSize').removeClass('Eleditor-active');
			}
			_$editorFontsizeModule.hide();
		});

		_$editorTextModule.on('click', ".Eleditor-textStyle-align", function() {
			var _align = $(this).attr('align');
			_$editorTextArea.css({"text-align": _align, "display": 'block'});
			_$editorTextModule.find(".Eleditor-textStyle-align.Eleditor-active").removeClass('Eleditor-active');
			$(this).addClass('Eleditor-active');
		});	

		_$editorTextModule.on('click', ".Eleditor-textEditor-format", function() {
			var _$cloneTextArea = _$editorTextArea,
				_removeAttrs = 'style width height border bgcolor align color';

			_$cloneTextArea.removeAttr(_removeAttrs);
			$.each(_$cloneTextArea.find('*'), function(_i, _e) {
				var _$eachElm = _$cloneTextArea.find(_e);
				if( _inArray(_e.tagName.toLocaleLowerCase(), ['script', 'style']) ){
					_$eachElm.remove();
				}else{
					_$eachElm.removeAttr(_removeAttrs);
				}
			});

			_$editorTextArea.html(_$cloneTextArea.html());
			_$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
		});

		_$editorTextModule.on('click', ".Eleditor-textEditor-clean", function() {
			confirm('确定清空内容（不可恢复）？') && _$editorTextArea.html("");
		});

			
		_$editorColorModule.on('click', 'ul li span', function() {
			var _color = $(this).css('background-color');
			if( _$editorColorModule.attr('role') == 'color' ){
				if( !$(this).hasClass('Eleditor-inheritValue') ){
					_$editorTextArea.css("color", _color);
					_$editorTextModule.find('.Eleditor-textStyle-color span').css("background-color", _color);
				}else{
					_$editorTextArea.css("color", 'inherit');
					_$editorTextModule.find('.Eleditor-textStyle-color').removeClass('Eleditor-active').find('span').removeAttr('style');
				}
			}else{
				if( !$(this).hasClass('Eleditor-inheritValue') ){
					_$editorTextArea.css("background-color", _color);
				}else{
					_$editorTextArea.css("background-color", 'inherit');
					_$editorTextModule.find('.Eleditor-textStyle-bgColor').removeClass('Eleditor-active');
				}
			}
			_$editorColorModule.hide();
		});
		_$editorTextArea.on('keyup', function() {
			var selection = getSelection()
			window.lastEditRange = selection.getRangeAt(0);
			// console.log(window.lastEditRange)
		})
		_$editorTextArea.on('click', function() {
			var selection = getSelection()
			window.lastEditRange = selection.getRangeAt(0);
			// console.log(window.lastEditRange)
		})

        /*call*/
        _args.mounted();

		return {
			loading: _showLoadingMask,
			hideLoading: _hideLoadingMask,
			clear: function(){
				_args.changer();
				_$wrap.html('');
				_correctHtmlStructure(_$wrap);
			},
			revoke: function(){
				_revokeEdit();
			},
			append: function(){


				var _object = arguments[0];
				
				if( !_object ){
					return;
				}

				var _$content = $(_object);

				if( typeof _object == 'string' && _$content.length == 0 ){
					_$content = $('<p>'+_object+'</p>');
				}

				_appendHistory();

				return _$wrap.append(_$content);
			},
			saveState: function(){
				return _appendHistory();
			},
			getEditNode: function(){
				return _$selected;
			},
			getContent: function(){
				var _$cloneNode = _$wrap.clone();
					_$cloneNode.find('.Eleditor-active').removeClass('Eleditor-active');
				return _$cloneNode.html();
			},
			getContentText: function(){
				var _$cloneNode = _$wrap.clone();

				return _formatInnerText(_$cloneNode.text());
			},
			destory: function(){
				_$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
				_$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
				_$editorWrap.find('*').off();
				_$editorWrap.remove();
				console.log('|--Eleditor '+_editorUid+' destoryed');
			}

		}
	}

    
