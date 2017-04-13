function makemyTable (layout){

	var SubDocStream = [];
	myTable = [];
	myDetTable = [];
	var id=0;

	var fullRow = '';
	//console.log(layout.qHyperCube.qDataPages);
	for(row in layout.qHyperCube.qDataPages[0].qMatrix){
		var TbRow = {};
		var prevTbRow = {};
		var TbDetRow = {};
		
		
		var prevFullRow = fullRow;
		var fullRow='';
		for(cell in layout.qHyperCube.qDataPages[0].qMatrix[row]){
			//console.log($scope.layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle);
			// Deep copy
			prevTbRow = jQuery.extend(true, {}, TbRow);

			//console.log($scope.layout.qHyperCube.qDataPages[0].qMatrix[row][cell]);

			if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle )) {
				TbRow[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText,"Valore":true};
				fullRow = fullRow + layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText;
			} else {
				TbDetRow[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText,"id":id};
			}
		}
		SubDocStream.push(TbDetRow);
		//console.log(TbDetRow);
		
		// Rottura Chiave
		if(fullRow != prevFullRow) {
		    id +=1;


			for(setting in layout.settings.listItems){
				//console.log($scope.layout.settings.listItems[setting].label);
				TbRow[layout.settings.listItems[setting].label]["Prefisso"] = layout.settings.listItems[setting].prefisso;
				TbRow[layout.settings.listItems[setting].label]["Numerazione"] = layout.settings.listItems[setting].numerazione;
				TbRow[layout.settings.listItems[setting].label]["Visualizzazione"] = layout.settings.listItems[setting].visualizzazione;
				TbRow[layout.settings.listItems[setting].label]["Valore"] = false;

				if(!TbRow[layout.settings.listItems[setting].label]["Visualizzazione"]){
					
					var array=[];
					var btn=[];
					for(i=0, len = TbRow[layout.settings.listItems[setting].label]["Content"].length; i<len; i++){
						array.push(TbRow[layout.settings.listItems[setting].label]["Content"][i]);
						if(TbRow[layout.settings.listItems[setting].label]["Content"][i] == 1)
							btn.push('btn btn-success');
						else
							btn.push('btn btn-danger');
					}
					TbRow[layout.settings.listItems[setting].label]["Content"] = array;
					TbRow[layout.settings.listItems[setting].label]["Buttons"] = btn;
				}

				
				if(layout.settings.listItems[setting].colorArray){
					
					var colors = layout.settings.listItems[setting].colorArray.split(";");
					//console.log(colors);
					for(color in colors){
						var step = colors[color].split(",");
						if(Number(TbRow[layout.settings.listItems[setting].label]["Content"])<step[0]){
							//console.log(step);
							TbRow[layout.settings.listItems[setting].label]["Colore"] = step[1];
						}

					}
					
				}

			}
			var mainStream = {'MainStream' : TbRow};
			myTable.push(mainStream);
			
		}	
		//console.log(SubDocStream);
		
	}
	console.log(SubDocStream);
	console.log(myTable);
	
	return(myTable);
}



function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i].label == obj) return true;
    }
    return false;
}
