c = require("choreographer");
t = require("timer");

var gfx =  {

        name   : __appName,
        target : __targetName,
        targetId : __targetId,
        _coreDoc: null,

	style : <><![CDATA[


        .shadow .c {
                -moz-box-shadow: white 0px 0px 20px;
        }

        .e {
                background-color:white;
                padding:1em;
                width:300px;
                position:absolute;
                height:300px;
        }
        .c {
                background-color:white;
                -moz-border-radius:325px;
                padding:1em;
                width:300px;
                position:absolute;
                height:300px;
        }


	html { padding:0; margin:0; overflow:hidden; font-family: verdana, arial, sans-serif } 
	body {
		background: rgb(98,176,222);
		background: url(org/fisl/layout-projector/bg.png) 0 0 repeat;;
		padding:0; margin:0;
	}

	.clouds { 
		position:absolute;
		z-index:200;
		width:1024px;
		height:768px; 
		overflow:hidden;
	} 
	table.container {
		width:1024px;
		top:0px;
		position:absolute;
		z-index:100;
	}

	table.container2 { 
		position:absolute;
		top:350px;
		z-index:900;
	} 

	.panel {
	}
	.tab {
                font-size:20px;
		width:341px;
                font-weight:bold;
        }

	#tab1, #tab2, #tab3 { 
		z-index:1000;
	}


        .cor_tab1 { 
		border:0px;
		border-bottom: 1px solid gray;
	}
		
        .cor_tab2 {
		border:0px;
		border-bottom: 1px solid gray;
	}
        .cor_tab3 {
		border:0px;
		border-bottom: 1px solid gray;

	}

	.cor_active { 
		border:1px solid gray;
		padding-left:10px;
		border-bottom:0px;
		background: -moz-linear-gradient(top bottom, yellow, rgba(255,255,0,0));
		text-shadow: 1px 1px 2px yellow, 0 0 1em yellow, 0 0 0.2em yellow;
	} 



        .transp { background-color:transparent; }

        #pointer {
                width:100px;
                -moz-border-radius:100px;
                height:100px;
                background-color:yellow;
		-moz-box-shadow: white 0 0 95px,yellow 0 0 75px,yellow 0 0 25px;
                z-index:150;
                position:absolute;
                top:230px;
                left:0px;
        }

	#frame { 
	 	margin:0;
		width:1024px;
		height:768px;
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

	#area_topright { 
		height:300px;
		z-index:280;
		overflow:hidden;
	} 

	#area_topleft {
		width:850px;
        }

	video { 
		-moz-box-shadow: 15px 15px 15px rgba(0,0,0,.5);
	} 

]]></>,


        movepos : 0,
        moveleft: true,
	
        kick: function () {
		this.movepos+=1;
                this._coreDoc.getElementById("pointer").style.left=this.movepos+"px";
		if(this.movepos > 682 && this.movepos < 1024 ) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_active";
			//this._coreDoc.body.style.backgroundColor="rgb(14,148,171)";
                        this._coreDoc.getElementById("area_panel3").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
		} 
		if(this.movepos > 341 && this.movepos < 682) { 
                        this._coreDoc.getElementById("tab1").className="cor_tab1";
                        this._coreDoc.getElementById("tab2").className="cor_active";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(100,197,210)";
                        this._coreDoc.getElementById("area_panel2").style.display="block";
                        this._coreDoc.getElementById("area_panel1").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 0  && this.movepos < 341) { 
                        this._coreDoc.getElementById("tab1").className="cor_active";
                        this._coreDoc.getElementById("tab2").className="cor_tab2";
                        this._coreDoc.getElementById("tab3").className="cor_tab3";
			//this._coreDoc.body.style.backgroundColor="rgb(253,181,37)";
                        this._coreDoc.getElementById("area_panel1").style.display="block";
                        this._coreDoc.getElementById("area_panel2").style.display="none";
                        this._coreDoc.getElementById("area_panel3").style.display="none";
		} 
		if(this.movepos > 1024 ) { 
			this.movepos = 0;
		} 
        },

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>


<div class='clouds'>
<div class="shadow">
<div class='c' style='top:260px;left:-50px;'> </div>
<div class='c' style='top:210px;left:120px;'> </div>
<div class='c' style='top:240px;left:330px;'> </div>
<div class='c' style='top:290px;left:550px;'> </div>
<div class='c' style='top:390px;left:750px;width:400px;height:400px'> </div>
</div>
<div>
<div class='c' style='top:260px;left:-50px;'> </div>
<div class='c' style='top:210px;left:120px;'> </div>
<div class='c' style='top:240px;left:330px;'> </div>
<div class='c' style='top:290px;left:550px;'> </div>
<div class='c' style='top:290px;left:750px;width:400px;height:400px'> </div>
</div>
<div class='e' style='top:390px;left:0px;width:1100px;height:400px'> </div>
</div>




<div id="frame">
<div id='pointer'>
</div>
<table cellpadding="0" class='container'>
<tr>
<td id='area_topleft' valign='top' align="left">
<img src="org/fisl/layout-tv/fisl-banner-logo.png" height="220" />
<img src="org/fisl/layout-tv/fisl-banner-fisl.png" height="220" />
</td>
<td valign="top" align='left'>
<div id='area_topright' >
</div>
</td>
</tr>
</table>
<table width="100%" class='container2'>
<tr style="height:50px">
<td class='cor_tab1' id='tab1'>
<div class='tab'>
Atualizações Tela
</div>
</td>
<td class='cor_tab2' id='tab2'>
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
