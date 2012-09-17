
// returns unicode characters so we have a lot of possible table values
var charToElement = new Array();
var gridCharUsed=32000;
function mapCell(storeElement) { 
  var proposalUTFChar = getUnicodeCharacter(gridCharUsed++);
  charToElement[proposalUTFChar]=storeElement;
  return proposalUTFChar;
} 

var app = {

  evento: null, 
  descricao : new Array(),
  gridCols: 0, 
  gridBuffer: null, 
  local : new Array(),

  start : function (queryDays) {
 	document.body.innerHTML='';
	for(var k in queryDays) { 
		//var ddate = new Date();
		//dday = ddate.getDate();
		dday = queryDays[k];
		var currentDay = this.evento[dday];
		if(currentDay) { 

			// gridFill for day will take things like 
			// event A = 8am - 10am, room a
			// event B = 9am - 11am, room b
			// event C = 10am - 12pm, room c 
			this.gridFillForDay(currentDay);
			// into a specification for the grid type 
			// str to divs inline API 
			// which wants something like this 
			// 8am:  a,_,_
			// 9am:  a,b,_
			// 10am: _,b,c
			// 11am: _,_,c
			// 12pm: _,_,_ 

			// So, before we actually generate the divs we 	
			// can cut based in a given interest area. For 
			// example, if current Time = 9:50am, we do not 
			// have to show 8-9am line one. 

			var currHourFlat = (new Date()).getHours()*60+(new Date()).getMinutes()-60;
	

			if((new Date()).getDate()==dday) { 
				this.bufferStrip(currHourFlat);
			} 

			
			// generateDivs are to use gridBuffer, cols 
			// and the inner util function gridtype to make
 			// 4,abcd format into DIVs inline 

			this.generateDivs();
		}	
	} 
  }, 
 
  bufferStrip: function (currHour) { 

	// Example, if cols = 3 we have in fact lines of 4 chars because 
	// the prior algorithm adds a first column for the sake of hours 
	// reference. 

      var i=0,j=0;
	var cutChars = false;
	var buffer2 = '';
	var collectBuffer = '';
		var one= true;
      for(var k = 0; k<this.gridBuffer.length; k++) { 
	
		var electChar = this.gridBuffer[k]; 

		if(i>0) { // we think for lines not the header.. 
			if(j==0) { 
				var currEl = charToElement[this.gridBuffer[k]];
				var currBegin = currEl.begin; // example 840 mins 
				// currHour = 360 min  = 6AM 

				if(currBegin<currHour) { 
					cutChars=true;	
				} else { 
					if(one==true && collectBuffer!='') { 
						one=false;
						var from = collectBuffer.length-this.gridCols-1;
						collectBuffer = collectBuffer.substring(from,collectBuffer.length);
						charToElement[collectBuffer[0]].flag=true;
						buffer2+=collectBuffer;
						
						
					} 		

				}  

			}
			if(cutChars) { 
				if(j==this.gridCols) { 
					cutChars=false;
				} 
				collectBuffer+=this.gridBuffer[k];
				electChar='';
			}  
			
		} 
		
		buffer2+=electChar;
		j++;
		if(j>this.gridCols) { i++; j=0; } 	
      }  
	this.gridBuffer=buffer2;	

  },

  gridFillForDay: function (currentDay) { 

		var innerAll = "";
		// warning ( inverted ) 
		var eventBegins = new Array();
		var eventEnds = new Array();
		var listHourKeys = new Array();

		for(var k=currentDay.length-1;k>=0;k--) { 
			var eventItem = currentDay[k];
			var plainHour = strToMins(eventItem.inicio);
			if(!eventBegins[plainHour]) { 
				eventBegins[plainHour] = new Array();
			} 
			eventBegins[plainHour].push(eventItem);
			listHourKeys.push(plainHour);

		 	var plainHour = strToMins(eventItem.fim);
			if(!eventEnds[plainHour]) { 
				eventEnds[plainHour] = new Array();
			} 
			eventEnds[plainHour].push(eventItem);
			listHourKeys.push(plainHour);
		}

		// We sort 
		var hoursKeys = eventsBySortedHours(listHourKeys);
		var hourSlices = new Array();
		for(var k in hoursKeys) { 
			var hourToCheck =  listHourKeys[hoursKeys[k]];
			if(!hourSlices[hourToCheck]) { 
				hourSlices[hourToCheck]=true;
			} 
		} 

		// We count, collect the columns
		var updateColumns = new Array();
                      
		var slicesSequence = new Array();
		var slicesCount=0;
		for(var hour in hourSlices ) { 
			slicesSequence[slicesCount++]=hour; // this is for later use, we simply counting 
			for( var i in eventBegins[hour] ) { 
				  var item = eventBegins[hour][i];
				  item.cellMap=mapCell({'type':'event','value':item , 'begin': strToMins(item.inicio),'end': strToMins(item.fim)});
				  if(!updateColumns[item.local]) { 
					updateColumns[item.local]=new Array();
				  } 
				  updateColumns[item.local].push(item);
			} 
		} 
		var cols = 0;
		for(var k in updateColumns) { cols++; } 

		var buffer = '';
		var hourIndex=0, roomIndex=0;
		var openElements = new Array();
		var dumpHeader=false;
		var dumpHours=0;

		for(var hour in hourSlices ) { 
			
		   if(hourIndex==0&&!dumpHeader) { 
			dumpHeader = true; 
			buffer=mapCell({'type':'corner'});
		        for( var e in updateColumns ) { 
				var roomChar = mapCell({'type':'header', 'value': e});
				buffer+=roomChar;
			} 
		   } 
		   var columnCount=0;
		   for( var e in updateColumns ) { 
			if(columnCount==0) { 
			   var delta = parseInt(slicesSequence[hourIndex+1]-slicesSequence[hourIndex]);
			   var roomChar = mapCell({'type':'slices', 'value': hour, 'height': delta , 'begin':slicesSequence[hourIndex], 'end':slicesSequence[hourIndex+1], 'flag':false});
			   buffer+=roomChar;
		        } 
			var items = updateColumns[e];
			var keyChar='';
			for( var kk in items) { 
				var item = items[kk];
				if(strToMins(item.inicio)==parseInt(hour)) { 
					keyChar = item.cellMap;  
					openElements[e]=item;
				} 
			} 
			if(keyChar=='') { 
				if(openElements[e]) { 	
					if(strToMins(openElements[e].fim)>parseInt(hour)) { 
						keyChar = openElements[e].cellMap;
					} else { 
						// we may consider killing open elements
					} 
				} 
			} 
			if(keyChar=='') { 
				var hEnd = slicesSequence[hourIndex+1];
				var hBegin = slicesSequence[hourIndex];
				var delta = parseInt(hEnd-hBegin);
				keyChar = mapCell({'type':'none', 'value': delta, 'begin':slicesSequence[hourIndex], 'end':slicesSequence[hourIndex+1]}); 
			} 
			buffer+=keyChar;
			roomIndex++;
			columnCount++;
		     } // columns = rooms  
                     hourIndex++;
		}  // hours = slices 

		this.gridBuffer=buffer;
		this.gridCols  =cols;

	}, 

  generateDivs: function () { 

		var buffer = this.gridBuffer; 
		var cols   = this.gridCols;
		var container=document.createElement('div');
       		var cName = 'container_'+Math.random();
		container.setAttribute('id', cName);
		document.body.appendChild(container);
		cssWidth = parseInt(parseInt(document.getElementById(cName).offsetWidth-40)/cols);
		var uniqueClassName = 'inner'+parseInt(Math.random()*1000);

		grid(buffer, cols+1, cName, uniqueClassName);

		var proposedHeight=0;
		$('.'+uniqueClassName).each(function() { 
			var probeElement = charToElement[$(this).attr('id')];
		 	if(probeElement)  {	
			   if(probeElement.type=='event') { 
                                       var el = probeElement.value;
			 	$(this).html('<div class="innerInnerCell">'+el.descricao+'</div>');
				$(this).addClass('inner');
				var delta = strToMins(el.fim)-strToMins(el.inicio);
				$(this).attr("style",'width:'+cssWidth+'px;height:'+delta+'px;');
			   } 

			   if(probeElement.type == 'none') { 
                                       var delta = probeElement.value;
				$(this).addClass('innerNone');
				$(this).attr("style",'width:'+cssWidth+'px;height:'+delta+'px;');
				$(this).html('');
			   } 

			   if(probeElement.type == 'slices') { 
                                var hour = probeElement.value;
                                var delta = probeElement.height;

					if(!delta) { delta=100; } 
					$(this).addClass('innerHour');
					var localWidth='40px';
					var hourSliceId = 'hourSlice_'+Math.random(); 
					var strHH = ''+Math.floor(parseInt(hour)/60);
					var strMM = ''+parseInt(hour)%60; 
					if(strMM<10) { strMM+='0'; } 
					var strProposal = strHH+':'+strMM;

					if(probeElement.flag) { 
						strProposal='';
					} 
					$(this).attr("style",'width:'+localWidth+';height:'+delta+'px;');
				 	$(this).html('<div id="'+hourSliceId+'" class="innerInnerHour" style="display:inline-block;padding:0px"><div>'+strProposal+'</div></div>');
	
					// This -20 is due to the padding and the 4 is for borders? 
	  				var elWidth = document.getElementById(hourSliceId).offsetWidth; 
			   } 

			   if(probeElement.type == 'header') { 
                                       var room = probeElement.value;
				$(this).addClass('innerHeader');
				$(this).attr("style",'width:'+cssWidth+'px;');
			 	$(this).html('<div class="innerInnerHeader">'+room+'</div>');
			   } 

			   if(probeElement.type == 'corner') { 
				var localWidth='40px';
                                       var room = probeElement.value;
				$(this).attr("style",'width:'+localWidth+';');
			 	$(this).html('<div class="innerInnerCorner" style="-moz-transform-orifin:0px 0px; -moz-transform:rotate(-90deg)"> </div>');
			   } 

			} 
		});

  },

  init : function (eventData) {
    this.evento=eventData;
  } 

} // end of grade


