
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

this.descricao["22"] = "Recepção de Calouros 2010 - ICMC-USP";
this.local["22"] = "Fevereiro, 22, 2010 &mdash; ICMC ";
this.descricao["23"] = "Recepção de Calouros 2010 - ICMC-USP";
this.local["23"] = "Fevereiro, 23, 2010 &mdash; ICMC";
this.descricao["24"] = "Recepção de Calouros 2010 - ICMC-USP";
this.local["24"] = "Fevereiro, 24, 2010 &mdash; ICMC";
this.descricao["25"] = "Recepção de Calouros 2010 - ICMC-USP";
this.local["25"] = "Fevereiro, 25, 2010 &mdash; ICMC";
this.descricao["26"] = "Recepção de Calouros 2010 - ICMC-USP";
this.local["26"] = "Fevereiro, 26, 2010 &mdash; ICMC";

	} ,

evento : { 

"22": [ 

{ inicio: "08:00 ", fim: "08:30 ", descricao: "", sigla: "- ",local: "ICMC/USP ",apresentador: "Maldonado"},
{ inicio: "10:00 ", fim: "10:30 ", descricao: "Recepção oficial", sigla: "- ",local: "Salão de eventos ICMC/USP ",apresentador: ""},
{ inicio: "10:30 ", fim: "11:00 ", descricao: "PALESTRA SACIM", sigla: "- ",local: "Salão de eventos ICMC/USP ",apresentador: ""},
{ inicio: "11:00 ", fim: "11:45 ", descricao: "Reunião com os pais", sigla: "- ",local: "",apresentador: ""},
{ inicio: "11:45 ", fim: "13:00 ", descricao: "Brunch (pais e docentes)", sigla: "- ",local: "",apresentador: ""},
{ inicio: "13:00 ", fim: "14:00 ", descricao: "Almoço alunos", sigla: "- ",local: "",apresentador: ""},
{ inicio: "19:30 ", fim: "20:00 ", descricao: "Recepção oficial", sigla: "- ",local: "Auditório ICMC/USP",apresentador: ""},
{ inicio: "20:00 ",fim: "- ",descricao: 'Palestra Prof. Sylvio Goulart Rosa “O Calouro, o empreendedor e o empresário”',sigla: "  ",local: " Auditório ICMC ",apresentador:""}

],

"23": [
{ inicio: "09:30 ", fim: "10:30 ", descricao: "Dinâmica Sueli Arlete", sigla: "- ",local: "ICMC/USP ",apresentador: ""},
{ inicio: "10:30 ", fim: "11:30 ", descricao: "AULA INAUGURAL Prof. Luiz Barco", sigla: "- ",local: "Auditório ICMC/USP ",apresentador: ""},
{ inicio: "19:00 ", fim: "20:00 ", descricao: "Dinâmica Sueli Arlete", sigla: "- ",local: "ICMC/USP ",apresentador: ""},
{ inicio: "20:00 ",fim: "- ",descricao: "Apresentação Artística Eduardo Coutinho",sigla: "  ",local: "Auditório ICMC/USP  ",apresentador:""}

],

"24" : [ 
{ inicio: "09:30 ", fim: "10:00 ", descricao: "Palestra Institucional Prof. José Alberto Cuminato", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "10:00 ", fim: "10:30 ", descricao: "Palestras: PET, ICMC Jr", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "10:30 ", fim: "11:00 ", descricao: "Apresentação Laboratórios - Luiz Carlos Dotta", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "11:00 ", fim: "11:30 ", descricao: "Apresentação Biblioteca - Glaucia Cristianini", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "12:00 ", fim: "14:00 ", descricao: "Apresentação Musical Banda Sigla", sigla: "- ",local: "Redondo ICMC/USP ",apresentador: ""},
{ inicio: "19:00 ", fim: "- ", descricao: "Palestra Institucional Prof. José Alberto Cuminato", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""}

], 

"25" : [

{ inicio: "19:00 ", fim: "19:30 ", descricao: "Apresentação Laboratórios - Luiz Carlos Dotta", sigla: "- ",local: "L ocal: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "19:30 ", fim: "- ", descricao: "Apresentação Biblioteca - Glaucia Cristianini", sigla: "- ",local: "L ocal: Auditório ICMC/USP ",apresentador: ""}

],

"26" : [

{ inicio: "09:30 ", fim: "10:00 ", descricao: "Palestra USP Recicla e entrega de canecas", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "10:00 ", fim: "10:30 ", descricao: "Palestras sobre Serviço Médico  e Serviço Social", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "10:30 ", fim: "11:00 ", descricao: "Pesquisa Ciêntífica, Cultura e Extensão", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "11:00 ", fim: "11:45 ", descricao: "CCInt Prof. Paulo Afonso Faria da Veiga", sigla: "- ",local: "Local: Auditório ICMC/USP ",apresentador: ""},
{ inicio: "14:00 ", fim: "- ", descricao: "Plantio da Árvore da Turma", sigla: "- ",local: "Campus 2 USP ",apresentador: ""}

]

}

} // end of grade 


c.register(grade);
