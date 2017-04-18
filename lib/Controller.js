var Controller = ['$scope', "$document", "$element", function ($scope, $document, $element) 
{
	console.log($scope);
	//$scope.numOfColls = $scope.myTable[0].TbRow.length;

	//$scope.myTable = makemyTable($scope.layout);

	$scope.openRow = function (idx){
		console.log($scope.myTable[idx].Open);
		$scope.myTable[idx].Open = true;
	}

	$scope.closeRow = function (idx){
		console.log($scope.myTable[idx].Open);
		$scope.myTable[idx].Open = false;
	}

	$scope.makeSelection = function(idx){
		var Colonna = $scope.layout.qHyperCube.qDimensionInfo[idx].qFallbackTitle;
		var Filtro = getColonnaFiltro ($scope.layout.settings.listItems, Colonna);
		var Alias = getAlias($scope.layout.qHyperCube.qDimensionInfo, Filtro.Campo);


		console.log("idx : "+idx);
		console.log("Numerazione : "+$scope.layout.settings.listItems[idx].numerazione);


		if(Filtro.Selezionabile) {
			console.log(this.row.TbRow);
			console.log(Filtro.Campo);
			if(isNumeric(this.row.TbRow[Filtro.Campo].Content))
				$scope.QlikApp.field(Alias).selectValues([parseInt(this.row.TbRow[Filtro.Campo].Content)], false);
			else
				$scope.QlikApp.field(Alias).selectValues([this.row.TbRow[Filtro.Campo].Content], false);
			$scope.navigation.gotoSheet(Filtro.SheetId);
		}
	}

	$scope.selectSubRecord = function(idx){

		if($scope.layout.settings.selezionabile) {
			if(isNumeric(this.row.SubRec[idx][$scope.layout.settings.Campo].Content))
				$scope.QlikApp.field($scope.layout.settings.Campo).selectValues([parseInt(this.row.SubRec[idx][$scope.layout.settings.Campo].Content)], false);
			else
				$scope.QlikApp.field($scope.layout.settings.Campo).selectValues([this.row.SubRec[idx][$scope.layout.settings.Campo].Content], false);

			$scope.navigation.gotoSheet($scope.layout.settings.SheetId);
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


function getAlias(arr, Col) {
	console.log(arr);
	console.log(Col);
	for(ele in arr){
		console.log(arr[ele].qFallbackTitle+" - "+Col)
		if(arr[ele].qFallbackTitle == Col) 
			return (arr[ele].qGroupFieldDefs[0]);
	}
}


function getColonnaFiltro (arr, Col){
	for(ele in arr){
		if(arr[ele].label == Col) 
			return ({'Campo' : arr[ele].Campo,
					'SheetId' : arr[ele].SheetId, 
					'Selezionabile': arr[ele].selezionabile});
	}
	
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}