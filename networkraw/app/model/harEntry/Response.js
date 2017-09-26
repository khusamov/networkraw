
/**
 * This object contains detailed info about the response.
 * http://www.softwareishard.com/blog/har-12-spec/#response
 */
Ext.define('NetworkRaw.model.harEntry.Response', {

	extend: 'Ext.data.Model',

	fields: [{
		/**
		 * status [number] - Response status.
		 */
		name: 'status',
		type: 'auto'
	}, {
		/**
		 * statusText [string] - Response status description.
		 */
		name: 'statusText',
		type: 'auto'
	}, {
		/**
		 * httpVersion [string] - Response HTTP Version.
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
		 * content [object] - Details about the response body.
		 */
		name: 'content',
		type: 'auto'
	}, {
		/**
		 * redirectURL [string] - Redirection target URL from the Location response header.
		 */
		name: 'redirectURL',
		type: 'auto'
	}, {
		/**
		 * headersSize [number]* - Total number of bytes from the start of the HTTP response 
		 * message until (and including) the double CRLF before the body. 
		 * Set to -1 if the info is not available.
		 * *headersSize - The size of received response-headers is computed only from headers 
		 * that are really received from the server. Additional headers appended by the browser 
		 * are not included in this number, but they appear in the list of header objects.
		 */
		name: 'headersSize',
		type: 'auto'
	}, {
		/**
		 * bodySize [number] - Size of the received response body in bytes. Set to zero in case of responses coming from the cache (304). Set to -1 if the info is not available.
		 */
		name: 'bodySize',
		type: 'auto'
	}, {
		/**
		 * The total response size received can be computed as follows (if both values are available): 
		 * var totalSize = entry.response.headersSize + entry.response.bodySize;
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
	}]

});