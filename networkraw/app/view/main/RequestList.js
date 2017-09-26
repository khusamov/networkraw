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
				chrome.devtools.network.onRequestFinished.addListener(function(harEntry) {
					// @param {http://www.softwareishard.com/blog/har-12-spec/} harEntry
					//Get content of the harEntry and append it to the response object
					harEntry.getContent(function (data, enc) {
						harEntry.response.content.data = data;
						harEntry.response.content.dataEncoding = enc;
						me.buildRequest(harEntry);
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


			this.getView().getStore().add({
				url: e.request.url,
				requestRawText: req
			});

		}
	}

    
});
