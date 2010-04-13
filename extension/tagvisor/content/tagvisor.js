
if(!com) var com={};
if(!com.taboca) com.taboca={};
if(!com.taboca.tagvisor) com.taboca.tagvisor={};

addEventListener("load", function () { com.taboca.tagvisor.prestart_services() } , false);
addEventListener("unload", function () { com.taboca.tagvisor.kill_services() } , false);

com.taboca.tagvisor = { 

  visor  : null, 
  makeURI: function(stringURI) {
      var ios = Components.classes["@mozilla.org/network/io-service;1"].getService(Components.interfaces.nsIIOService);
      return ios.newURI(stringURI, null, null);
  },

  widgetKill: function (name) { 
	appWin = gBrowser.getBrowserForTab(this.visor).contentWindow;
	appWin.wrappedJSObject.com.taboca.upvisor.widgetKill(name);
  },
  widgetToVisor: function (widgetObjectRef) { 

	appWin = gBrowser.getBrowserForTab(this.visor).contentWindow;
	appWin.wrappedJSObject.com.taboca.upvisor.matchRegistration(widgetObjectRef, widgetObjectRef.name, widgetObjectRef.target, widgetObjectRef.targetId);

  },
  ////
  /// Properties
  //
  started: false, 

  ////
  /// services
  //
  obsSvc: Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService),
  prefService: Components.classes["@mozilla.org/preferences-service;1"].getService(Components.interfaces.nsIPrefBranch),

  kill_services: function () { 
  }, 

  prestart_services: function () { 
	var tt = this; 
	this.checkStartRestore();
	setTimeout( function () { tt.checkStartDelayed(); }, 5000); 
  },
	
  checkStartDelayed: function () { 
	com.taboca.tagvisor.start()
  },
  checkStartRestore: function () {
       sessionRestoreObserve =  {
               observe: function(subject, topic, data) {
               try {
                      com.taboca.tagvisor.start()
               }
               catch(e) { this.dumpConsole(" session store done failed? " )}
               }
       };
       this.obsSvc.addObserver( sessionRestoreObserve,  "sessionstore-windows-restored" , false);
  },

  start: function () { 
    if(!this.started) { 
	this.started = true; 
        var auto = this.prefService.getBoolPref("extensions.tagvisor.auto");
	if(auto) { 
	  var self = this; 	
          setTimeout( function () { self.play();  } ,5000);
	} 
     } 
  },
  play: function () { 
	this.setFullScreen();
  },


  setFullScreen: function () { 

	if(!window.fullScreen) { 
	  window.fullScreen = true;
	} 

//gBrowser.removeCurrentTab();
       document.getElementById('nav-bar').collapsed=true;
       document.getElementById('status-bar').collapsed=true;
       document.getElementById('personal-bookmarks').collapsed=true;

	window.resizeTo(screen.width - 1, screen.height);

	this.openVisor();

   },

   openVisor: function () { 
	try { 
	this.visor = gBrowser.addTab("chrome://tagvisor/content/visor/index.html");
	gBrowser.selectedTab = this.visor;
       gBrowser.setStripVisibilityTo(false);
	} catch (i) { alert(i) } 
   },

   dumpConsole: function(aMessage) {
     try {
       var psvc = Components.classes["@mozilla.org/preferences-service;1"]
                            .getService(Components.interfaces.nsIPrefBranch);
       var cs = Components.classes["@mozilla.org/consoleservice;1"]
                            .getService(Components.interfaces.nsIConsoleService);
       cs.logStringMessage("TagVisor: " + aMessage);
     } catch (i) {}
   },

   dumpConsole: function () {

   },

}; // end of com taboca tagvisor

com.taboca.tagvisor.observerService = Components.classes["@mozilla.org/observer-service;1"].getService(Components.interfaces.nsIObserverService);
com.taboca.tagvisor.observerService.addObserver(com.taboca.tagvisor.httpscanner,"http-on-examine-response",false);


