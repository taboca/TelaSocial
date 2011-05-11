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

exports.load = function (basePath, successCallback, errorCallback) { 
 
//console.log(1);
        var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
        var mainWin = mediator.getMostRecentWindow("navigator:browser");
        var appWin = mainWin.gBrowserContentWindow;
        var dirsvc = Cc["@mozilla.org/file/directory_service;1"]
             .getService(Ci.nsIProperties);
        var appDir =  dirsvc.get("resource:app", Ci.nsIFile).path;
 	//console.log("lib/chromeless load: basePath = " + appDir + " and " + basePath);

//	try { 
 //       var s = Cu.Sandbox(appWin.contentWindow); 
  //      var result = Cu.evalInSandbox("com.taboca.upvisor.loadContent('org/simple/layout/data.html',function s(e) { console.log(e) } )", s);
//	} catch (i) { console.log(i) } 
	appWin.wrappedJSObject.com.taboca.upvisor.loadContent(basePath, successCallback, errorCallback);
//https://developer.mozilla.org/en/Components.utils.evalInSandbox

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


