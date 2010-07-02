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
 * The Original Code is Mozilla.
 *
 * The Initial Developer of the Original Code is IBM Corporation.
 * Portions created by IBM Corporation are Copyright (C) 2004
 * IBM Corporation. All Rights Reserved.
 *
 * Contributor(s):
 *   Darin Fisher <darin@meer.net>
 *   Marcio Galli <mgalli@taboca.com> ' modified to Jetpack SDK ' 
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

const nsISupports = Ci.nsISupports;
const nsIObserver = Ci.nsIObserver;
const nsIServerSocket = Ci.nsIServerSocket;
const nsIServerSocketListener = Ci.nsIServerSocketListener;
const nsITransport = Ci.nsITransport;
const nsIScriptableInputStream = Ci.nsIScriptableInputStream;

/** we'll listen on this port for HTTP requests **/
const kPORT = 4466;

function objServer() { console.info(">>> creating nsTestServ instance\n"); };

objServer.prototype =
{
  QueryInterface: function(iid)
  {
    if (iid.equals(nsIObserver) ||
        iid.equals(nsIServerSocketListener) ||
        iid.equals(nsISupports))
      return this;

    throw Cr.NS_ERROR_NO_INTERFACE;
  },

  go: function()
  {
    console.info(">>>go...\n");
    this.startListening();
  },

  /* this function is called when we receive a new connection */
  onSocketAccepted: function(serverSocket, clientSocket)
  {
    console.info(">>> accepted connection on "+clientSocket.host+":"+clientSocket.port+"\n");

    var input = clientSocket.openInputStream(nsITransport.OPEN_BLOCKING, 0, 0);
    var output = clientSocket.openOutputStream(nsITransport.OPEN_BLOCKING, 0, 0);

    this.consumeInput(input);

    const fixedResponse =
      "HTTP/1.0 200 OK\r\nContent-Type: text/plain\r\n\r\nFooooopy!!\r\n";
    var response = fixedResponse + "\r\n" + new Date().toString() + "\r\n";
    var n = output.write(response, response.length);
    console.info(">>> wrote "+n+" bytes\n");

    input.close();
    output.close();
  },

  onStopListening: function(serverSocket, status)
  {
    console.info(">>> shutting down server socket\n");
  },

  startListening: function()
  {
    const SERVERSOCKET_CONTRACTID = "@mozilla.org/network/server-socket;1";
    var socket = Cc[SERVERSOCKET_CONTRACTID].createInstance(nsIServerSocket);
    socket.init(kPORT, true /* loopback only */, 5);
    console.info(">>> listening on port "+socket.port+"\n");
    socket.asyncListen(this);
  },

  consumeInput: function(input)
  {
    /* use nsIScriptableInputStream to consume all of the data on the stream */

    var sin = Cc["@mozilla.org/scriptableinputstream;1"]
                        .createInstance(nsIScriptableInputStream);
    sin.init(input);

    /* discard all data */
    while (sin.available() > 0)
      sin.read(512);
  }
}

var localServer = null; 

var startListening = exports.startListening = function startListening() {
    localServer = new objServer();     
    localServer.go();
}

require("unload").when( function killEverything() { });
