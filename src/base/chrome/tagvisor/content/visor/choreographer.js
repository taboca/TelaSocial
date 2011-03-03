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
 * The Original Code is TelaSocial
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

try { if(com) {}; } catch (i) { com = {}; } 
if(!com.taboca) com.taboca={};
if(!com.taboca.upvisor) com.taboca.upvisor={};

// Choreographer
com.taboca.upvisor = {

   widgetList: new Array(),
   loadCallback : null, 
   loadCounter:0,
   stackLoadScripts:0,
   pendingWidgets:new Array(),
   events: new Array(),

   rulesLoad: function () { 
                        //url: "http://www.icmc.usp.br/~comunica/telaicmc/events.js",
	  $.ajax({
                        url: "./rules-static/events.js",
                        cache: false,
                        success: function(data){
                                eval(data);
                        }
                });


			// url:"http://www.icmc.usp.br/~comunica/telaicmc/regras-layout.js",
	$.ajax({
                        url: "./rules-static/index.js",
                        cache: false,
                        success: function(data){
				eval(data);
                        }
                });




   },

   dump: function (str) { 
	$("#dump").append(str+"<br />");
   },

   completeAll: function () { 
     self= this; 
     setTimeout( function () {
        $("#dump").css("display","none");
        $("#console").css("display","none");
        self.loadCallback()
     }, 5000);
   },

   registerEvent: function ( bucket, name, value) { 
	$("#sharedstore").append("<div class='"+bucket+"' ><p class='"+name+"'>"+value+"</p></div>");

   },

   registerWidget:function (targetName, scriptSource, name, targetId)  { 
	var wInfo = { 
		targetName: targetName, 
		targetId  : targetId,
		scriptSource: scriptSource, 
		sandBox : null, 
		name:name
	} 
	this.pendingWidgets[this.loadCounter] = wInfo;
	this.dump("Registering ("+this.loadCounter+") = "+wInfo.name+" and targetId = "+targetId);
	this.loadCounter++;
	this.stackLoadScripts++;
   } ,

   startEngine: function ( callbackFunction) { 
	this.loadWidget();
	this.loadCallback = callbackFunction; 
   },
   loadWidget: function () { 

	for( key in this.pendingWidgets ) { 
		var currWidRef    = this.pendingWidgets[key];
		var indexWidget   = parseInt(key);
		var arrayFileName = currWidRef.scriptSource.split("/");
		var baseName      = arrayFileName[arrayFileName.length-1];
		baseName = baseName.replace(/\.js/,"");
        	currWidRef.widgetName = baseName; 
		this.dump("Will load ("+key+")...= " + currWidRef.scriptSource);
		this.loadSequential();
	} 

   },

   loadState: 0, 
  
   loadSequential: function () { 
	if(this.loadState<this.pendingWidgets.length) { 
		var curr = this.pendingWidgets[this.loadState]; 
		this.loadState++;
		var self= this; 
		$.ajax({
			url: curr.scriptSource,
			cache: false,
			success: function(data){
				
				self.dump("loading script... "+ curr.name +" and target Id = " + curr.targetId);
				initLoader(data, curr.name, curr.targetName, curr.targetId);
				self.loadSequential();
  			}
		});

	}  else { 
        //	this.tryFinish();
	} 
   },

   tryFinish: function() { 

	this.stackLoadScripts--;
        this.dump("...");
	if(this.stackLoadScripts==0) { 
		this.renderWidgets();
        }

   },

   widgetKill: function ( name, target) { 
 
	scriptsLoaders[name].unload();
	scriptsLoaders[name]=null;
	if(target!="") { 
	 	var targetContainer = this.widgetList[target+"."+name]._getId();
		document.getElementById(targetContainer).innerHTML="";
	} 

   }, 
   matchRegistration: function (widgetObject, name, targetName, targetId) { 

	this.stackLoadScripts--;

	var scopedthis = this; 

	if (targetName =="null") {
                targetName = "";
        }
        scopedthis.widgetList[ targetName + "." + name] = widgetObject;
        this.dump("Available scope '"+targetName+"."+name+"'");
        widgetObject._childList  = new Array();
        widgetObject._parentName = targetName;
        widgetObject._name       = name;
        widgetObject._targetId   = targetId;
        if(scopedthis.widgetList[targetName]) {
		this.dump("Giving id scope "+targetId +" to myself = "+widgetObject._name );
                scopedthis.widgetList[targetName]._childList[name] = targetId ;
        }
        var choreographer=this;
        widgetObject._coreDoc = document;
        //widgetObject._coreWin = Processing;
	// testing exposure of service at the variable level 
	widgetObject._service_google = google;
        widgetObject._dump = this.dump;
        widgetObject._service_jquery = $;

        widgetObject._send = function (target, event, data) { 
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent(event, true, false);
            evt.data = data;
            target.dispatchEvent(evt);
        }
	
        widgetObject._getId = function () {
                if( this._parentName == "" ) {  
                    return "maincontainer";
                } else {
                    return choreographer.widgetList[ this._parentName ]._childList[ this._name ]    
                }
        }
        widgetObject._raiseEvent  = function (a,b,c) { choreographer.raiseEvent(a,b,c);
 }
        widgetObject._uniqueId = Math.random()*100000;
        widgetObject.init();

	if(this.stackLoadScripts==0) {
                this.completeAll();
        }
   },

	/* Patch this in the future to support * */
   raiseEvent : function ( fullpath, name, data) {
        this.widgetList[fullpath][name](data);
   }

} // Choreographer



