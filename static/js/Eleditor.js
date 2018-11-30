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
			_$wrap.append(_empty);
		}

		if( _$wrap.find('*').length === 0 ){
			_$wrap.html('<p class="Eleditor-placeholder">'+_$wrap.html()+'</p>');
		}
	};

	var _buildEditorModule = function(_toolbars, _uid){

		var _html = '<div class="Eleditor-wrap" style="z-index:'+_getLayerMaxZIndex()+'" id="'+_uid+'">\
							<input type="file" accept="video/*" class="Eleditor-input-file-video needsclick">\
            				<input type="file" accept="image/*" class="Eleditor-input-file-image needsclick">\
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
                                            <div class="Eleditor-textStyle-upImg"></div>\
                                        </div>\
                                        <div class="Eleditor-textStyle-item Eleditor-textStyle-item-upVoice">\
                                            <div class="Eleditor-textStyle-upImg"></div>\
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
                                <div class="Eleditor-delete-layer">\
                                    <div class="Eleditor-delete-tip">进入批量删除模式，点击段落进行删除</div>\
                                    <div class="Eleditor-delete-revoke"></div>\
                                    <div class="Eleditor-delete-clear"></div>\
                                    <div class="Eleditor-delete-back">返回继续编辑</div>\
                                </div>\
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
			_placeHolder = _args.placeHolder || '<p class="Eleditor-placeholder">点击此处编辑内容</p>',
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

		_correctHtmlStructure(_$wrap, _placeHolder);

		/*insert editor*/
		var _lastScrollH = null;
		var _$window = $(window);
		var _$scrollWrap = $('html,body');
		var _$editorWrap = $(_buildEditorModule(_args.toolbars, _editorUid));
		var _$editorController = _$editorWrap.find('.Eleditor-controller');
		var _$editorLoadingMask = _$editorWrap.find('.Eleditor-loading');
		var _$editorTextModule = _$editorWrap.find('.Eleditor-textEditor');
		var _$editorTextArea = _$editorTextModule.find(".Eleditor-inputarea .textarea");
		var _$editorUploadImageBtn = _$editorController.find(".Eleditor-insertImage");
		var _$editorBarUploadImageBtn = _$editorTextModule.find('.Eleditor-textStyle-item-upImg');
		var _$editorTextLinkArea = _$editorTextModule.find(".Eleditor-inputarea input");
		var _$editorColorModule = _$editorTextModule.find(".Eleditor-textEditor-colors");
		var _$editorFontsizeModule = _$editorTextModule.find(".Eleditor-textEditor-fontsizes");
		var _$editorUndoBtn = _$editorWrap.find(".Eleditor-undo");
		var _$editorLineheightModule = _$editorTextModule.find(".Eleditor-textEditor-lineheight");
		var _$editorLinedecorationsModule = _$editorTextModule.find(".Eleditor-textEditor-linedecorations");
		var _$editorDeleteLayer = _$editorWrap.find(".Eleditor-delete-layer");

		_$wrap.addClass('Eleditor-area');
		_$wrap.after(_$editorWrap);

		console.log('|--Eleditor Mounted To', _$wrap);

		/*bindEvent*/
		var _$selected = null,
			_imageUploader = null;

		var _showEditorControllerLayer = function(_$e){
			_$selected = _$e;
			_$e.addClass('Eleditor-active');

			var _calTop = _$e.offset().top + _$e.outerHeight();

			$.each(_$editorController.find('li'), function(i, e){
				var _$e = $(e),
					_tgs = _$e.attr('bind-tags');
				if( _tgs ){
					_tgs = _tgs.toLocaleLowerCase().split(',');
					if( _inArray(_$selected[0].tagName.toLocaleLowerCase(), _tgs) ){
						_$e.show();
					}else{
						_$e.hide();
					}
				}
			});

			_$editorController.show();
			_flushEditorControllerLayerPosi();

			if( typeof _$scrollWrap.animate === 'function' ){
				_$scrollWrap.stop().animate({scrollTop: (_calTop - 150) + 'px'}, 500);
			}else{
				_$scrollWrap.scrollTop((_calTop - 150) + 'px');
			}
			
			_imageUploader && _imageUploader.refresh();
		};

		var _flushEditorControllerLayerPosi = function(){
				if( _$selected ){
					_$editorController.css({ 
						top: _$selected.offset().top + _$selected.outerHeight(),
						width: _$wrap.width() - 5
					});				
				}
			},
			_hideEditorControllerLayer = function(){

				_$wrap.find('.Eleditor-active').removeClass('Eleditor-active');
				_$editorController.hide();
				_$selected = null;
			};

		var _showEditorDeleteLayer = function(){

				_flushEditorDeleteLayerHistoryBtn();

				_$wrap.addClass('Eleditor-deleteMode');
				_$editorDeleteLayer.show();
			},
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
				_$editorController.hide();
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
				_hideEditorControllerLayer();
			},
			_flushHistoryBtn = function(){

				if( _historys.length == 0 ){
					_$editorUndoBtn.hide();
				}else{
					_$editorUndoBtn.show();
				}

			};

		var _syncRenderTextEditorView = function(){
			_$editorTextModule.attr('role', 'edit').show();
			_$editorTextArea.html( _$selected.hasClass('Eleditor-placeholder') ? '' : _$selected.html() );
			_$editorTextArea.attr('style', _$selected.attr('style'));
			if( _$selected.css('font-weight') == 'bold' ){
				_$editorTextModule.find('.Eleditor-textStyle-bold').addClass('Eleditor-active');
			}

			if( _inArray(_$selected.css('text-decoration'), ['overline', 'line-through', 'underline']) ){
				_$editorTextModule.find('.Eleditor-textStyle-linedecoration').addClass('Eleditor-active');
			}			
			if( _$selected[0].tagName == 'A' ){
				_$editorTextModule.attr('type', 'link');
				_$editorTextLinkArea.val(_$selected.attr('href'));
			}else{
				_$editorTextModule.attr('type', 'word');
			}

			var _selectAlign = _$selected.css('text-align');
			if( _inArray(_selectAlign, ['left', 'center', 'right']) ){
				_$editorTextModule.find('.Eleditor-textStyle-align[align='+_selectAlign+']').addClass('Eleditor-active');
			}else{
				_$editorTextModule.find('.Eleditor-textStyle-align').removeClass('Eleditor-active');
			}
			_$editorTextModule.find('.Eleditor-textStyle-color span').css('background-color', _$selected.css('color'));
		};



		var _editorModuleEvents = {
			insertText: function(){
				_showEditorWrapMask();
				_$editorTextModule.attr({'role': 'insert', 'type': 'word'}).show();
			},
			insertLink: function(){
				_showEditorWrapMask();
				_$editorTextModule.attr({'role': 'insert', 'type': 'link'}).show();
			},
			insertImage: function(e){
				if (window.FastClick) {
                    $('.Eleditor-input-file-image').triggerFastClick();
				} else {
                    $('.Eleditor-input-file-image').click();
                }
            },
            insertVideo: function(e){
				if (window.android && window.android.nativeSelectVideo) {
                    window.android.nativeSelectVideo('mainVideoUpload');
				} else {
                    if (window.FastClick) {
                        $('.Eleditor-input-file-video').triggerFastClick();
                    } else {
                        $('.Eleditor-input-file-video').click();
                    }
				}
			},
			insertHr: function(){

				_appendHistory();

				var _$hr = $('<div class="horizontal-line" style="padding: 10px 0;border-bottom: 1px solid #aaa;margin-bottom: 20px;"></div>');
					_$selected.after(_$hr);
					_args.changer();
				_hideEditorControllerLayer();
			},
			editText: function(){
				if( _inArray(_$selected[0].tagName, _notctname) ){
					return this.insertText();
				}
				_showEditorWrapMask();
				_syncRenderTextEditorView();
			},
			"delete": function(){

				if( _$wrap.find('*').length == 1 ){
					_appendHistory();
					_args.changer();
					_$selected.remove();
				}else{
					_showEditorDeleteLayer();
				}
				_hideEditorControllerLayer();
				_correctHtmlStructure(_$wrap, _placeHolder);
			},
			undo: function(){
				_revokeEdit();
			},
			cancel: function(){
				_hideEditorControllerLayer();
			}
		};
        var insertImg = function(url) {
            var _hasStyleBarBtn = $('.Eleditor-wrap.Eleditor-mask').length > 0;
            if (_hasStyleBarBtn) {
                $(".Eleditor-inputarea .textarea").append('<img src="' + url + '">');
            } else {
                _appendHistory();
                _$selected.after($('<img src="' + url + '">'));
                if (_$selected.hasClass('Eleditor-placeholder')) {
                    _$selected.remove();
                }
                _args.changer();
                if (!_hasStyleBarBtn) {
                    _hideEditorControllerLayer();
                }
            }
        }
        var insertVideoIntoContent = function(url){
            _appendHistory();
            _$selected.after($('<video controls="controls" poster="' +  url + '?spx&x-oss-process=video/snapshot,t_100,f_jpg"    src="' + url + '">'));
            if (_$selected.hasClass('Eleditor-placeholder')) {
                _$selected.remove();
            }
            _args.changer();
			_hideEditorControllerLayer();
		}
		window.insertImg = insertImg;
        window.insertVideoIntoContent = insertVideoIntoContent;
        $('.Eleditor-input-file-video').on('change', function(e){
            uploadFilesToAliyun(e.target.files, function(data) {
                if (!!!data.success) {
                    alert('上传失败');
                } else {
                    data.data.map(function(i){
                        insertVideoIntoContent(i.url)
                    })
                }
                $('.Eleditor-input-file-video').val('');
            })
		})
		for (var i = 0; i < _args.toolbars.length; i++) {
			if( typeof _args.toolbars[i] === 'object' ){
				_editorModuleEvents[_args.toolbars[i].id] = _args.toolbars[i].handle;
			}
		};

		/*text area click*/
		_$window.on('resize', function(){
			_flushEditorControllerLayerPosi();
		});

		_$editorController.on('click', 'ul li', function(e) {
			var _$this = $(this),
				_event = _$this.attr('event');
			if( typeof _editorModuleEvents[_event] === 'function' ){
				if( typeof _toolnames[_event] != 'undefined' ){
					_editorModuleEvents[_event](e);
				}else{
					_editorModuleEvents[_event](_$selected, _$this) !== false && _editorModuleEvents.cancel();
				}
			}
		});

		_$editorWrap.on('click', '.Eleditor-delete-revoke', function() {
			_revokeEdit();
		});
		_$editorDeleteLayer.on('click', '.Eleditor-delete-clear', function() {

			if( !confirm('确定清空内容吗？') ){
				return;
			}

			var _$cloneNode = _$wrap.clone();
				_$cloneNode.find('.Eleditor-placeholder').remove();

			if( _formatInnerText(_$cloneNode.text()) != '' ){
				_appendHistory();
				_$wrap.html('');
				_args.changer();
				_correctHtmlStructure(_$wrap, _placeHolder);
			}
		});
		_$editorDeleteLayer.on('click', '.Eleditor-delete-back', function() {
			_hideEditorDeleteLayer();
		});		

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

		_$editorTextModule.on('click', ".Eleditor-cancel,.Eleditor-commit", function() {

			arguments[0].preventDefault();

			if( $(this).hasClass('Eleditor-commit') ){
				var _style = _$editorTextArea.attr('style') || '';
				var _content = _$editorTextArea.html();
				var _editAct = _$editorTextModule.attr('role') == 'edit';
				var _hasPlaceHolder = _$selected.hasClass('Eleditor-placeholder');

				if( !_content ){
					return alert('请输入内容文字');
				}

				_appendHistory();

				if( _editAct || (_hasPlaceHolder && _$editorTextModule.attr('type') != 'link') ){
					if( _$editorTextModule.attr('type') == 'link' ){
						_$selected.attr('href', _$editorTextLinkArea.val());
					}
					_$selected.attr('style', _style).removeClass('Eleditor-placeholder').html( _content );
				}else{

					var _buildWordHtml = '';
					if( _$editorTextModule.attr('type') == 'link' ){
						var _link = _$editorTextLinkArea.val();
						_buildWordHtml = '<a style="'+_style+'" href="'+_link+'">'+_content+'</a>';
					}else{
						_buildWordHtml = '<p style="'+_style+'">'+_content+"</p>";
					}
					_$selected.after( $(_buildWordHtml) );

					if( _hasPlaceHolder ){
						_$selected.remove();
					}
				}
				_args.changer();
				_flushEditorControllerLayerPosi();
			}

			_$editorTextModule.find('.Eleditor-active').removeClass('Eleditor-active');
			_$editorTextModule.find('.Eleditor-textStyle-color span').removeAttr('style');
			_$editorTextArea.removeAttr('style').html('');
			_$editorTextLinkArea.val('');
			_hideEditorWrapMask();
			_$editorTextModule.hide();
			_hideEditorControllerLayer();

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
			console.log(window.lastEditRange)
		})
		_$editorTextArea.on('click', function() {
			var selection = getSelection()
			window.lastEditRange = selection.getRangeAt(0);
			console.log(window.lastEditRange)
		})
		//  // 编辑框点击事件
		//  document.querySelector('.textarea').onclick = function() {
        //     // 获取选定对象
        //     var selection = getSelection()
        //     // 设置最后光标对象
        //     lastEditRange = selection.getRangeAt(0)
        //     console.log(lastEditRange)
        // }

        // // 编辑框按键弹起事件
        // document.querySelector('.textarea').onkeyup = function() {
        //     // 获取选定对象
        //     var selection = getSelection()
        //     // 设置最后光标对象
        //     lastEditRange = selection.getRangeAt(0)
        //     console.log(lastEditRange)
        // }

		/*controller*/
        _$wrap.on('click', '*', function(_e) {

			var _$this = $(this);

			if( _$wrap.hasClass('Eleditor-deleteMode') ){

				if( !_$this.hasClass('Eleditor-placeholder') ){

					_appendHistory();

					if( typeof _$this.fadeOut === 'function' ){
						_$this.fadeOut('fast', function(){
							_$this.remove();
							_correctHtmlStructure(_$wrap, _placeHolder);
						});
					}else{
						_$this.remove();
						_correctHtmlStructure(_$wrap, _placeHolder);
					}
					_args.changer();
				}

			}else if( !_$this.hasClass('Eleditor-active') ){
            	_hideEditorControllerLayer();
            	_hideEditorDeleteLayer();
            	_showEditorControllerLayer(_$this);
			}

            return _e.preventDefault() == 0;
        });

        /*call*/
        _args.mounted();

		return {
			clear: function(){
				_args.changer();
				_$wrap.html('');
				_correctHtmlStructure(_$wrap, _placeHolder);
			},
			revoke: function(){
				_revokeEdit();
			},
			append: function(){

				_hideEditorControllerLayer();

				var _object = arguments[0];
				
				if( !_object ){
					return;
				}

				var _$content = $(_object);

				if( typeof _object == 'string' && _$content.length == 0 ){
					_$content = $('<p>'+_object+'</p>');
				}

				_$wrap.find('.Eleditor-placeholder').remove();
				_appendHistory();

				return _$wrap.append(_$content);
			},
			trigger: function(){

				var _event = arguments[0];

				if( _event == 'insertText' ){
					_$selected = _$wrap.find('>:last');
					_editorModuleEvents.insertText();
				}else if( _event == 'insertLink' ){
					_$selected = _$wrap.find('>:last');
					_editorModuleEvents.insertLink();
				}
			},
			saveState: function(){
				return _appendHistory();
			},
			getEditNode: function(){
				return _$selected;
			},
			getContent: function(){
				var _$cloneNode = _$wrap.clone();
					_$cloneNode.find('.Eleditor-placeholder').remove();
					_$cloneNode.find('.Eleditor-active').removeClass('Eleditor-active');
				return _$cloneNode.html();
			},
			getContentText: function(){
				var _$cloneNode = _$wrap.clone();
					_$cloneNode.find('.Eleditor-placeholder').remove();

				return _formatInnerText(_$cloneNode.text());
			},
			hideEditorControllerLayer: _hideEditorControllerLayer,
			destory: function(){
				_$wrap.removeAttr('Eleditor-Inited Eleditor-Uid');
				_$wrap.removeClass('Eleditor-area');
				_$wrap.find('.Eleditor-placeholder').remove()
				_$wrap.off().find('.Eleditor-active').removeClass('Eleditor-active');
				_$editorWrap.find('*').off();
				_$editorWrap.remove();
				console.log('|--Eleditor '+_editorUid+' destoryed');
			}

		}
	}
    // 上传到阿里云
    var oriUrl = window.location.href.substring(0, window.location.href.indexOf("/eduboss/")) + '/eduboss/';
    var uploadFilesToAliyun = function (files, callback, options) {
        options = options || {};
        if (!files || (files && files.length <= 0)) {
            return;
        }
        var filesLength = files.length;
        // console.log(oriUrl +  'web/ossWebController/getWebFileStsAuth.do', 'oriUrl +  \'/web/ossWebController/getWebFileStsAuth.do\'')
        $.get(oriUrl +  'weChat/ossWebController/getWebFileStsAuth.do', { clientType: 'PC', fileCount: filesLength }, function (res) {

            if (res.resultCode == '0') {
                var ossObj = res.data;

                var client = new OSS.Wrapper({
                    endpoint: ossObj.endPoint,
                    accessKeyId: ossObj.accessKeyId,
                    accessKeySecret: ossObj.accessKeySecret,
                    stsToken: ossObj.securityToken,
                    bucket: ossObj.bucketName,
                });

                var cbCount = 0;
                var cbResults = [];
                // 一张一张传，多张传有问题
                function updateFileOne(index) {
                    var item = files[index];
                    var fileType = item.name.substring(item.name.lastIndexOf("."));
                    var ossFileName = ossObj.objectKeys[index] + fileType;
                    if (!options.noLoading) loadTransparentMask(true);
                    client.multipartUpload(ossFileName, item).then(function (result) {
                        cbCount ++;
                        if (!options.noLoading) removeLoadMask(true);
                        cbResults.push({
                            fileIndex: index,
                            url: getAliPath() + result.name,
                            aliyunName: result.name,
                            // #11876 file.name 为只读，因此只能在这里修改文件名称了
                            name: options.staticName != null ? options.staticName : item.name
                        });
                        if (cbCount == filesLength) {
                            callback({
                                success: true,
                                data: cbResults
                            });
                        } else {
                            updateFileOne(cbCount);
                        }
                    }).catch(function (err) {
                        if (!options.noLoading) removeLoadMask(true);
                        callback({
                            success: false,
                            data: err
                        });
                    });
                }
                updateFileOne(0);
            } else {
                callback({
                    success: false,
                });
			}
        }).fail(function (err) {
            callback({
                success: false,
                data: err
            });
        });
    };
    var removeLoadMask =  function (flag) {
        if (flag) {
            $('.eduboos-loadmask:eq(0)').remove();
        }
    }
    var loadTransparentMask = function (flag, txt, options) {
        options = options || {};
        if (flag) {
            var option = {
                opacity: 0.5,
                fontColor: "#fff",
                content: '<li><i class="fa fa-gear fa-lg fa-spin"></i>' + (txt ? txt : ' 努力干活中，请稍候...') + '</li>'
            };
            var div = $('<div class="eduboos-loadmask"><div>' + (option.content ? option.content : '') + '</div></div>');
            if (options.container) {
                div.addClass('block-mask');
            }
            div.appendTo(options.container?options.container:'body');
        }
    };
    if (window.FastClick) { // ios双击兼容
        var notNeed = FastClick.notNeeded(document.body);
        $.fn.triggerFastClick=function(){
            this.trigger("click");
            if(!notNeed){
                this.trigger("click");
            }
        }
	}
	if (window.android && window.android.nativeSelectVideo) { // app端 android会拦截input事件
		// 图片回调 是base64，转file后h5上传即可
		window.nativeImgPickerForAndroid = function(resData) {
            var stringify = JSON.stringify(resData),
				paramsObj = eval('(' + stringify + ')') || {},
                picData = paramsObj.picData,
                imgFilePath = paramsObj.imgFilePath;
				// console.log('nativeImgPickerForAndroid', imgFilePath);
			loadTransparentMask(1);
			var params = JSON.stringify({
				itemId: 'mainPicUpload',
				filesPath: imgFilePath,
			});
			window.android.nativeUploadFiles(params);
		}

		// 选video需要主动触发，且注册回调事件拿到本地文件地址，再主动触发app的阿里云上传，再注册app的上传成功回调
        window.nativeGetVideoCallback = function(videoData) {
            var stringify = JSON.stringify(videoData),
				paramsObj = eval('(' + stringify + ')') || {},
				videoPath = paramsObj.videoPath;
            	loadTransparentMask(1);
            	var params = JSON.stringify({
                    itemId: 'mainVideoUpload',
                    filesPath: videoPath,
                });
            	window.android.nativeUploadFiles(params);
		}

		window.nativeFilesAliPathCallback = function(resData) {
            var stringify = JSON.stringify(resData),
				paramsObj = eval('(' + stringify + ')') || {},
				itemId = paramsObj.itemId,
				isSucees = paramsObj.isSucees,
				aliPath = getAliPath() + paramsObj.aliPath;
            // console.log(paramsObj, 'paramsObj');
            removeLoadMask(1);
            if (isSucees) {
            	if (itemId === 'mainVideoUpload') {
                    insertVideoIntoContent(aliPath);
				} else {
                    insertImg(aliPath)
                }
			} else {
            	alert('上传失败')
			}
		}

	}

	function getAliPath() { // app和微信都是从详情拿到阿里云前缀,本想从url带过来，但需要转义有点麻烦，就暴力解决了
        // var lastQuery = location.href.split('aliPath=')[1];
        // console.log(lastQuery, 'lastQuery');
        // if (lastQuery.indexOf('&') > -1 ) {
        // 	return lastQuery.split('&')[0]
		// } else {
        // 	return lastQuery;
		// }
		// console.log(sessionStorage.aliPath)
		return sessionStorage.aliPath
	}
    
