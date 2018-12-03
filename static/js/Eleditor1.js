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
			// console.log(el, 'el')
			var frag = document.createDocumentFragment(), node, lastNode;
			while ( (node = el.firstChild) ) {
				// console.log(node ,'node')
				lastNode = frag.appendChild(node);
				// console.log(lastNode, 'lastNode');
			}
			var firstNode = frag.firstChild;
			// console.log(firstNode, 'firstNode');
			
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

var
	$content = $('.editor-content'),
	$video = $('.editor-header .video'),
	$img = $('.editor-header .img'),
	$submit = $('.submit');

	$content.on('keyup', function() {
		var selection = getSelection()
		window.lastEditRange = selection.getRangeAt(0);
	})
	$content.on('click', function() {
		var selection = getSelection()
		window.lastEditRange = selection.getRangeAt(0);
	});
	$content.focus();

	
$video.on('click', function(e) {
	$content.focus();
	var selection = getSelection();
	if (window.lastEditRange) {
		selection.removeAllRanges()
		selection.addRange(window.lastEditRange)
	}
	pasteHtmlAtCaret('\
	<p>\
    <br>\
    </p>\
	<div class="video-wrap" contenteditable="false" _src="https://oss-uat.xuebangsoft.net/814c37d3-fb33-4cc3-b395-a9f2f88ecd42.mp4" bg="https://oss-uat.xuebangsoft.net/814c37d3-fb33-4cc3-b395-a9f2f88ecd42.mp4?spx&amp;x-oss-process=video/snapshot,t_100,f_jpg">\
		<img class="play" src="/static/css/play.svg" />\
    </div>\
    <p>\
    <br>\
    </p>\
    ');
    window.lastEditRange = selection.getRangeAt(0);
});
$img.on('click', function(e) {
	$content.focus();
	var selection = getSelection();
	if (window.lastEditRange) {
		selection.removeAllRanges()
		selection.addRange(window.lastEditRange)
	}
    pasteHtmlAtCaret('\
    <div class="img-wrap">\
    <img src="https://pingtai-uat.oss-cn-shenzhen.aliyuncs.com/29d26e78-f7c7-45a6-9042-1e55f5869eac.jpg"/>\
    </div>\
    <p>\
    <br>\
    </p>\
    ');
    window.lastEditRange = selection.getRangeAt(0);
});

$content.on('click', '.video-wrap', function(e){
	// console.log($(this).attr('_src'));
})
$submit.on('click', function(e){
	var html = $content.html();
	// console.log(html)
})