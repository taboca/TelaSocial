var gLoader = null;

var scriptsLoaders = new Array();

function clearConsole() {
  document.getElementById("console").textContent = "";
}

function printToConsole(message) {
  document.getElementById("console").textContent += message;
}


function maybeUnloadLoader() {
  if (gLoader) {
    gLoader.unload();
    gLoader = null;
  }
}

function runCode() {
  maybeUnloadLoader();
  clearConsole();

  gLoader = new Cuddlefish.Loader({rootPaths: ["lib/"],
                                   print: printToConsole});

  try {
    var code = document.getElementById("code").value;
    if (code)
      gLoader.runScript(code);
  } catch (e) {
    gLoader.console.exception(e);
  }
}

function initLoader(scriptcode,name, targetName, targetId) { 
  var aLoader = new Cuddlefish.Loader({rootPaths: ["lib/"], print: printToConsole});
  scriptsLoaders[name]=aLoader; 
  var ret = null; 
  try {
    scriptcode = "var __appName = '"+name+"'; __targetName = '"+targetName+"'; var  __targetId = '"+targetId+"'; "+ scriptcode; 
    //scriptcode = "var __appName = '"+name+"';"+ scriptcode; 
    if (scriptcode) aLoader.runScript(scriptcode);
  } catch (e) {    aLoader.console.exception(e); }

} 

window.addEventListener("unload", maybeUnloadLoader, false);

