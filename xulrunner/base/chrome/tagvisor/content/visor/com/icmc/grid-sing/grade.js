
c = require("choreographer");
timer = require("timer");

var grade =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,


	descricao : new Array(),
	local : new Array(),

	start : function () { 

		this.element = this._coreDoc.createElement('div');
		this.element.setAttribute("class","gradeContainer");
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		var ddate = new Date();

		dday = ddate.getDate();
		var currentDay = this.evento[dday];
		var head="<tr><td colspan='1'><h2> " + this.descricao[dday] + "</h2></td>";
		head+="<td><h3> " + this.local[dday] + "</h3></td></tr>";
		var innerAll = "";
		for (key in currentDay) { 
			var eventItem = currentDay[key]; 
			var hours = parseInt(eventItem.fim.split(":")[0])*60 +  parseInt(eventItem.fim.split(":")[1]);
			var innerTd = "<tr id='rule_"+hours+"' ><td align='right'>"+eventItem.inicio+" - "+ eventItem.fim+" </td><td>"+ eventItem.descricao +"<span class='gradeLocal'> @ "+eventItem.local+"</span></tr>";
			innerAll += innerTd;
		}
		this.element.innerHTML+="<table class='gradeTable'  border='0' cellpadding='10'>"+head+innerAll+"</table>";
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

                for (key in currentDay) {

                        var eventItem = currentDay[key];

			var hours =0;

			try { 
				hours =   parseInt(eventItem.fim.split(":")[0])*60 + parseInt(eventItem.fim.split(":")[1]);
			} catch(i) { hours = 3600 } 


			if( hours<actual ) { 
 				this._coreDoc.getElementById("rule_"+hours).style.display="none";	
			} else { 
 				this._coreDoc.getElementById("rule_"+hours).style.fontSize=font+"%";	
				font*=.9;
			}  
			

                }

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 5000);
	},


  	style: <><![CDATA[

		.gradeTable td { 

			border-bottom:1px solid #ddd; 
		} 

		.gradeContainer { 

			color:black;font-size:20px;font-weight:bold;text-shadow: #555 2px 2px 5px;

	 	} 

		.gradeContainer h3 { 
			color:#777; 
			font-size:20px;
			text-shadow:none;
		} 

		.gradeLocal { 
			text-shadow: none;
			font-size:80%;
			color:gray;
		} 

 	]]></>, 


	init : function () { 

	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 

this.descricao["28"] = "11th International Workshop on Real and Complex Singularities";
this.local["28"] = "Wednesday 28th @ ICMC USP";

	} ,

evento : { 

"28": [ 

{ inicio: "10:00 ", fim: "11:00 ", descricao: "The topology of Matrix Singularities and Determinantal Arrangements - James Damon ", sigla: "- ",local: "Auditorium ",apresentador: ""},
{ inicio: "11:00 ", fim: "11:20 ", descricao: "Coffee break - enjoy ", sigla: "- ",local: "Open patio at Library's",apresentador: ""},
{ inicio: "11:20 ", fim: "12:00 ", descricao: "Weakly Whitney complex stratifications are Whitney - David J. A. Trotman [room 4-001]; On the Hessian Geometry of a Real Polynomial Hyperbolic near Inﬁnity - Federico Sanchez Bringas [room 4-003]; Splice diagrams and universal abelian covers of isolated surface singularities - Helge Moller Pedersen [Room 4-005] ", sigla: "- ",local: "[4-001,4-003,4-005]",apresentador: ""},
{ inicio: "12:00 ",fim: "13:00",descricao: 'Singularities in the diﬀerential equations for the motion underfocal attraction and radial drift in rotating medium - Jorge Sotomayor',sigla: "  ",local: "Room [4-001]  ",apresentador:""},
{ inicio: "13:00 ",fim: "- ",descricao: 'Enjoy the BBQ Party ',sigla: "  ",local: "",apresentador:""}

]

}

} // end of grade 


c.register(grade);
