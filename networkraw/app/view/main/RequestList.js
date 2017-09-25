/**
 * Список выполненных запросов.
 */
Ext.define('NetworkRaw.view.main.RequestList', {
    extend: 'Ext.grid.Panel',
    xtype: 'requestlist',

    requires: [
        
    ],

    title: 'Запросы',

   

    columns: [
        { text: 'Адрес',  dataIndex: 'url', flex: 1 }
	],
	
	controller: {
		init: function() {
			var me = this;
			if (chrome.devtools) {
				//Connect to the DevTools "network" tab and listen
				chrome.devtools.network.onRequestFinished.addListener(function (entry) {
					//Get content of the entry and append it to the response object
					entry.getContent(function (data, enc) {
						entry.response.content.data = data;
						entry.response.content.dataEncoding = enc;
						me.buildRequest(entry);
					});
				});
			}
		},
		//Function built RAW request source from request object.
		buildRequest: function(e) {
			var req = e.request.method + ' ' + e.request.url + ' ' + 
				((e.request.httpVersion === 'unknown') ? 'HTTP/1.1' : e.request.httpVersion) + '\n';
			
			var sHeaders = '';
			if (e.request.headers.length > 0) {
				Ext.Array.each(e.request.headers, function (header) {
					sHeaders += header.name + ': ' + header.value + '\n';
				});
			}

			req += sHeaders;

			if (e.request.bodySize > 0) {
				req += '\n';
				req += e.request.postData.text;
			}

			// var el = $('<div class="request"></div>')
			// 	.text(e.request.url)
			// 	.attr('title', e.request.url)
			// 	.data('send', btoa(req))
			// 	.on('click', function () {
			// 		$('.selected').removeClass('selected');
			// 		$(this).addClass('selected');
			// 		$('#reqsrc').text(atob($(this).data('send')));
			// 	});
			// $('#request-list').append(el);

			this.getView().getStore().add({
				url: e.request.url,
				requestRawText: req
			});

		}
	}

    
});
