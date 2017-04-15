var Controller = ['$scope', "$document", "$element", function ($scope, $document, $element) 
{
//	console.log($document);
//	console.log($element);

	//$scope.myTable = makemyTable($scope.layout);

	$scope.openRow = function (index){
		console.log(index);
		$scope.Aperto=true;
	}

	$scope.makeSelection = function(idx){
		console.log($scope.layout);
		console.log(idx);
		var Colonna = $scope.layout.qHyperCube.qDimensionInfo[idx].qFallbackTitle;
		var Filtro = getColonnaFiltro ($scope.layout.settings.listItems, Colonna);
		console.log(Colonna);
		console.log(Filtro);
		if(Filtro.Selezionabile) {
			if(isNumeric(this.row.TbRow[Filtro.Campo].Content))
				$scope.QlikApp.field(Filtro.Campo).selectValues([parseInt(this.row.TbRow[Filtro.Campo].Content)], false);
			else
				$scope.QlikApp.field(Filtro.Campo).selectValues([this.row.TbRow[Filtro.Campo].Content], false);
			$scope.navigation.gotoSheet(Filtro.SheetId);
		}
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


function getColonnaFiltro (arr, Col){
	for(ele in arr)
		if(arr[ele].label == Col) 
			return ({'Campo' : arr[ele].Campo,
					'SheetId' : arr[ele].SheetId, 
					'Selezionabile': arr[ele].selezionabile});
	
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}