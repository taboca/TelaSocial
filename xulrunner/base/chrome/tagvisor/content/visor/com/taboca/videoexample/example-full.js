
c = require("choreographer");
t = require("timer");

var  video  = {

	name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	start : function () { 

		this.element = this._coreDoc.createElement("div");

		this.elementv = this._coreDoc.createElement('video');
		this.elementv.setAttribute('width', '1080');
		this.elementv.setAttribute('height', '1920');
		this.elementv.setAttribute('autoplay', 'true');
		this.elementv.setAttribute('src', 'http://www.telasocial.com/purple.theora.ogv');
		this.element.appendChild(this.elementv);
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 30000); 
	} ,

	kick : function () { 

		this.element.innerHTML="<video src='http://www.telasocial.com/purple.theora.ogv' width='1080' height='1920' autoplay='true' style='padding-left:0px' />";

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 30000); 

	},

	init : function () {


	}

}

c.register(video);
