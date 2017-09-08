'use strict';

$(function () {
	//Remember a sidebar size
	var localStorage;
	try {
		localStorage = window.localStorage;
	} catch (e) {
		localStorage = {};
	}

	function resizeLeftPanel(width) {
		$('#request-list').width(width);
		$('.split-view-resizer').css('left', width);
	}

	resizeLeftPanel(localStorage.sidePanelWidth || 200);

	function resizerDragMove(event) {
		resizeLeftPanel(event.pageX);
		event.preventDefault();
	}

	function resizerDragEnd(event) {
		resizeLeftPanel(event.pageX);
		localStorage.sidePanelWidth = event.pageX + 'px';

		$(document).off('mousemove', resizerDragMove);
		$(document).off('mouseup', resizerDragEnd);
	}

	$('.split-view-resizer').on('mousedown', function () {
		$(document).on('mousemove', resizerDragMove);
		$(document).on('mouseup', resizerDragEnd);
	});

	//Note: Currently there is no API/event to do this transparantly when use hit "clear" at network tab
	$('#btnClear').on('click', function () {
		$('#request-list').html('');
		$('#reqsrc').text('');
	});
});

//Function built RAW request source from request object.
function buildRequest(e) {
	var req = e.request.method + ' ' + e.request.url + ' ' + ((e.request.httpVersion === 'unknown') ? 'HTTP/1.1' : e.request.httpVersion) + '\n';
	var sHeaders = '';
	if (e.request.headers.length > 0) {
		$.each(e.request.headers, function (i, header) {
			sHeaders += header.name + ': ' + header.value + '\n';
		});
	}
	//var sCookies = '';
	//if (e.request.cookies.length > 0) {
	//	sCookies = 'Cookie: ';
	//	$.each(e.request.cookies, function (i, cookie) {
	//		sCookies += cookie.name + '=' + cookie.value + '; ';
	//	});
	//}

	req += sHeaders;
	//req += sCookies;

	if (e.request.bodySize > 0) {
		req += '\n';
		req += e.request.postData.text;
	}

	var el = $('<div class="request"></div>')
		.text(e.request.url)
		.attr('title', e.request.url)
		.data('send', btoa(req))
		.on('click', function () {
			$('.selected').removeClass('selected');
			$(this).addClass('selected');
			$('#reqsrc').text(atob($(this).data('send')));
		});
	$('#request-list').append(el);
}

//Connect to the DevTools "network" tab and listen
chrome.devtools.network.onRequestFinished.addListener(function (entry) {
	//Get content of the entry and append it to the response object
	entry.getContent(function (data, enc) {
		entry.response.content.data = data;
		entry.response.content.dataEncoding = enc;
		buildRequest(entry);
	});
});