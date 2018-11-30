var contentEditor = new Eleditor({
	el: '#contentEditor',
	/*初始化完成钩子*/
});
$('.Eleditor-textStyle-item-upImg').on('click', function(e) {
	if (window.FastClick) {
		$('.Eleditor-input-file-image').triggerFastClick();
	} else {
		console.log('cc')
		$('.Eleditor-input-file-image').click();
	}
});
$('.Eleditor-textStyle-item-upVideo').on('click', function(e) {
	if (window.FastClick) {
		$('.Eleditor-input-file-video').triggerFastClick();
	} else {
		$('.Eleditor-input-file-video').click();
	}
});
$('.Eleditor-input-file-image').on('change', function(e) {
	$('.textarea').focus();
	var selection = getSelection();
	if (window.lastEditRange) {
		selection.removeAllRanges()
		selection.addRange(window.lastEditRange)
	}
	pasteHtmlAtCaret('<img src="https://pingtai-uat.oss-cn-shenzhen.aliyuncs.com/29d26e78-f7c7-45a6-9042-1e55f5869eac.jpg"/>')
	// pasteHtmlAtCaret('<video src="https://pingtai-uat.oss-cn-shenzhen.aliyuncs.com/29d26e78-f7c7-45a6-9042-1e55f5869eac.jpg"><video/>')
	window.lastEditRange = selection.getRangeAt(0)
});
$('.Eleditor-input-file-video').on('change', function(e) {
	$('.textarea').focus();
	var selection = getSelection();
	if (window.lastEditRange) {
		selection.removeAllRanges()
		selection.addRange(window.lastEditRange)
	}
	pasteHtmlAtCaret('<video controls="controls" poster="https://oss-uat.xuebangsoft.net/814c37d3-fb33-4cc3-b395-a9f2f88ecd42.mp4?spx&amp;x-oss-process=video/snapshot,t_100,f_jpg" src="https://oss-uat.xuebangsoft.net/814c37d3-fb33-4cc3-b395-a9f2f88ecd42.mp4"></video>')
	window.lastEditRange = selection.getRangeAt(0)
});
$('.submit').on('click', function() {
	var domf = $('.Eleditor-inputarea').clone(),domC = domf.find('.textarea');
	domC.removeAttr('placeholder').removeAttr('class').removeAttr('contenteditable');
	console.log(domf.html())
})