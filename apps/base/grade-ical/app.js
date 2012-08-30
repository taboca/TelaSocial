

var app = {

evento: null, 
descricao : new Array(),
local : new Array(),

start : function () {

	document.body.innerHTML='';
	for(var k in this.evento) { 

		this.element = document.createElement('div');
		this.element.setAttribute("class","gradeContainer");
		document.body.appendChild(this.element);
	
		var ddate = new Date();
		dday = ddate.getDate();
		dday = k;
		var currentDay = this.evento[dday];

		if(currentDay) { 
			if(ddate.getDate()<=k) {
			var head="<tr><td colspan='1'><h2> " + this.descricao[dday] + "</h2></td>";
			head+="<td><h3> " + this.local[dday] + "</h3></td></tr>";
		
			var innerAll = "";
			// warning ( inverted ) 
			for(var k=currentDay.length-1;k>=0;k--) { 
				
				var eventItem = currentDay[k];
				var hours = parseInt(eventItem.fim.split(":")[0])*60 + parseInt(eventItem.fim.split(":")[1]);
				if(isNaN(hours)) { hours = 1440 } ; 
				var innerTd = "<tr id='rule_"+dday+"_"+hours+"' ><td width='200' align='right'>"+eventItem.inicio+"-"+ eventItem.fim+" </td><td>"+ eventItem.descricao +"<span class='gradeLocal'>  "+eventItem.local+"</span></tr>";
				innerAll += innerTd;
			}
			this.element.innerHTML+="<table class='gradeTable' border='0' cellpadding='8'>"+head+innerAll+"</table>";
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


