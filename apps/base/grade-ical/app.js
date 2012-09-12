
function getHourBegins(item) { 
	var currHour  = item.inicio; 
	var splitHour = currHour.split(':');
 	var plainHour = splitHour[0]+splitHour[1];
        return parseInt(plainHour);
} 

function getHourEnds(item) { 
	var currHour  = item.fim; 
	var splitHour = currHour.split(':');
 	var plainHour = splitHour[0]+splitHour[1];
        return parseInt(plainHour);
} 

function eventsBySortedHours(values) {

   var array_with_keys = [];
   for (var i = 0; i < values.length; i++) {
       array_with_keys.push({ key: i, value: values[i] });
   }

   array_with_keys.sort(function(a, b) {
      if (parseInt(a.value) < parseInt(b.value)) { return -1; }
      if (parseInt(a.value) > parseInt(b.value)) { return  1; }
      return 0;
   });

   var keys = [];
   for (var i = 0; i < array_with_keys.length; i++) {
       keys.push(array_with_keys[i].key);
   }
   return keys;

}

// returns unicode characters so we have a lot of possible table values
var charToElement = new Array();
var gridCharUsed=32000;
function mapCell(storeElement) { 
  var proposalUTFChar = getUnicodeCharacter(gridCharUsed++);
  charToElement['_'+proposalUTFChar]=storeElement;
  return proposalUTFChar;
} 

var gridOther = [ 'Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
var cellOtherNext=0;
function mapNoneCell() { 
  return gridOther[cellOtherNext++]; 
} 

var gridRoom = [ '1','2','3','4','5','6','7','8','9','0','_'];
var gridRoomNext=0;
function getRoomChar() { 
  return gridRoom[gridRoomNext++]; 
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

				// Event begins at...
				var currHour = eventItem.inicio; 
				var splitHour = currHour.split(':');
			 	var plainHour = splitHour[0]+splitHour[1];

				if(!eventBegins[plainHour]) { 
					eventBegins[plainHour] = new Array();
				} 
				eventBegins[plainHour].push(eventItem);

				listHourKeys.push(plainHour);

				// Event ends at ...
				var currHour = eventItem.fim; 
				var splitHour = currHour.split(':');
			 	var plainHour = splitHour[0]+splitHour[1];

				if(!eventEnds[plainHour]) { 
					eventEnds[plainHour] = new Array();
				} 
				eventEnds[plainHour].push(eventItem);

				listHourKeys.push(plainHour);

			}

			// We sort the list of proposed "hours" for begins and ends for sessions
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
			for(var hour in hourSlices ) { 
				for( var i in eventBegins[hour] ) { 
					  var item = eventBegins[hour][i];
					  //item.cellMap=getCellChar();
					  item.cellMap=mapCell(item);
					  if(!updateColumns[item.local]) { 
						updateColumns[item.local]=new Array();
					  } 
					  updateColumns[item.local].push(item);
				} 
			} 
			var cols = 0;
			for(var k in updateColumns) { cols++; } 
			alert(cols);

			var matrixOut = new Array();
			var buffer = '';
			var yy=0, xx=0;
			var openElements = new Array();

			for(var hour in hourSlices ) { 
				
			   for( var e in updateColumns ) { 
			      var items = updateColumns[e];
			      var proposeChar='';
			      for( var kk in items) { 
                                var item = items[kk];
				if(getHourBegins(item)==parseInt(hour)) { 
				   proposeChar = item.cellMap;  
				   openElements[e]=item;
				} 
			      } 
                              if(proposeChar=='') { 
			        if(openElements[e]) { 	
		 		   if(getHourEnds(openElements[e])>parseInt(hour)) { 
		  		       proposeChar = openElements[e].cellMap;
				   } 
				} 
                              } 
			      if(proposeChar=='') { 
			        proposeChar = mapNoneCell(); 
			      } 
		  	      buffer+=proposeChar;
			      xx++;
			   } 
                           yy++;
			} 
 			var container=document.createElement('div');
                        var cName = 'container_'+Math.random();
                        container.setAttribute('id', cName);
                        document.body.appendChild(container);

			cssWidth = parseInt(parseInt(document.getElementById(cName).offsetWidth)/cols);
			var classProposal = 'inner'+parseInt(Math.random()*1000);
                        grid(buffer, cols, cName, classProposal);
			//$('.'+classProposal).attr("style",'width:'+cssWidth+'px;background-color:rgba(255,0,0,.3)');

			var proposedHeight=0;
			$('.'+classProposal).each(function() { 
			 	if(charToElement['_'+$(this).attr('id')])  {	
				 	var el = charToElement['_'+$(this).attr('id')];
				 	$(this).html(el.descricao);
					var deltaHeight = getHourEnds(el)-getHourBegins(el);
				//	alert(el.inicio + ' and end is ' + el.fim + ' delta = ' + deltaHeight);
					$(this).attr("style",'width:'+cssWidth+'px;height:'+deltaHeight+'px;background-color:rgba(255,0,0,.3)');
				} else { 
					$(this).html('');
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


