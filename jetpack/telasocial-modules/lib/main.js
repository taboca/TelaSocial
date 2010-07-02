sec = require("securable-module");
ob  = require("observer-service");
server  = require("server");
//https://developer.mozilla.org/en/Observer_Notifications

exports.main = function(options, callbacks) {
  console.log("Hello World!");
        console.log("app start - ia");
        server.startListening();
  ob.add("xpcom-startup", function () { console.log('xpcom!!!!') }, this);
  let cb = function () {
        console.log("app start - ia");
        server.startListening();
  }
  ob.add("final-ui-startup", cb);
}


