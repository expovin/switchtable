var  VarRendering = {
	type: "items",
	label: "Rendering",
	items : {
		AlignDropDown: {
			type: "string",
			component: "dropdown",
			label: "Colonna",
			options: [{
							value: "v",
							label: "VERO"
						}, {
							value: "f",
							label: "FALSO"
						}],
			defaultValue: "v",
			ref: "settings.titles.align"
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