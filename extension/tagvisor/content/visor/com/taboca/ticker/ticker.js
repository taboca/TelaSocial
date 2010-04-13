
c = require("choreographer");
timer = require("timer");

var ticker =  {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	start : function () { 

		this.element = this._coreDoc.createElement('div');

		this.element.setAttribute("style","color:yellow;font-size:80px;font-weight:bold;padding:20px;;width:1100px;height:100px;overflow:hidden;");
		this._coreDoc.getElementById(this._getId()).appendChild(this.element);
		this.nodeStr="Esta é a versão piloto do TelaSocial no ICMC. Envie feedback para #telasocial no twitter. ";

		this.prepare();
		this.tick();

	} ,

	prepare : function () { 

		var containerDiv =this._coreDoc.createElement("div");
		containerDiv.style.width="15000px";
		containerDiv.style.height="300px";
		containerDiv.style.position="relative";
		this.tickStr = this._coreDoc.createElement("span");

		this.tickStr.style.position="relative";
		this.tickStr.style.left=1680+"px";
		this.tickStr.innerHTML=this.nodeStr;
		containerDiv.appendChild(this.tickStr);
		this.element.appendChild(containerDiv);
	}, 


	nodeStr : "",

	position : 1680,
	tick : function () {

		this.position-=5;
		this.tickStr.style.left=this.position+"px";	

		if((this.position+this.tickStr.offsetWidth)<0) { 
			this.position=1680;
		} 
		var scopedThis = this;
		timer.setTimeout( function () { scopedThis.tick() }, 50);

	},

	init : function () { 

	} 

}

c.register(ticker);
