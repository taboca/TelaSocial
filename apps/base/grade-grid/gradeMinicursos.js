/*

	Axis are fixed 
	We configure size manually

*/
var dias = [10,11,12];
var espacos = ['lab1','lab2','lab3','lab4'];
var titleEspacos = ['Lab 1','Lab 2','Lab 3','Lab 4'];

var horarios = [10,11,12,13,14,15,16,17,18,19];
var titleHorarios = ['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];

var titleLegenda = ['PSPBR','Keynote','COLAPHP','KDE','Geo','Gnome','IWEEE','Mobile','DrupalCamp','LibreOffice','Infraestrutura e Segurança','Computação em Nuvem/Virtualização','Banco de Dados','Debian','Ubuntu','OpenSuse','Python','Distros','Engenharia de Software/Métodos Ágeis','Linguagens/Frameworks','Cases e Modelos de Negócios','Gráficos e Multimídia','Cultura e Sociedade','Educação','Acessibilidade','Robótica','Gestão de Conteúdo/Web','Aplicações Corporativas'];

/* Revisar */

var corLegenda = ['background-color: rgb(255, 255, 153); color: rgb(0, 0, 0)','background-color: rgb(255, 204, 153); color: rgb(0, 0, 0)','background-color: rgb(204, 255, 255); color: rgb(0, 0, 0);','background-color: rgb(255, 204, 51); color: rgb(0, 0, 0)','background-color: rgb(153, 0, 0); color: rgb(255, 255, 255)','background-color: rgb(0, 102, 0); color: rgb(255, 255, 255)','background-color: rgb(153, 153, 153); color: rgb(0, 0, 0);','background-color: rgb(153, 255, 153); color: rgb(0, 0, 0);','background-color: rgb(51, 102, 255); color: rgb(255, 255, 255);','background-color: rgb(0, 51, 0); color: rgb(255, 255, 255);','background-color: rgb(243, 183, 78); color: rgb(0, 0, 0)','background-color: rgb(51, 204, 255); color: rgb(0, 0, 0)','background-color: rgb(255, 255, 204); color: rgb(0, 0, 0)','background-color: rgb(153, 153, 255); color: rgb(255, 255, 255)','background-color: rgb(255, 0, 0); color: rgb(255, 255, 255)','background-color: rgb(102, 51, 102); color: rgb(255, 255, 255)','background-color: rgb(51, 51, 153); color: rgb(255, 255, 255);','background-color: rgb(51, 51, 51); color: rgb(255, 255, 255)','background-color: rgb(102, 51, 51); color: rgb(255, 255, 255)','background-color: rgb(153, 153, 0); color: rgb(255, 255, 255);','background-color: rgb(51, 102, 102); color: rgb(255, 255, 255)','background-color: rgb(102, 0, 204); color: rgb(255, 255, 255)','background-color: rgb(51, 153, 153); color: rgb(255, 255, 255)','background-color: rgb(189, 239, 203); color: rgb(73, 41, 11)','background-color: rgb(241, 209, 91); color: rgb(0, 0, 0)','background-color: rgb(14, 215, 225); color: rgb(0, 0, 0)','background-color: rgb(26, 211, 119); color: rgb(0, 0, 0)','background-color: rgb(114, 108, 36); color: rgb(255, 255, 255);'];

var grade =  {

	descricao : new Array(),
        probeWidth: null, 
	feed: null, 
	feedURL: null,
        probeHeight: null, 
	head : '',
	local : new Array(),
	start : function () { 
		this.feed = $;
		this.feedURL = URL_MINICURSOS;
		this.element = document.createElement('div');
		this.element.setAttribute("class","gradeContainer");
		document.getElementById('container').appendChild(this.element);
		var ddate = new Date();
		dday = ddate.getDate();
/*
		var currentDay = this.evento[dday];
*/
		var strBuffer = "<div class=''>";
		strBuffer += '<div class="drow top">';
		var rows = 0;
		for(var i=-1;i<titleEspacos.length;i++) { 
			if(rows == 0) { 
				strBuffer += '<div class="dh cellLeftRow cellTopColumn" ></div> ';
			} else { 
				strBuffer += '<div class="dh cellTopColumn"><div class="cellTopColumnInner" ><div class="cellTopColumnInnerText"> '+ titleEspacos[i] + '</div></div></div> ';
			} 
			rows++;
		} 
		strBuffer += '</div><div class="grade">'; 
		var rows = 0;
		for ( horario in horarios ) { 


			var nowDate = new Date();
			var horarioAgora = nowDate.getHours();
			var classStr = '';	
			if(parseInt(horarios[horario])<=horarioAgora-1) { 
				classStr="style='display:none'";
			} 
			strBuffer +="<div class='drow'" + classStr +" >";
	
//			strBuffer +="<div class='drow'>";
			var cols=0;
			for ( local in espacos ) { 
				if(cols==0) { 
				    strBuffer+="<div id='' class='dh cellLeftRow' ><div class='cellLeftRowInner'> <div class='cellLeftRowInnerTextOnly'> "+titleHorarios[rows]+"</div></div></div>";
				} 
				var currentItemId="local_"+espacos[local]+"_horario_"+horarios[horario];
				strBuffer+="<div class='dh cellEvent' style='overflow:visible;position:relative'><div id='cellToChange_"+currentItemId+"' class='cellInner'  ><div class='cellInnerText' id='"+currentItemId+"'>&nbsp;</div></div></div>";
			
				cols++;
			} 
			strBuffer += "</div>";
			rows++;
		} 

		strBuffer+="</div></div>";

		this.element.innerHTML += strBuffer;

		this.updateFeed();
		//this.collapseExpand();

//		this.tick();
	} ,

	updateFeed : function() {
		var self =this;
                this.feed.ajax( { dataType: 'json', cache: false, type:"GET", url: this.feedURL, success: function (json) {  self.__feedUpdated(json) }, error: function (a,status) {
			 //alert("from grade" + a + " status " + status) 
			}  });
		setTimeout( function(){self.updateFeed()},10000);
	},

	__feedUpdated : function(json) {
		var self  = this;
		var items = json.data; 
		for( var k in items) { 
			this.eventos.push(items[k]);
		} 
		this.updateEvent();	
	},

	collapseExpand : function ( local, horario) { 
		var rows = 0;
		for ( horario in horarios ) { 
			var cols=0;
			for ( local in espacos ) { 
				//var elm = document.getElementById(strId);
				var currLocal = espacos[local];
				var currHour  = horarios[horario];
				var strId = "local_"+ currLocal +"_horario_"+ currHour;
				if(currLocal == 'paraguai' && currHour == '11') { 
					$("#"+strId).removeClass("cellCollapsed");
					$("#"+strId).addClass("cellExpanded");
				} else { 
					$("#"+strId).addClass("cellCollapsed");
					$("#"+strId).removeClass("cellExpanded");
				}  
				cols++;
			} 
			rows++;
		} 
	} ,

	updateEvent: function () { 
		var eventItem;
		while (eventItem = this.eventos.pop()) { 
			var hours = 0;
			var fim  = 0;
			hours = parseInt(eventItem.inicio.split(":")[0]);
			local = eventItem.local;
			descricao = eventItem.descricao;
			fim  = parseInt(eventItem.fim.split(":")[0]);

			var delta = parseInt(fim)-parseInt(hours);
			try  { 
				var strId = "local_"+ local +"_horario_"+hours;
				var locati = document.getElementById(strId);

				$("#"+strId).addClass("cellActive")

//				$("#cellToChange_"+strId).attr("style","background-color:yellow;height:300px;position:absolute;z-index:1000");

				$("#cellToChange_"+strId).addClass("delta"+delta);
		
				
				locati.innerHTML=eventItem.descricao;
			} catch (i) { 

			} 
		}
	}, 

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
 				document.getElementById("rule_"+hours).style.display="none";	
			} else { 
 				document.getElementById("rule_"+hours).style.fontSize=font+"%";	
				font*=.9;
			}  
			

                }

		var scopedThis = this;
		setTimeout( function () { scopedThis.tick() }, 5000);
	},

	init : function () { 
	} ,

eventos : new Array(), 

/*

{ 
  date: '19/10/2011',
  inicio: "10:00",
  fim: "18:00 ",
  descricao: "PHP in 2011",
  sigla: "keynote", 
  local: "brasil",
  apresentador: "Rasmus Lerdorf"
},

{ 
  date: '19/10/2011',
  inicio: "11:00",
  fim: "12:00 ",
  descricao: "Novas APIs do Drupal 7José San MartinDrupalCamp",
  sigla: "- ", 
  local: "brasil",
  apresentador: ""
},

{ 
  date: '19/10/2011',
  inicio: "11:00",
  fim: "12:00 ",
  descricao: "O Software Público Brasileiro como agente de mudança no modelo de desenvolvimento de softwaresSeyr Lemos de Souza",
  sigla: "- ", 
  local: "paraguai",
  apresentador: ""
},

] 

*/

} // end of grade 


