var Controller = ['$scope', function ($scope) 
{
	console.log($scope);


	$scope.myTable = [];
	

	for(row in $scope.layout.qHyperCube.qDataPages[0].qMatrix){
		var TbRow = {};
		for(cell in $scope.layout.qHyperCube.qDataPages[0].qMatrix[row]){
			//console.log($scope.layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle);

			//console.log($scope.layout.qHyperCube.qDataPages[0].qMatrix[row][cell]);
			TbRow[$scope.layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": $scope.layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText,"Valore":true};
		}
		
		for(setting in $scope.layout.settings.listItems){
			//console.log($scope.layout.settings.listItems[setting].label);
			TbRow[$scope.layout.settings.listItems[setting].label]["Prefisso"] = $scope.layout.settings.listItems[setting].prefisso;
			TbRow[$scope.layout.settings.listItems[setting].label]["Numerazione"] = $scope.layout.settings.listItems[setting].numerazione;
			TbRow[$scope.layout.settings.listItems[setting].label]["Visualizzazione"] = $scope.layout.settings.listItems[setting].visualizzazione;
			TbRow[$scope.layout.settings.listItems[setting].label]["Valore"] = false;

			if(!TbRow[$scope.layout.settings.listItems[setting].label]["Visualizzazione"]){
				
				var array=[];
				var btn=[];
				for(i=0, len = TbRow[$scope.layout.settings.listItems[setting].label]["Content"].length; i<len; i++){
					array.push(TbRow[$scope.layout.settings.listItems[setting].label]["Content"][i]);
					if(TbRow[$scope.layout.settings.listItems[setting].label]["Content"][i] == 1)
						btn.push('btn btn-success');
					else
						btn.push('btn btn-danger');
				}
				TbRow[$scope.layout.settings.listItems[setting].label]["Content"] = array;
				TbRow[$scope.layout.settings.listItems[setting].label]["Buttons"] = btn;
			}

			
			if($scope.layout.settings.listItems[setting].colorArray){
				
				var colors = $scope.layout.settings.listItems[setting].colorArray.split(";");
				console.log(colors);
				for(color in colors){
					var step = colors[color].split(",");
					if(Number(TbRow[$scope.layout.settings.listItems[setting].label]["Content"])<step[0]){
						console.log(step);
						TbRow[$scope.layout.settings.listItems[setting].label]["Colore"] = step[1];
					}

				}
				
			}

		}
		
		
		$scope.myTable.push(TbRow);
	}
	console.log($scope.myTable);

}]