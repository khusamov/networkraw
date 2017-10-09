
/**
 * This object contains detailed info about performed request.
 * http://www.softwareishard.com/blog/har-12-spec/#request
 */
Ext.define('NetworkRaw.model.harEntry.Request', {

	extend: 'Ext.data.Model',
	requires: ['Ext.Array'],

	fields: [{
		/**
		 * method [string] - Request method (GET, POST, ...).
		 */
		name: 'method',
		type: 'auto'
	}, {
		/**
		 * url [string] - Absolute URL of the request (fragments are not included).
		 */
		name: 'url',
		type: 'auto'
	}, {
		/**
		 * httpVersion [string] - Request HTTP Version.
		 */
		name: 'httpVersion',
		type: 'auto'
	}, {
		/**
		 * cookies [array] - List of cookie objects.
		 */
		name: 'cookies',
		type: 'auto'
	}, {
		/**
		 * headers [array] - List of header objects.
		 */
		name: 'headers',
		type: 'auto'
	}, {
		/**
		 * queryString [array] - List of query parameter objects.
		 */
		name: 'queryString',
		type: 'auto'
	}, {
		/**
		 * postData [object, optional] - Posted data info.
		 */
		name: 'postData',
		type: 'auto'
	}, {
		/**
		 * headersSize [number] - Total number of bytes from the start 
		 * of the HTTP request message until (and including) the double CRLF before the body. 
		 * Set to -1 if the info is not available.
		 */
		name: 'headersSize',
		type: 'auto'
	}, {
		/**
		 * bodySize [number] - Size of the request body (POST data payload) in bytes. 
		 * Set to -1 if the info is not available.
		 */
		name: 'bodySize',
		type: 'auto'
	}, {
		/**
		 * The total request size sent can be computed as follows (if both values are available):
		 * var totalSize = entry.request.headersSize + entry.request.bodySize;
		 */
		name: 'totalSize',
		calculate: function(data) {
			return data.headersSize + data.bodySize;
		}
	}, {
		/**
		 * comment [string, optional] (new in 1.2) - A comment provided by the user or the application.
		 */
		name: 'comment',
		type: 'auto'
	}, {
		/**
		 * RAW
		 */
		name: 'raw',
		calculate: function(data) {
			var raw = data.method + ' ' + data.url + ' ' + 
				((data.httpVersion === 'unknown') ? 'HTTP/1.1' : data.httpVersion) + '\n';
			var sHeaders = '';
			if (data.headers.length > 0) {
				Ext.Array.each(data.headers, function (header) {
					sHeaders += header.name + ': ' + header.value + '\n';
				});
			}
			raw += sHeaders;
			if (data.bodySize > 0) {
				raw += '\n';
				raw += data.postData.text;
			}
			return raw;
		}
	}]

});