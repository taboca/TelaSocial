
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
				var dataLines = data.split('\r\n');
				var cc = 0;
				for(var i=0;i<dataLines.length;i++) { 
					var line = dataLines[i];
					var line2 = dataLines[parseInt(i+1)];
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

					// http://tools.ietf.org/html/rfc5545
					// P15DT5H0M20S is example for 
					// 15 days 5 hours 20 seconds 
					if(line.indexOf('DURATION')>-1) { 
						var dataValue = line.split('DURATION:')[1];
						if(typeof dataValue != 'undefined') { 
							var calcDate = 	new Date(ye,mo,da,ho,mi,00,00);
							var mili = calcDate.getTime();
							var mins = durationToMinutes(dataValue); // in miliseconds
							calcDate.setTime(calcDate.getTime()+(mins*60*1000));
							eye = calcDate.getFullYear();
							emo = calcDate.getMonth()+1;
							eda = calcDate.getDate();
							eho = calcDate.getHours();
							emi = calcDate.getMinutes();
						}
					} 

					if(line.indexOf('SUMMARY')>-1) { 
						var dataValue = line.split('SUMMARY:')[1].toString();
						if(line2) { 
							if(line2.indexOf("TRANSP")==-1) { 
							  dataValue+=line2.substring(1,line2.length);
							} 
						} 	
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
				cc++;
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
			if(ho<0) { 
				ho=24+ho;
				var newD=parseInt(daStr-1);
				daStr=newD;
			} 
	
			eho-=3;
			if(eho<0) { 
				eho=24+eho;
			} 
	

		this.dataOut[daStr].push( { 'inicio': ho+":"+mi, 'fim': eho+':'+emi, 'descricao': sub, 'sigla': "- ",'local': local,'apresentador': ""});
		} catch (i) { } 
	} 
 
}

