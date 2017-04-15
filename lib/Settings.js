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
						defaultValue: false
					},

					ColorArray: {
						type: "string",
						label: "Color Array",
						ref: "colorArray",
						defaultValue: "-1,LightGray; 1440,red; 20,yellow;10,green",
						show : function(data) {
							return data.visualizzazione;
						}
					},

					Selectable: {
						type: "boolean",
						component: "switch",
						label: "Selezionabile",
						ref: "selezionabile",
		                options: [{
		                    value: true,
		                    label: "true"
						}, {
		                    value: false,
		                    label: "false"
						}],
						defaultValue: false
					},

					Campo: {
						type: "string",
						label: "Campo",
						ref: "Campo",
						show : function(data) {
							return data.selezionabile;
						}
					},

					SheetId: {
						type: "string",
						label: "Sheet Id",
						ref: "SheetId",
						show : function(data) {
							return data.selezionabile;
						}
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

var  VarPivot = {
	type: "items",
	label: "Pivot",
	items : {
	Selectable: {
		type: "boolean",
		component: "switch",
		label: "Selezionabile",
		ref: "settings.selezionabile",
	    options: [{
	        value: true,
	        label: "true"
		}, {
	        value: false,
	        label: "false"
		}],
		defaultValue: false
		},

		Campo: {
			type: "string",
			label: "Campo",
			ref: "settings.Campo",
			show : function(data) {
				return data.settings.selezionabile;
			}
		},
		SheetId: {
			type: "string",
			label: "Sheet Id",
			ref: "settings.SheetId",
			show : function(data) {
				return data.settings.selezionabile;
			}
		},

		MyList :{
			type: "array",
			ref: "settings.listFieldPivot",
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
							defaultValue : 200
						}
					}
				},

				Rendering : VarRendering,
				Pivot : VarPivot
			}
};

var VarSupport = {
			snapshot: true,
			export: true,
			exportData : true
}