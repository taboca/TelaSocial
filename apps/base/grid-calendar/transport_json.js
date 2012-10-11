
var transport =  {

 	timer_init  : 1000,
	timer_loop  : 45000, 
        feed        : null,
        feedURL     : '',
	dataOut     : null, 
	callback    : null, 
	
	setUrl: function (url) { 
		this.feedURL = url; 
	} ,

	start: function (callback) { 
		var self = this;
		this.callback = callback;
               	setTimeout( function () { self.asyncCallData() }, this.timer_init);
	},

	callAgain : function () { 
		var self = this;
               	setTimeout( function () { self.asyncCallData() }, this.timer_loop);
	},

	init : function() {
		this.feed = new t8l.feeds.Feed(this.feedURL);
		this.feed.setResultFormat('text'); // differs from google now
		this.feed.setNumEntries(10);
	},

	asyncCallData: function() {
		var self = this;
		this.feed.load( function (e) { self.__feedUpdated(e) } );
	},

	__feedUpdated : function(result) {
		var self  = this;
		this.dataOut = new Array();
		if(result.error) { }; 
		var text = result.xmlDocument; 
		var objs = $.parseJSON(text);
		for( var k in objs) {
			var fullTime = (objs[k].horario);
			var fullDate = objs[k].data_reserva.split('/'); 
			var ye = parseFloat(fullDate[2]);
			var mo = parseFloat(fullDate[1]);
			var da = parseFloat(fullDate[0]);
			var eye = parseFloat(fullDate[2]);
			var emo = parseFloat(fullDate[1]);
			var eda = parseFloat(fullDate[0]);
			var hours = fullTime.split(' - ');
			var h1 = hours[0].split(':');
			var h2 = hours[1].split(':');
			var ho = h1[0];
			var mi = h1[1];
			var eho = h2[0];
			var emi = h2[1]; 
			var local = objs[k].nome_local;
			var sum = objs[k].evento;
			var user = objs[k].nome_usuario;
			var para = objs[k].para;
			if(!sum) { 
				sum='';
			} 
			
//alert(ye+' - '+ mo +' - ' + da +' - ' + ho  +' - ' + mi  +' - ' +eye +' - ' +emo +' - ' +eda +' - ' +eho +' - ' +emi);
 			this.addEvento(ye,mo,da,ho,mi,'<div class="title">' + sum + '</div><div class="item"><span class="mark">Reservado para: </span>'+para+'</div>',eye,emo,eda,eho,emi, local);
 			//this.addEvento(2012,10,9,14,00,'<div class="title">ddd</div><div class="item"><span class="mark">Reservado por: </span>Marcio</div><div class="item"><span class="mark">Reservado para: </span>marcio</div>',2012,10,9,17,00, 'baleia');
		} 
		this.callback(this.dataOut);
		this.callAgain();
	}
	, 
	addEvento: function (ye,mo,da,ho,mi,sub, eye,emo,eda,eho,emi, local) { 
		var daStr = da+'';
		if(!this.dataOut[daStr]) { 
			this.dataOut[daStr]=new Array();
		} 
		try { 
			ho-=0;
			if(ho<0) { 
				ho=24+ho;
				var newD=parseInt(daStr-1);
				daStr=newD;
			} 
	
			eho-=0;
			if(eho<0) { 
				eho=24+eho;
			} 
	

		this.dataOut[daStr].push( { 'inicio': ho+":"+mi, 'fim': eho+':'+emi, 'descricao': sub, 'sigla': "- ",'local': local,'apresentador': ""});
		} catch (i) { } 
	} 
 
}

