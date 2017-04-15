function makemyTable (layout){

	var SubDocStream = [];
	myTable = [];
	myDetTable = [];
	var id=0;

	var fullRow = '';
	var prevFullRow;
	var TbRow = {};

	for(row in layout.qHyperCube.qDataPages[0].qMatrix){
		
		var prevTbRow = {};
		var TbDetRow = {};
		var prevSubDocStream = [];
		
		
		prevFullRow = fullRow;
		var fullRow='';


		TbRow = {};

		prevTbRow = jQuery.extend(true, {}, TbRow);
		prevSubDocStream = jQuery.extend(true, {}, SubDocStream);

		for(cell in layout.qHyperCube.qDataPages[0].qMatrix[row]){


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

			var mainStream = {'MainStream' : TbRow,"SubDocStream":SubDocStream};
			myTable.push(mainStream);



			SubDocStream=[];
			
		}	
		//console.log(SubDocStream);
		
	}
	//console.log(SubDocStream);
	console.log(myTable);
	
	return(myTable);
}

function popSubDoc(arrSrc){
	var arrDest=[];
	for(var i=0; i<arrSrc.length-1; i++) {
		arrDest[i] = arrSrc[i];
		arrSrc.splice(i, 1);
	}
	return(arrSrc);
}

function include(arr, obj) {
    for(var i=0; i<arr.length; i++) {
        if (arr[i].label == obj) return true;
    }
    return false;
}
