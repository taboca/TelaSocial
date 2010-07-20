c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[

	html {
		padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif

	} 

	body {
		background: rgb(98,176,222) url(org/fisl/brand/bg.png);
		padding:0; margin:0;
	}

	table {
		width:1920px;
	}

	.panel {
	}
	.tab {
                font-size:20px;
		width:620px;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}

	#area_bottomright { 
		height:750px; 
		width:820px;
		overflow:hidden;
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
                top:880px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		width:1920px;
		height:1080px;
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
    		font-family:Kaffeesatz,Verdana, Arial, Helvetica, sans-serif;
		color:white;
		font-weight:bold;
		padding-top:30px;
		
        }
	video { 
		-moz-box-shadow: 15px 15px 15px rgba(0,0,0,.5);
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
			//this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 630 && this.movepos < 1260) { 
                        this._coreDoc.getElementById("tab1").className="cor_orange";
                        this._coreDoc.getElementById("tab2").className="transp";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 630) { 
                        this._coreDoc.getElementById("tab1").className="transp";
                        this._coreDoc.getElementById("tab2").className="cor_lightblue";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
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
<table cellpadding="0" >
<tr>
<td id='area_bottom' valign='top' align="left">
</td>
<td valign="top" align='center'>
<div id='area_bottomright' >
<img src="org/fisl/brand/fisl-banner-fisl.png" />
<img src="org/fisl/brand/fisl-banner-logo.png" />
</div>
</td>
</tr>
</table>
<table width="100%">
<tr style="height:50px">
<td class='cor_orange' id='tab1'>
<div class='tab'>
Atualizações Tela
</div>
</td>
<td class='cor_lightblue' id='tab2'>
<div class='tab'>
Palestras
</div>
</td>
<td class='cor_tab3' id='tab3'>
<div class='tab'>
Comunicados FISL
</div>
</td>
</tr>
<tr>
<td colspan="3" >
<div class="panel" id='area_panel1'>
Atualizações Tela ( este painel vai sumir em breve ) 
<ul>
<li>Layout novo tipo Abas - feedback via #bloco1icmc ou mgalli em taboca ponto com </li>
<li>Linha do tempo nas Abas - ponteiro acima para passar percepção das mudanças e saber qdo vem o próximo painel</li>
<li>Módulo-widget ( typing): Painel fixo com notícias - abaixo com RSS Usp.br. Em breve com multiplexador de RSS ( noticias de várias fontes )</li>
<li>Aba de Eventos - com datas - irá mudar para uma visão ~ calendário</li>
<li>Outros: Cores USP</li>
<li>Outros: Relógio foi pro canto</li>
<li>Feedback? blog.telasocial.com ou mgalli em taboca ponto com ou #bloco1icmc</li>
<li>Ideias?: Módulo-widget do bandejão? .. #bloco1icmc</li>
</ul>

</div>
<div class="panel" id='area_panel2'>
</div>
<div class="panel" id='area_panel3'>
</div>
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
