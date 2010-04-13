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
 * The Initial Developer of the Original Code is Taboca.
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


var jsm = {}; Cu.import("resource://gre/modules/XPCOMUtils.jsm", jsm);
var XPCOMUtils = jsm.XPCOMUtils;

var windowsMediator = Cc["@mozilla.org/appshell/window-mediator;1"];

var choreographer = exports.getWindow =function getWindow() { 
	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
 	return mediator.getMostRecentWindow("navigator:browser");
} 


// We dont need to loop through the actual extension 
var register = exports.register = function registerWidget(refObject) { 

	var mediator = windowsMediator.getService(Ci.nsIWindowMediator);
	var mainWin = mediator.getMostRecentWindow("navigator:browser");
	mainWin.com.taboca.tagvisor.widgetToVisor(refObject); 
	
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


