var tempoWidget =  {
	feed: null, 
	elementClock  : null, 
        mos: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
	start : function () { 
		var mainDiv = document.createElement('div');
		document.body.appendChild(mainDiv);
		this.elementClock   = document.createElement('div');
		this.elementClock.setAttribute("id","clock");
		mainDiv.appendChild(this.elementClock);
		this.feed = $;
		var self = this;
		this.tick();

	} ,

	updateFeed : function() {
		var self = this;
	},

	__feedUpdated : function(xml) {

		var self  = this; 
		var content = self.feed(xml).find('description').text();
		setTimeout( function(){self.updateFeed()},  1000);
	},
	tick : function () {
		this.data = new Date();
		//var text = this.data.toLocaleTimeString();
		//var text = this.data.toTimeString();
		var hour = this.data.getHours();
		var min = this.data.getMinutes();
		var secs = this.data.getSeconds();
		var prefix = "";
		var prefixmin = "";
		if(secs<=9) { 
			prefix = "0";
		} 
		if(min<=9) { 
			prefixmin = "0";
		} 

		//text = text.replace(/:..( [AP]M)$/, '$1');
		this.elementClock.innerHTML = hour+":"+prefixmin+min+":"+prefix+secs;
		var scopedThis = this;
		setTimeout( function () { scopedThis.tick() }, 1000);

		var ddd = new Date();
		var yy = ddd.getFullYear();
		var dd = ddd.getDate();
		var mm = this.mos[ddd.getMonth()];

	}
}

