
function getHourBegins(item) { 
	var currHour  = item.inicio.split(':'); 
 	return parseInt(currHour[0])*60+parseInt(currHour[1]);
} 

function getHourEnds(item) { 
	var currHour  = item.fim.split(':');
 	return parseInt(currHour[0])*60+parseInt(currHour[1]);
} 

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
local : new Array(),

start : function () {

	document.body.innerHTML='';

	for(var k in this.evento) { 

		var ddate = new Date();
		dday = ddate.getDate();
		dday = k;
		var currentDay = this.evento[dday];

		if(currentDay) { 

	 	   if(ddate.getDate()<=k) {
			//this.descricao[dday] ;
			//this.local[dday] 
		
			var innerAll = "";
			// warning ( inverted ) 
			var eventBegins = new Array();
			var eventEnds = new Array();
			var listHourKeys = new Array();

			for(var k=currentDay.length-1;k>=0;k--) { 
				var eventItem = currentDay[k];
				var plainHour = getHourBegins(eventItem);
				if(!eventBegins[plainHour]) { 
					eventBegins[plainHour] = new Array();
				} 
				eventBegins[plainHour].push(eventItem);
				listHourKeys.push(plainHour);

			 	var plainHour = getHourEnds(eventItem);
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
					  item.cellMap=mapCell({'type':'event','value':item , 'begin': getHourBegins(item),'end': getHourEnds(item)});
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
				  var roomChar = mapCell({'type':'slices', 'value': hour, 'height': delta , 'begin':slicesSequence[hourIndex], 'end':slicesSequence[hourIndex+1]});
				  buffer+=roomChar;
			      } 
			      var items = updateColumns[e];
			      var keyChar='';
			      for( var kk in items) { 
                                var item = items[kk];
				if(getHourBegins(item)==parseInt(hour)) { 
				   keyChar = item.cellMap;  
				   openElements[e]=item;
				} 
			      } 
                              if(keyChar=='') { 
			        if(openElements[e]) { 	
		 		   if(getHourEnds(openElements[e])>parseInt(hour)) { 
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
 			var container=document.createElement('div');
                        var cName = 'container_'+Math.random();
                        container.setAttribute('id', cName);
                        document.body.appendChild(container);

			cssWidth = parseInt(parseInt(document.getElementById(cName).offsetWidth-40)/cols);

			var uniqueClassName = 'inner'+parseInt(Math.random()*1000);
			var buffer2 = '';
			
			var cc=0,ll=0;

                        for(var i=0;i<buffer.length;i++) { 
				cc++;
				if(cc==cols+1) { ll++; cc=1} 
				if(ll!=1) { 
					buffer2+=buffer[i];	
				} 
			} 
                        grid(buffer, cols+1, cName, uniqueClassName);

			var proposedHeight=0;
			$('.'+uniqueClassName).each(function() { 
				var probeElement = charToElement[$(this).attr('id')];
			 	if(probeElement)  {	
				   if(probeElement.type=='event') { 
                                        var el = probeElement.value;
				 	$(this).html('<div class="innerInnerCell">'+el.descricao+'</div>');
					$(this).addClass('inner');
					var delta = getHourEnds(el)-getHourBegins(el);
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
					if(!delta) { 
						delta=100;
					} 
					$(this).addClass('innerHour');
					var localWidth='40px';
					$(this).attr("style",'width:'+localWidth+';height:'+delta+'px;');
					var hourSliceId = 'hourSlice_'+Math.random(); 
				 	$(this).html('<div id="'+hourSliceId+'" class="innerInnerHour" style="display:inline-block;padding:0px"><div>'+hour+'</div></div>');
					// This -20 is due to the padding and the 4 is for borders? 
  					var elWidth = document.getElementById(hourSliceId).offsetWidth; 
	
					document.getElementById(hourSliceId).setAttribute("style","-moz-transform-origin:0px 0px; -moz-transform:rotate(-90deg) ");
					document.getElementById(hourSliceId).firstChild.setAttribute("style","-moz-transform-origin:0px 0px; -moz-transform:translate(-"+parseInt(elWidth+10)+"px, 6px) ");
				        	
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

		   }	
		} 
   	} 
	this.tick();
} ,

tick : function () {
	this.data = new Date();
	this.month = this.data.getMonth() + 1;
	this.day = this.data.getDate();
	
	this.hours = this.data.getHours();
	this.minutes = this.data.getMinutes();
        var ddate = new Date();
        var currentDay = this.evento[ddate.getDate()];
        var innerAll = "";
	
	var font=200;
	var actual = this.hours * 60 + this.minutes;
	for (var k in this.evento) { 
        var currentDay = this.evento[k];
        //for (key in currentDay) {
	for(var r=currentDay.length-1;r>=0;r--) { 
          var eventItem = currentDay[r];
	  var hours =0;
		hours = parseInt(eventItem.fim.split(":")[0])*60 + parseInt(eventItem.fim.split(":")[1]);
		if(isNaN(hours)) hours=1440;
			if(k==this.day) { 
				if( hours<actual ) {
				  document.getElementById("rule_"+k+"_"+hours).style.display="none";
				} else {
				  if(k!=17) { 
				  document.getElementById("rule_"+k+"_"+hours).style.fontSize=font+"%";
				  font*=.9;
				  } 
				}
			} 
			if(k<this.day) { 
		  	//	document.getElementById("rule_"+k+"_"+hours).style.display="none";
		  	//	document.getElementById("rule_"+k+"_"+hours).setAttribute('id','');;
				// this is because we have duplicated nodes.. with ids so we 
				// want to eliminate the nodes so we can process more alike ( example 12:--) and
				// 14:-- are = 1440
			} 
        }
	}

	var scopedThis = this;
	//setTimeout( function () { scopedThis.tick() }, 5000);
},

init : function (eventData) {

this.evento=eventData;
this.descricao["30"] = "30 de Agosto";
this.local["30"] = "";
this.descricao["10"] = "10 de Agosto";
this.local["10"] = "";

} 

} // end of grade


