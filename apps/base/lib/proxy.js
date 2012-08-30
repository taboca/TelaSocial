// Something here we need to work with a proxy model 
// We want to intercept functions 

// Something else..
// And probably to be able to keep injecting things in any order

// For example, t8l.config='google'; t8l.addProxy; or t8l.addProxy; t8l.config=google;; The order we add things to t8l won't matter since the init is the key point of startup...

var t8l = { 
    feeds: { 
       Feed: null
    }, 
    init: function (mode) { 
  	if(mode==this.google) { 
		this.mode=this.google;
		document.write('<script src="http://www.google.com/jsapi" type="text/javascript"></script><script> google.load("feeds","1"); google.setOnLoadCallback(t8l.callbackWhenLoaded);</script>');
	} else { 
		this.mode=this.jquery;
		window.addEventListener("load", function () { 
			t8l.callbackWhenLoaded();
		} , false);
	}  
    }, 
    loaded: function (callbackCallAfter) { 
	this.callbackCallAfter = callbackCallAfter;
    },
    callbackWhenLoaded: function () { 
	if(t8l.mode==t8l.google) { 
		t8l.feeds.Feed=google.feeds.Feed;
	} else { 
		t8l.feeds.Feed=t8l_Feed; 
  	}  
	t8l.callbackCallAfter();	
    },
    google:1, jquery:2
} 

var t8l_Feed = function (url) { 
	this.url=url;
	this.dataType='xml';
 	this.setNumEntries = function ( val ) { } 

        this.setResultFormat = function (data) {  
		if(data=='text') { 
			this.dataType="text"; 
		} 
	} ;

	this.load = function ( functionSuccess ) { 
            $.ajax( { type:"GET", url: this.url, dataType: this.dataType, success: function (xml) { 
                  var result = { xmlDocument:xml } 
                  functionSuccess(result);
               }, error: function (xhr, ajaxOptions, thrownError) { 
                  dump(document.location + " error: " + xhr.throwError);
	          var result = { error: { code: xhr.status, message: thrownError } }
                  functionSuccess(result);
            }});
	} 
} 


