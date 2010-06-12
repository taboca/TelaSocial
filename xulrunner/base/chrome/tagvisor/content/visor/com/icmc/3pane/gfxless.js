
c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

	html { padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif } 

	body {
		background-color:rgb(253,181,37); margin:0; padding:0;
	}

	table {
		width:100%;
		margin:0;
		z-index:1000;
		position:absolute;
	}

	table td {
		border:10px solid black;
	}

	.panel {
	}

	.tab {
                font-size:20px;
		width:620px;
                font-weight:bold;
        }

	#area_panel1 { 
		-moz-background-size: 100% 100%; 
		background-image:url(http://a1.twimg.com/profile_background_images/43617138/fotobiblio2.JPG);
	} 

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_bottomright { 
		text-align:center;
		background-color:rgb(70,70,70);	
	} 

        .cor_orange { background-color:rgb(253,181,37);; }
        .cor_lightblue  { background-color:rgb(100,197,210); }
        .cor_tab3   {
		background-color:rgb(14,148,171);	
	}


        .transp { background-color:transparent; }

        #pointer {
                width:45px;
                -moz-border-radius:25px;
                height:45px;
                background-color:black;
                z-index:1;
                position:absolute;
                top:44px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		padding:0;
	}

	.panel { 
		display:none;
		height:700px;
		overflow:hidden;
	} 

	@font-face {     
		font-family: Kaffeesatz;
		src: url(com/icmc/3pane/YanoneKaffeesatz-Regular.otf) format("opentype");
		font-weight:bold;
	}


@font-face {
	font-family: Vollkorn;
	src: url(com/icmc/3pane/vollkorn.otf) format("opentype");

}

	#area_bottom {
                height:230px;
                background-color:rgb(30,30,30);
    		font-family:Kaffeesatz,Verdana, Arial, Helvetica, sans-serif;
		color:white;
		font-weight:bold;
        }


]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=5;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 1260 && this.movepos < 1950 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_orange";
                        this._coreDoc.getElementById("tab2").className="cor_lightblue";
                        this._coreDoc.getElementById("tab3").className="transp";
			this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
                        this._coreDoc.getElementById("tab1").className="cor_orange";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_lightblue";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 1950 ) { 

			this.movepos = 0

		} 
        },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<div id="frame">
<div id='pointer'>
</div>
<table cellpadding="10" cellspacing="0" height="100%">
<tr style="height:50px">
<td class='cor_orange' id='tab1'>
<div class='tab'>
Telão ICMC - v 0.3
</div>
</td>
<td class='cor_lightblue' id='tab2'>
<div class='tab'>
Palestras ICMC
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
#bloco1icmc (twitter)
</div>
</td>
</tr>
<tr>
<td colspan="3" >
<div class="panel" id='area_panel1'>
<h2>Version 0.3 - June </h2>
<ul>
<li>Estamos coletando todos os departamentos internos que utilizam canais de comunicação baseados em padrões abertos - informe Neylor@icmc...</li>
<li>Imagem da Semana - espaço aberto de arte inspirado no caso de amostras de arte na biblioteca</li>
<li>Calendário de Palestras v 2 - em Junho</li>

<li>Novos módulos: Evento do Dia</li>
<li>Novos módulos: Rotatividade dos Canais de notícias ( abaixo  )</li>
<li>Novos módulos: Relógio com Tempo</li>

</ul>


</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
</td>
</tr>
<tr>
<td colspan='2' id='area_bottom' valign='top' style='background: rgb(30,30,30) url(/com/icmc/3pane/usp-logo/trademark.jpg) 0 0 no-epeat;margin-left:120px;'>
</td>
<td id='area_bottomright' valign="middle">
</td>

</tr>
</table>

</div>

</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);

	} ,

	init : function () {
	try { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
