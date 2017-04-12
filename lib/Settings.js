var  VarRendering = {
	type: "items",
	label: "Rendering",
	items : {
		MyList :{
			type: "array",
			ref: "settings.listItems",
			itemTitleRef: "label",
			allowAdd: true,
			allowRemove: true,
			addTranslation: "Add Item",
	            items: {
					label: {
						type: "string",
						ref: "label",
						label: "Label",
						expression: "optional"
					},
					TypeVisual: {
						type: "boolean",
						component: "switch",
						label: "Tipo Visualizzazione",
						ref: "visualizzazione",
		                options: [{
		                    value: true,
		                    label: "semaforo"
						}, {
		                    value: false,
		                    label: "blocco"
						}],
						defaultValue: true
					},
					Numerazione: {
						type: "boolean",
						component: "switch",
						label: "Numerazione",
						ref: "numerazione",
		                options: [{
		                    value: true,
		                    label: "vero"
						}, {
		                    value: false,
		                    label: "falso"
						}],
						defaultValue: true
					},
					Prefisso: {
						type: "string",
						ref: "prefisso",
						label: "Prefisso",
						expression: "optional"
					}
	        	}
			}
		}
}



var VarDefinition = {
			type : "items",
			component : "accordion",
			items : {
				dimensions : {
					uses : "dimensions",
					min : 1
				},
				measures : {
					uses : "measures",
					min : 0
				},
				sorting : {
					uses : "sorting"
				},
				settings : {
					uses : "settings",
					items : {
						initFetchRows : {
							ref : "qHyperCubeDef.qInitialDataFetch.0.qHeight",
							label : "Initial fetch rows",
							type : "number",
							defaultValue : 50
						}
					}
				},

				Rendering : VarRendering
			}
};

var VarSupport = {
			snapshot: true,
			export: true,
			exportData : true
}