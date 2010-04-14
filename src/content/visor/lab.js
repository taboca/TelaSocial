/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Jetpack.
 *
 * The Initial Developer of the Original Code is Taboca TelaSocial.
 * Portions created by the Initial Developer are Copyright (C) 2010 
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Marcio Galli <mgalli@taboca.com>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

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

