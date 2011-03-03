
c = require("choreographer");
timer = require("timer");

var gfx =  {

	name   : __appName,
        target : __targetName,
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
		background-image: -moz-linear-gradient(-45deg, rgba(0,50,155,.3) , #400);
		background: none 0 0 repeat-no;
		
		width:1920px;
		height:1080px;
		overflow:hidden;
	}

	.topright { 
		font-size:40px;
		color:white;
		text-shadow: black 0 0 10px; 
	} 

	#frame { 
		width:1920px;
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
*/

	.orange { 
		background-image: -moz-linear-gradient(-60deg, #ddd, #fff, #eee);
		height:500px;
		padding:.5em;
		width:1100px;
		-moz-box-shadow: white 0 0 65px; 
		margin-right:.5em;
		font-size:50px;
		font-weight:bold;
		-moz-border-radius:55px 95px;
		-moz-border-radius-topleft:0;
		-moz-border-radius-bottomleft:0;
		overflow:hidden;

	} 

  .orange2 {
                height:500px;
                padding:.5em;
                width:690px;
                margin-right:1em;
                font-size:30px;
                font-weight:bold;
                -moz-border-radius:55px 95px;
		overflow:hidden;
		-moz-border-radius-topright:0px; 
		-moz-border-radius-bottomleft:35px; 
		-moz-border-radius-bottomright:0px; 
		padding-left:.5em;

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
		text-shadow: black 0 0 10px; 
		font-size:60px;
	} 
]]></>,

	start : function () { 

		var importedElement = this._coreDoc.createElement("div");

		importedElement.innerHTML =  <>


<div id='frame'>

<div class='tab' style='margin-top:1em'>

<table>
<tr>
<td>
<div id='bottom'>
</div>
</td>
<td align="right">
<div  id='topleft'>
</div>
</td>
</tr>

<tr>
<td>
<div class='tab orange' style='margin-top:0em; '  id='middle'>
</div>
</td>
<td>
<div class='tab orange2' style='margin-top:0em;' id='toparea'>
</div>
</td>
</tr>

<tr>
<td valign="top">
<div id='footer'>
</div>
</td>
<td style='' valign="top">
<div id='footer2' style='padding-right:1em'>
</div>
</td>
</tr>

</table>



</div>
</div>

		</>;

		this._coreDoc.getElementById(this._getId()).appendChild(importedElement);
		var cc = 0;
		for ( key in this._childList ) { 
			if (cc==0) { 
				this._childList[key] = "topleft"
			} 
			if (cc==1) { 
				this._childList[key] = "middle"
			} 
			if (cc==2) { 
				this._childList[key] = "toparea"; 
			} 
			if (cc==3) { 
				this._childList[key] = "bottom"; 
			} 
			if (cc==4) { 
				this._childList[key] = "footer"; 
			} 
			if (cc==5) { 
				this._childList[key] = "footer2"; 
			} 
			cc++;
		} 

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
