define( [
	"qlik",
	"jquery", 
	"text!./css/style.css", 
//	"css!./css/scoped-bootstrap.css", 
	"text!./template.html",
	"./lib/Service",
	"./lib/Settings",
	"./lib/Controller"
	], 
	function (qlik, $, cssContent, template ) {

		'use strict';
    $("<style>").html(cssContent).appendTo("head");


	$( '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css">' ).appendTo( 'head' ); // Font Awesome CDN		
	$( '<link rel="stylesheet" href="/extensions/switchtable/css/scoped-bootstrap.css">' ).appendTo( 'head' ); // Font Awesome CDN		
	$( '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>' ).appendTo( 'body' ); // Bootstrap.js CDN



	var me = {};

    me= {
       template: template,
       initialProperties : {
			qHyperCubeDef : {
				qDimensions : [],
				qMeasures : [],
				qInitialDataFetch : [{
					qWidth : 20,
					qHeight : 500
				}]
		//		,qMode: "P"
			}
		},
		definition : VarDefinition
	};
	me.support = VarSupport;

	me.paint= function (layout) {
			//setup scope.table

			console.log(layout);
			this.$scope.myTable = makemyTable(this.$scope.layout);
			this.$scope.numOfColls = Object.size(this.$scope.myTable[0].TbRow);
			this.$scope.QlikApp =  qlik.currApp();
			this.$scope.navigation  = qlik.navigation;



			if(!this.$scope.layout.settings) {
				this.$scope.layout = qlik.layout(this);
			} 

			return qlik.Promise.resolve();
	};

	me.controller = Controller;


	return(me);

} );
