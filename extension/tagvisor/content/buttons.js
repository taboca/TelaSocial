
function init() {

    setTimeout("other()",2000);
    
}


var gWin = null;

function other() {


try {

  var wm = Components.classes["@mozilla.org/appshell/window-mediator;1"]
                              .getService(Components.interfaces.nsIWindowMediator);
       gWin = wm.getMostRecentWindow("navigator:browser");
          if(!gWin) gWin = window.opener;

    gWin.xppTellDocument(document);
    gWin.testCanvas();

    
} catch (i) { alert(i) } 

}

function testGetBits() {

    gWin.testGetBits();

}
