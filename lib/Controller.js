var Controller = ['$scope', function ($scope) 
{

	console.log("Sono nel controller!");
	console.log($scope);

	$scope.table = [];
	

	for(row in $scope.layout.qHyperCube.qDataPages[0].qMatrix){
		var TbRow = {};
		for(cell in $scope.layout.qHyperCube.qDataPages[0].qMatrix[row]){
			//console.log($scope.layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle);

			//console.log($scope.layout.qHyperCube.qDataPages[0].qMatrix[row][cell]);
			TbRow[$scope.layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Val": $scope.layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText};
		}
		
		for(setting in $scope.layout.settings.listItems){
			//console.log($scope.layout.settings.listItems[setting].label);
			TbRow[$scope.layout.settings.listItems[setting].label]["Prefisso"] = $scope.layout.settings.listItems[setting].prefisso;
			TbRow[$scope.layout.settings.listItems[setting].label]["Numerazione"] = $scope.layout.settings.listItems[setting].numerazione;
			TbRow[$scope.layout.settings.listItems[setting].label]["Visualizzazione"] = $scope.layout.settings.listItems[setting].visualizzazione;

		}
		
		
		$scope.table.push(TbRow);
	}
	console.log($scope.table);

}]