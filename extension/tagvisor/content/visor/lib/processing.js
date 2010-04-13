var jsm = {}; Cu.import("resource://gre/modules/XPCOMUtils.jsm", jsm);
var XPCOMUtils = jsm.XPCOMUtils;

var windowsMediator = Cc["@mozilla.org/appshell/window-mediator;1"];

var processing = exports.getWindow =function getWindow() { 
	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
 	return mediator.getMostRecentWindow("navigator:browser").Processing;
} 
