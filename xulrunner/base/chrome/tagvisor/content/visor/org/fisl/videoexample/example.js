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
		this.elementv.setAttribute('style', 'padding-left:0px');
		//this.elementv.setAttribute('src', 'com/taboca/videoexample/formiga.ogg');
		this.elementv.setAttribute('src', '');
		this.element.appendChild(this.elementv);
                this._coreDoc.getElementById(this._getId()).appendChild(this.element);

		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , 2000); 
	} ,

	images: ['org/fisl/videoexample/i1.ogg','org/fisl/videoexample/i2.ogg','org/fisl/videoexample/i3.ogg','org/fisl/videoexample/i4.ogg','org/fisl/videoexample/i5.ogg','org/fisl/videoexample/i6.ogg'], 
	titles: ['Abertura Oficial', 'Enquete ','Fabricio Solagna','josé fortunati',"manuela d'avila","Murilo"], 
	timing: [ 3*60*1000+11000, 2*60*1000+32000, 2*60*1000+44000, 1*60*1000+27000  ], 

	cc:0,
	kick : function () { 

		this.element.innerHTML="<video src='"+this.images[this.cc]+"' width='950' autoplay='true' style='padding-left:0px' />";
		this.cc++;


		if(this.cc>3) { this.cc=0} 
		var thiss = this; 
		t.setTimeout( function () { thiss.kick() } , this.timing[this.cc]); 

	},

	init : function () {


	}

}

c.register(video);
