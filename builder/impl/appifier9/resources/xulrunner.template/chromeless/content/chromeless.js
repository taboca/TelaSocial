
let Ci = Components.interfaces;
let Cc = Components.classes;
let Cu = Components.utils;
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

const nsIWebNavigation = Ci.nsIWebNavigation;

window.addEventListener("load", function() { start(); }, false);

function start() { 

    xulWindow = window.QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIWebNavigation)
        .QueryInterface(Ci.nsIDocShellTreeItem)
        .treeOwner
        .QueryInterface(Ci.nsIInterfaceRequestor)
        .getInterface(Ci.nsIXULWindow);

    xulWindow.XULBrowserWindow = window.XULBrowserWindow;

   window.QueryInterface(Ci.nsIDOMChromeWindow).browserDOMWindow = new nsBrowserAccess();

} 

function getBrowserURL()
{
   return "chrome://chromeless/content/chromeless.xul";
 }

function nsBrowserAccess()
{
}

nsBrowserAccess.prototype =
{
/*
  QueryInterface : function(aIID)
  {
    if (aIID.equals(Ci.nsIBrowserDOMWindow) || aIID.equals(Ci.nsIDOMJSWindow) || 
        aIID.equals(Ci.nsISupports)) { 

      return this;
    } 
    throw Components.results.NS_NOINTERFACE;
  },
*/
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIBrowserDOMWindow, Ci.nsIDOMJSWindow, Ci.nsISupports]),

  openURI : function(aURI, aOpener, aWhere, aContext)
  {
     return window.openDialog("chrome://chromeless/content/chromeless.xul", "_blank", "all,dialog=no", "http://www.gle.com" , null, null, null);
  },

  isTabContentWindow : function(aWindow)
  {
    // Shouldn't ever get called
    throw Components.results.NS_ERROR_UNEXPECTED;
  }
};




