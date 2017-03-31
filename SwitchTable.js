define( [
	"qlik",
	"jquery", 
	"text!./style.css", 
	"text!./template.html",
	"./lib/Settings",
	"./lib/Controller"
	], 
	function (qlik, $, cssContent, template ) {

		'use strict';
    $("<style>").html(cssContent).appendTo("head");

	var me = {};

    me= {
       template: template,
       initialProperties : {
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 10,
					qHeight : 50
				}]
			}
		},
		definition : VarDefinition
	};
	me.support = VarSupport;

	me.paint= function ( ) {
			//setup scope.table
			if ( !this.$scope.table ) {
				this.$scope.table = qlik.table( this );
			}
			return qlik.Promise.resolve();
		};
	me.controller= Controller;

	return(me);

} );
