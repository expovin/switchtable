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


function getCurrentRecord(row, layout){

	var currRec = {
		'id': '',
		'TbRow' : {},
		'TbRowDet' : {}
	};

		for(cell in layout.qHyperCube.qDataPages[0].qMatrix[row]){

			if(!include (layout.settings.listFieldPivot , layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle )) {			
				currRec.TbRow[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText,"Valore":true};
				currRec.id = currRec.id +':'+cell+':'+ layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText;
			} else {
				console.log("Inserimento in TbRowDet");
				currRec.TbRowDet[layout.qHyperCube.qDimensionInfo[cell].qFallbackTitle] = {"Content": layout.qHyperCube.qDataPages[0].qMatrix[row][cell].qText};
			}
		}
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