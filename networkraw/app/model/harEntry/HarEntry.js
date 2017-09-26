
/**
 * http://www.softwareishard.com/blog/har-12-spec/
 * One of the goals of the HTTP Archive format is to be flexible enough so, 
 * it can be adopted across projects and various tools. This should allow effective 
 * processing and analyzing data coming from various sources. Notice that resulting HAR file 
 * can contain privacy & security sensitive data and user-agents should find some way 
 * to notify the user of this fact before they transfer the file to anyone else.
 */
Ext.define('NetworkRaw.model.harEntry.HarEntry', {

	extend: 'Ext.data.Model',
	requires: [
		'NetworkRaw.model.harEntry.Request',
		'NetworkRaw.model.harEntry.Response'
	],

	fields: [{
		name: 'id',
		type: 'auto'
	}],

	hasOne: [{
		role: 'request',
		association: 'request',
		type: 'NetworkRaw.model.harEntry.Request'
	}, {
		role: 'response',
		association: 'request',
		type: 'NetworkRaw.model.harEntry.Response'
	}]

});