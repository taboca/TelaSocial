
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

/*
	setOutput: function (dataOut) { 
		this.dataOut = dataOut; 
	}, 
*/
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
		var items = text.split('BEGIN:VEVENT');
		for( var k in items) {
			var data = items[k]; 
			if(data.indexOf('DTSTART')>-1) { 
				var valid = false; 
				var ye,mo,da,ho,mi; 
				var eye,emo,eda,eho,emi; 
				var sum = '';
				var dataLines = data.split('\n');
				for(var i in dataLines) { 
					var line = dataLines[i];
					if(line.indexOf('DTSTART')>-1) { 
						var dataValue = line.split('DTSTART:')[1];
						if(typeof dataValue != 'undefined') { 
							ye = dataValue.substring(0,4);
							mo = dataValue.substring(4,6);
							da = dataValue.substring(6,8);
							ho = dataValue.substring(9,11);
							mi = dataValue.substring(11,13);
							valid=true;
						}
					} 
					if(line.indexOf('DTEND')>-1) { 
						var dataValue = line.split('DTEND:')[1];
						if(typeof dataValue != 'undefined') { 
							eye = dataValue.substring(0,4);
							emo = dataValue.substring(4,6);
							eda = dataValue.substring(6,8);
							eho = dataValue.substring(9,11);
							emi = dataValue.substring(11,13);
						}
					} 

					if(line.indexOf('SUMMARY')>-1) { 
						var dataValue = line.split('SUMMARY:')[1];
						sum = dataValue;
					} 

					if(line.indexOf('LOCATION')>-1) { 
						var dataValue = line.split('LOCATION:')[1];
						local = dataValue;
					} 

				} 
				if(valid) { 
			 		this.addEvento(ye,mo,da,ho,mi,sum,eye,emo,eda,eho,emi, local);
				} 
			} 

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
			ho-=3;
			eho-=3;
			this.dataOut[daStr].push( { 'inicio': ho+":"+mi, 'fim': eho+':'+emi, 'descricao': sub, 'sigla': "- ",'local': local,'apresentador': ""});
		} catch (i) { alert(i) } 
	} 
 
}

