function makemyTable (layout){

	var myTable = [];
	var currRec = {
		'id': '',
		'TbRow' : {},
		'TbRowDet' : {}
	};

	var prevRec = {
		'id' : 'INIT',
		'TbRow' : {},
		'SubRec' : []
	};

	for(row in layout.qHyperCube.qDataPages[0].qMatrix){

		currRec=getCurrentRecord(row, layout, currRec);
		currRec=applySettings(currRec,layout.settings);

		if(prevRec.id != currRec.id){
			if(prevRec.id != 'INIT'){
				prevRec=insertIntoMyTable(prevRec, myTable);

			}
			savePrevRec(currRec, prevRec);
		}
		else
			prevRec.SubRec.push(clone(currRec.TbRowDet));
	}
	//Gestione ultimo record
//	savePrevRec(currRec, prevRec);
	prevRec=insertIntoMyTable(prevRec, myTable);

	console.log(myTable);
	return(myTable);
}


function applySettings(currRec, settings){

	for(setting in settings.listItems){

		//console.log($scope.layout.settings.listItems[setting].label);
		currRec.TbRow[settings.listItems[setting].label]["Prefisso"] = settings.listItems[setting].prefisso;
		currRec.TbRow[settings.listItems[setting].label]["Numerazione"] = settings.listItems[setting].numerazione;
		currRec.TbRow[settings.listItems[setting].label]["Visualizzazione"] = settings.listItems[setting].visualizzazione;
		currRec.TbRow[settings.listItems[setting].label]["Valore"] = false;

		if(!currRec.TbRow[settings.listItems[setting].label]["Visualizzazione"]){
					
			var array=[];
			var btn=[];

			for(i=0, len = currRec.TbRow[settings.listItems[setting].label]["Content"].length; i<len; i++){
				array.push(currRec.TbRow[settings.listItems[setting].label]["Content"][i]);
				if(currRec.TbRow[settings.listItems[setting].label]["Content"][i] == 1)
					btn.push('btn btn-success');
				else
					btn.push('btn btn-danger');
			}
			currRec.TbRow[settings.listItems[setting].label]["Content"] = array;
			currRec.TbRow[settings.listItems[setting].label]["Buttons"] = btn;
		}

				
		if(settings.listItems[setting].colorArray){
					
			var colors = settings.listItems[setting].colorArray.split(";");
					//console.log(colors);
			for(color in colors){
				var step = colors[color].split(",");
				if(Number(currRec.TbRow[settings.listItems[setting].label]["Content"])<step[0])
					currRec.TbRow[settings.listItems[setting].label]["Colore"] = step[1];
			}
					
		}

	}
	return(currRec);
}

function getCurrentRecord(row, layout){

	var currRec = {
		'id': '',
		'TbRow' : {},
		'TbRowDet' : {}
	};

	for(cell in layout.qHyperCube.qDimensionInfo){

		//	if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle )) {
			if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle )) {			
				currRec.TbRow[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText,"Valore":true};
				currRec.id = currRec.id +':'+cell+':'+ layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText;
			} else {
				currRec.TbRowDet[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText};
			}
	}
	/*
	var cell = layout.qHyperCube.qDimensionInfo.length;
	for(cellM in layout.qHyperCube.qMeasureInfo){

		var idx = Number(cell) + Number(cellM);
		//	if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle )) {
		if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qMeasureInfo[cellM].qFallbackTitle )) {			
			currRec.TbRow[layout.qHyperCube.qMeasureInfo[cellM].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][idx].qText,"Valore":true};
			currRec.id = currRec.id +':'+cell+':'+ layout.qHyperCube.qDataPages[0].qMatrix[row][idx].qText;
		} else {
			currRec.TbRowDet[layout.qHyperCube.qDimensionInfo[idx].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][idx].qText};
		}
	}
	*/
	return(currRec);
}

function insertIntoMyTable(prevRec, myTable){
	myTable.push(clone(prevRec));
	prevRec = {
		'id' : '',
		'TbRow' : {},
		'SubRec' : []
	};
	return(prevRec);
}

function savePrevRec(currRec, prevRec){
	prevRec.TbRow = currRec.TbRow;

//	console.log(currRec.TbRowDet);
//	console.log(currRec.TbRowDet.length);
	if(currRec.TbRowDet)
		prevRec.SubRec.push(clone(currRec.TbRowDet));

	prevRec.id = currRec.id;
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

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}