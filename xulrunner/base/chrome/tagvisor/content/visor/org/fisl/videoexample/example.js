c = require("choreographer");
t = require("timer");
var  video  = {

  name   : __appName,
        target : __targetName,
        targetId : __targetId,
  	_coreDoc: null, 

	element:null,

	start : function () { 

		this.element = this._coreDoc.createElement("div");

		this.elementv = this._coreDoc.createElement('video');
		this.elementv.setAttribute('width', '1000');
		//this.elementv.setAttribute('height', '360');
		this.elementv.setAttribute('autoplay', 'true');
		this.elementv.setAttribute('style', 'padding-left:50px');
		//this.elementv.setAttribute('src', 'com/taboca/videoexample/formiga.ogg');
		this.elementv.setAttribute('src', 'http://stream.softwarelivre.org/sites/default/files/videos/fisl1-27-ead.ogg');
		this.element.appendChild(this.elementv);
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 30000); 
	} ,

	images: ['http://stream.softwarelivre.org/sites/default/files/videos/fisl5-41D-27-O%20Gimp%20para%20Mentes%20Criativas.ogg','http://stream.softwarelivre.org/sites/default/files/videos/fisl10-26-Tor%20and%20GNUNet.ogg','http://stream.softwarelivre.org/sites/default/files/videos/06-Stallman+Sunde-web.ogg'], 

	kick : function () { 

		this.element.innerHTML="<video src='"+this.images[parseInt(Math.random()*2)]+"' width='1000' autoplay='true' style='padding-left:0px' />";

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 60000); 

	},

	init : function () {


	}

}

c.register(video);
