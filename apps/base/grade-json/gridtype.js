
   hashChars = new Array();
   hashLines = new Array();
   gCols = null;
   gStr = null;
   cssWidth=40; 
   cssHeight=40;
   var gClassName = 'inner';

   function grid(str,cols,target, className) { 
	gClassName = className;
        gStr = str; 
        gCols= cols; 
  	var indexLine=0;
        var parseUpToLine=gStr.length;
	currEl = document.getElementById(target);
        clusterFlip(false, currEl, 0,str,cols);
   } 
    
   var flipFlop = true;
   var classType ='';
   function clusterFlip(flipFlop, currEl, index, str,shift) { 
	var range = str.length/shift;
	while(index<range) { 
	  if(str!='') { 
	    if(flipFlop) { 
		classType = 'c gh';
	    } else { 
		classType = 'c gv';
            }  
		var el = document.createElement("div");
		el.setAttribute("class", classType);
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
		buff += range[pixel];
		if(cellUpToLine>=parseUpToLine) { 
			parseUpToLine=cellUpToLine+1;
		} 
		pixel++;
		if(pixel%shift == 0) { indexLine++ } 
	} 
	var o = flipString(buff,buff.length/shift, shift);
	var checkReduce = reduce(o,shift);
	if(!checkReduce) { 	
         	clusterFlip(!flipflop, el, 0, o, buff.length/shift); 
	} else {  
		var lines = o.length/shift;
		
		var charFromStr =o[0];	
   		el.innerHTML='<div class="'+gClassName+'" id="'+charFromStr+'">qq</div>';	
		var yHeight = cssHeight*lines;
		var xWidth = cssWidth*shift;
		if(flipflop) { 
		} 
		//el.setAttribute('style','overflow:hidden;width:'+cssWidth+'px;');
		//el.setAttribute('style','height:'+yHeight+'px');
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
 

