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
	$( '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">' ).appendTo( 'head' ); // Font Awesome CDN		
	$( '<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">' ).appendTo( 'head' ); // Font Awesome CDN		
	$( '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>' ).appendTo( 'body' ); // Bootstrap.js CDN


	var me = {};

    me= {
       template: template,
       initialProperties : {
       		listItems: [],
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

	me.paint= function ($element,layout) {
			//setup scope.table

			if(!this.$scope.layout.settings) {
				this.$scope.layout = qlik.layout(this);
			} 

			/*
			if ( !this.$scope.table ) {
				this.$scope.table = qlik.table( this );
			}
			*/

			return qlik.Promise.resolve();
		};
	me.controller = Controller;

	return(me);


} );
