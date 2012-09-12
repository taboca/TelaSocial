



   hashChars = new Array();
   hashLines = new Array();
   gCols = null;
   gStr = null;
   cssWidth=40; 
   cssHeight=40;

   function grid(str,cols,target) { 
        gStr = str; 
        gCols= cols; 
	//hashSum(gStr,gCols);
  	var indexLine=0;
        var parseUpToLine=gStr.length;
	currEl = document.getElementById(target);
        clusterFlip(false, currEl, 0,str,cols);
	//$('#container').append(lineBuf);
   } 
    
   var flipFlop = true;
   var classType ='';
   function clusterFlip(flipFlop, currEl, index, str,shift) { 
	var range = str.length/shift;
	while(index<range) { 
//alert('made slice in ' + index + ' and state of currEl ' + currElstr);
//alert(' through ' + str + ' sliced in ' + index + ' to ' + str.length + ' and range ' + range);
	  if(str!='') { 
	    if(flipFlop) { 
		classType = 'c gh';
	    } else { 
		classType = 'c gv';
            }  
		var el = document.createElement("div");
		//el.innerHTML=str;
		el.setAttribute("class",classType);
	        currEl.appendChild(el);	

       		 	index = clusterQuery(flipFlop, el,str,shift);
		str = str.substr(index*shift, str.length);
	  } else { break;} 

  	} 
   } 
    

   // For rows 
   // index, shift  ( cols or lines ), indexLine, parseUpToLine = indexLine+cols;  

   function clusterQuery(flipflop, el, range,shift) { 
	var hashChars = hashSum(range, shift);
	var indexLine = 0;
	var parseUpToLine = indexLine+1; 
	var oIndex = indexLine; 
	var buff = '';
	//alert('max ' + parseUpToLine);
	var pixel = 0;
	while(indexLine<parseUpToLine) { 
		var cellUpToLine = hashChars[range[pixel]]-1;
		//alert('indexLine is ' + indexLine + ' char is ' + range[pixel] + ' and reach is ' + cellUpToLine );
		buff += range[pixel];
		if(cellUpToLine>=parseUpToLine) { 
			parseUpToLine=cellUpToLine+1;
			//alert('seting max ' + parseUpToLine);
		} 
		//alert('pixel = ' + pixel + ' and shift = ' + shift + ' and rest = ' + pixel % shift );
		pixel++;
		if(pixel%shift == 0) { indexLine++ } 
	} 
	//alert('found flip slice in ' + oIndex + ' to ' + parseInt(indexLine-1) );
	//clusterQuery(buff,0,	
	var o = flipString(buff,buff.length/shift, shift);
	//alert(buff + ' and flipped = ' + o + ' and will query for ' + buff.length/shift);
	//clusterQuery(o, buff.length/shift); 
	var checkReduce = reduce(o,shift);
	if(!checkReduce) { 	
         	clusterFlip(!flipflop, el, 0, o, buff.length/shift); 
	} else {  
		var lines = o.length/shift;
   		el.innerHTML='<div class="inner">'+o+'</div>';	
		var yHeight = cssHeight*lines;
		var xWidth = cssWidth*shift;
		if(flipflop) { 
			var temp = yHeight;
			yHeight = xWidth;
			xWidth = temp;
		} 
		el.setAttribute('style','width:'+xWidth+'px;height:'+yHeight+'px');
        }  
        return parseUpToLine; 
   }  

   function reduce(str,cols) { 
	var ss = str[0];
	var cCount = 0;
	for(var k=0;k<str.length;k++) { 
		if(k % cols==0) { cCount++ } 
		var c = str[k];
		if(ss!=c) return false; 
	} 
	return { c: cCount } 
   } 
   

   function flipString(inputStr, lines, cols) { 
	var outputString='';
	for(j=0;j<cols;j++) { 
		for(var i=0;i<lines;i++) { 
			outputString+=inputStr[i*cols+j];
			
		} 
	} 
	return outputString; 
   } 

   // This tells the square for each element 
   // for example que square abcd hash['a']={x:0,y:0,w:0,h:0}  
   function hashSum(str,cols) { 
	var hashChars=new Array();
	var line = 0;
	for(k in str) { 
		var hit = k % cols; 
		if(hit==0) { line++ } 
		var curr = str[k];
		if(!hashChars[curr]) { hashChars[curr]=line; } 
		if(line > hashChars[curr]) { hashChars[curr]=line } 
  	} 
	return hashChars;
   } 
 

