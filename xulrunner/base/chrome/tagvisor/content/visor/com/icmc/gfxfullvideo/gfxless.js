
c = require("choreographer");
timer = require("timer");

var gfx =  {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	style : <><![CDATA[

	table { margin:0; padding:0 } 
	html * { margin:0 } 
	html { 
		margin:0; padding:0; 
		font-family: verdana; 
		-moz-background-size: 1920px 1080px;
	}

/*
		background: url(http://farm5.static.flickr.com/4061/4382819072_e53dbe3bf1_b.jpg) 0 0 no-repeat;
*/

	body { 
		border-top:1px solid black;
		background-image: -moz-linear-gradient(+215deg, rgb(132,164,212), #fff, rgb(43,70,90));
		background: url(http://www.icmc.usp.br/img/generico.gif) 0 0 repeat;

		
		width:1920px;
		height:1080px;
		overflow:hidden;
	}

	#area_topleft { 
		margin-right:1em;
		font-size:30px; 
	
		width:100%;
		width:1200px;	
		color:black;
		font-weight:bold;
		-moz-border-radius:45px 15px; 
		padding:1em;
		background-color:rgba(255,255,255,.5);
	}

	.topright { 
		font-size:40px;
		color:white;
	} 

	#bg { position:absolute; top:0px; left:0px; z-index:1 ; margin:0; padding:0} 
	#area_background { margin:0; padding:0;  position:absolute;top:0;left:0} 

	#frame { 
		width:1920px;
		position:absolute;
		z-index:1000;
		top:0; left:0;
		padding-left:0em;
		height:1080px;
	} 

	.tab { 
		position:relative;
		color:black;
		font-size:30px;
	} 

/*
		padding:1em;
*/

	.tab-tab { 
		position:absolute;
		background-color:#ddd;		
		top:-60px;
		padding:15px;
		padding-left:40px;
		font-size:60px;
		color:white;
		width:700px;
		right:0px;
	} 

/*
		-moz-border-radius:35px 35px 0 0; 
		background-color:rgb(132,164,212);
		background-image: -moz-linear-gradient(-60deg, #ddd, #fff, #eee);
*/

	.orange { 
		
		-moz-border-radius:40px; 
		background-color:rgba(255,255,255,0.3);
		height:900px;
		padding:.5em;
		margin-right:.5em;
                font-size:30px;
		font-weight:bold;
		overflow:hidden;

	} 

	.orange2 {
		-moz-border-radius:40px; 
		background-color:rgba(255,255,255,0.3);
                height:900px;
                padding:.5em;
                margin-right:1em;
                font-size:30px;
                font-weight:bold;
		overflow:hidden;
        }


	.green { 
		background-image: -moz-linear-gradient(-60deg, #030,  #070, #000);
		background-image: -moz-linear-gradient(-60deg, #003,  #007, #000);
		font-size:30px;
		padding:1em;
		-moz-border-radius-bottomleft: 0;
		font-weight:bold;
		height:200px;
		color:white;
	} 
 	.green a { color:gray } 

	h1 { 
		font-weight:bold;
		font-size:60px;
	} 
]]></>,

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>


<div id='bg'>

<div id='area_background'>
</div>

</div>
<div id='frame'>

<div class='tab' style='margin-top:1em'>

<table>
<tr>
<td valign='top' colspan='2'>
<div id='area_topleft'>
Feedback: tela-icmc-ideias@taboca.com
</div>
</td>
<td align="right">
<div  id='area_topright'>
</div>
</td>
</tr>

<tr>
<td valign='top'>
<div class='tab orange'>
<h2>Eventos @ ICMC</h2>
<p>www.icmc.usp.br (RSS!)</p>
<div id='area_midleft'>
</div>
</div>
</td>
<td valign='top'>
<div class='tab orange'>
<div id='area_midleft2'>
</div>
</div>
</td>
<td valign='top'>
<div class='tab orange'>
<div class='tab orange2'  id='area_midright'>
</div>
</div>
</td>
</tr>

<tr>
<td valign="top" colspan="3">
<div id='area_bottomleft'>
</div>
</td>
</tr>

</table>


<div id='bottom'>
</div>

</div>
</div>

		</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
		var cc = 0;
		/*
		for ( key in this._childList ) { 
			if (cc==0) { 
				this._childList[key] = "area_background"
			} 
			if (cc==1) { 
				this._childList[key] = "area_topright"
			} 
			if (cc==2) { 
				this._childList[key] = "area_midleft"; 
			} 
			if (cc==3) { 
				this._childList[key] = "area_midright"; 
			} 
			if (cc==4) { 
				this._childList[key] = "area_bottomleft"; 
			} 
			if (cc==5) { 
				this._childList[key] = "area_bottomright"; 
			} 
			cc++;
		} 
		*/

		this.tick();	

	} ,

	tick: function () { 

		var ddate = new Date();
                dday = ddate.getHours();

                var r = parseInt(((255/23)*dday)/3);
                var g = 255 - (parseInt((255/23)*dday));
                var b = 255 - (parseInt((255/23)*dday));
                //this._coreDoc.body.style.backgroundColor="rgb("+r+","+g+","+b+")";

		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() } , 2000);

	}, 

	init : function () {
	try { 
	 	var style = this._coreDoc.createElementNS("http://www.w3.org/1999/xhtml", "style");
		this._coreDoc.getElementById("headtarget").appendChild(style);
		style.innerHTML=this.style; 
		//style.innerHTML="html { background-color:black } ";
		console.log(this._coreDoc);
	
	} catch(i) { console.log(i) } 

	}

}

c.register(gfx);
