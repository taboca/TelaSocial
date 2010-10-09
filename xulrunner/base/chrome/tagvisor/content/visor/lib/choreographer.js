var windowsMediator = Cc["@mozilla.org/appshell/window-mediator;1"];

var choreographer = exports.getWindow =function getWindow() { 
	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
 	return mediator.getMostRecentWindow("navigator:browser");
} 


// We dont need to loop through the actual extension 
var register = exports.register = function registerWidget(refObject) { 

	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
	var mainWin = mediator.getMostRecentWindow("navigator:browser");
	//mainWin.com.taboca.tagvisor.widgetToVisor(refObject); 
        var appWin = mainWin.gBrowserContentWindow;
        appWin.wrappedJSObject.com.taboca.upvisor.matchRegistration(refObject, refObject.name, refObject.target, refObject.targetId);

 
} 

var kill = exports.kill = function killWidget(refWid) { 
	var name = refWid.name; 
	var target = refWid.target;

	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
	var mainWin = mediator.getMostRecentWindow("navigator:browser");
	//mainWin.com.taboca.tagvisor.widgetKill(name); 
	appWin = mainWin.gBrowser.getBrowserForTab(mainWin.com.taboca.tagvisor.visor).contentWindow;
        appWin.wrappedJSObject.com.taboca.upvisor.widgetKill(name, target);
	
} 


