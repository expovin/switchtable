var Controller = ['$scope', "$document", "$element", function ($scope, $document, $element) 
{
//	console.log($document);
//	console.log($element);

	//$scope.myTable = makemyTable($scope.layout);

	$scope.openRow = function (index){
		console.log(index);
		$scope.Aperto=true;
	}

	$scope.makeSelection = function(){
		console.log(this.row.MainStream.TRAIN_ID.Content);
		$scope.QlikApp.field("TRAIN_ID").selectValues([parseInt(this.row.MainStream.TRAIN_ID.Content)], false);
		$scope.navigation.gotoSheet($scope.layout.settings.listItems[0].SheetId);
	}

	$scope.motori = function(){
		console.log(this.row.MainStream.TRAIN_ID.Content);
		$scope.QlikApp.field("TRAIN_ID").selectValues([parseInt(this.row.MainStream.TRAIN_ID.Content)], false);
		var idx = getSheetMotori($scope.layout.settings.listItems);
		$scope.navigation.gotoSheet($scope.layout.settings.listItems[idx].SheetId);
	}

	$scope.collapseAll = function(){
		$scope.innerTable=false;
	}

	$scope.expandAll = function(){
		$scope.innerTable=true;
	}
}]


function getSheetMotori(ItemList)
{
	for(var i=0; i<ItemList.length; i++){
		if(ItemList[i].label == "MOTORI") return(i);
	}

}
