
Ext.define('NetworkRaw.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'Network RAW',

        loremIpsum: 'loremIpsum'
	},
	
	stores: {
		requestListStore: {
			fields: ['url', 'requestRawText'],
			proxy: {
				type: 'memory',
				reader: {
					type: 'json'
				}
			}
		}
	}

    
});
