
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
		this.element.innerHTML+="<table class='gradeTable'   border='0' cellpadding='10'>"+head+innerAll+"</table>";
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
			border:0px;
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

this.descricao["12"] = "11th International Workshop on Real and Complex Singularities";
this.local["12"] = "Wednesday 28th @ ICMC USP";

this.descricao["29"] = "11th International Workshop on Real and Complex Singularities";
this.local["29"] = "Thursday 29th @ ICMC USP";

	} ,

evento : { 

"12": [ 

{ inicio: "22:15 ", fim: "22:17 ", descricao: "The topology of Matrix Singularities and Determinantal Arrangements - James Damon ", sigla: "- ",local: "Auditorium ",apresentador: ""},
{ inicio: "23:00 ", fim: "23:20 ", descricao: "Coffee break - enjoy ", sigla: "- ",local: "Open patio at Library's",apresentador: ""},
{ inicio: "23:20 ", fim: "23:50 ", descricao: "Weakly Whitney complex stratifications are Whitney - David J. A. Trotman [room 4-001]; On the Hessian Geometry of a Real Polynomial Hyperbolic near Inﬁnity - Federico Sanchez Bringas [room 4-003]; Splice diagrams and universal abelian covers of isolated surface singularities - Helge Moller Pedersen [Room 4-005] ", sigla: "- ",local: "[4-001,4-003,4-005]",apresentador: ""},
{ inicio: "12:00 ",fim: "13:00",descricao: 'Singularities in the diﬀerential equations for the motion underfocal attraction and radial drift in rotating medium - Jorge Sotomayor',sigla: "  ",local: "Room [4-001]  ",apresentador:""},
{ inicio: "13:00 ",fim: "- ",descricao: 'Enjoy the BBQ Party ',sigla: "  ",local: "",apresentador:""}

], 
"29": [ 

{ inicio: "8:10 ", fim: "9:00 ", descricao: "Mini-course J. Nuno", sigla: "- ",local: "Auditorium ",apresentador: ""},
{ inicio: "9:00 ", fim: "10:00 ", descricao: "Koszul free divisors and relatives - Luis Narváez Macarro", sigla: "- ",local: "Auditorium",apresentador: ""},
{ inicio: "10:00", fim: "11:00 ", descricao: "Noncommutative Desingularization - A Survey - Ragnar-Olaf Buchweitz", sigla: "- ",local: "Auditorium",apresentador: ""},
{ inicio: "11:00 ",fim: "11:20",descricao: 'Delightful coffee break',sigla: "  ",local: "Open Library's Patio",apresentador:""},
{ inicio: "11:20 ",fim: "12:00",descricao: 'Suﬃciency of jets from the plane to the plane - Hans Brodersen [4-001]; Families of curve congruences on Lorentzian surfaces and pencils of quadratic forms - Ana Claudia Nabarro [4-003]; The Lo jasiewicz exponent of a set of ideals and applications - Carles Bivia [4-005]',sigla: "  ",local: "[4-001], [4-003], [4-005]",apresentador:""},
{ inicio: "12:00 ",fim: "12:20",descricao: 'A Short Exact Sequence for Multiple Point Spaces - Ayse Altintas [4-001]; New Open-Book Decompositions in Singularity Theory - Haydée Aguilar-Cabrera [4-003] ',sigla: "  ",local: "[4-001], [4-003]",apresentador:""},
{ inicio: "12:20 ",fim: "14:00",descricao: 'Lunch',sigla: "  ",local: "",apresentador:""},
{ inicio: "14:00 ",fim: "14:40",descricao: 'On metric embedding of complex algebraic sets - Alexandre Fernandes [4-001]; Bitengencies on Higher Dimensional Immersed Manifolds - Daniel Dreibelbis [4-003]; Vector fields liftable over finitely determined multigerms of corank at most one - Takashi Nishimura [4-005]  ',sigla: "  ",local: "[4-001], [4-003], [4-005]",apresentador:""},
{ inicio: "14:40 ",fim: "15:20",descricao: 'Properties of free divisors of linear type using theory of D-modules - Francisco Calderón [4-001]; Extensions, generalizations and results related to the Four Vertex Theorem - Sueli I R Costa [4-003]; Geometry of the space of treelike shapes - Aasa Feragen [4-005]',sigla: "  ",local: "[4-001], [4-003], [4-005]",apresentador:""},
{ inicio: "15:20 ",fim: "15:40",descricao: 'Poster Session',sigla: "  ",local: "Library's open patio",apresentador:""},
{ inicio: "15:40 ",fim: "16:00",descricao: 'Coffee Break',sigla: "  ",local: "Library's open patio",apresentador:""},
{ inicio: "16:00", fim: "17:00 ", descricao: "Symplectic Singularities - Duco van Straten", sigla: "- ",local: "Auditorium",apresentador: ""},
{ inicio: "17:00", fim: "18:00 ", descricao: "David's Mathematics - Victor V Goryunov ", sigla: "- ",local: "Auditorium",apresentador: ""},
{ inicio: "18:00", fim: "19:30 ", descricao: " ", sigla: "- ",local: "",apresentador: ""},
{ inicio: "19:30 ",fim: "- ",descricao: 'Dinner event party',sigla: "  ",local: "",apresentador:""}

] 


}

} // end of grade 


c.register(grade);