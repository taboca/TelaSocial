
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
	}

	body { 
		border-top:1px solid black;
		background-image: -moz-linear-gradient(+215deg, rgb(132,164,212), #fff, rgb(43,70,90));
		width:1080px;
		height:1920px;
		overflow:hidden;
	}

	#area_topleft { 
		margin-right:1em;
		font-size:30px; 
	
		width:100%;
		color:black;
		font-weight:bold;
		-moz-border-radius:45px 15px; 
		padding:1em;
		background-color:rgba(255,255,255,.5);
	}


	#bg { position:absolute; top:0px; left:0px; z-index:1 ; margin:0; padding:0} 
	#area_background { margin:0; padding:0;  position:absolute;top:0;left:0} 

	#frame { 
		width:1080px;
		position:absolute;
		z-index:1000;
		top:0; left:0;
		padding-left:0em;
		height:1920px;
	} 


	#area_middle { 
		width:1000px;
		height:1100px; 
		overflow:hidden;
	} 
	




]]></>,

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>

<div id='bg'>

<div id='area_background'>
</div>

</div>

<div id="frame">
<div id='area_middle'>

</div>
</div>

		</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
		var cc = 0;

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
