var cc = { 
   send: function (doc, target, event, data) {
            var evt = doc.createEvent("HTMLEvents");
            evt.initEvent(event, true, false);
            evt.data = data;
            doc.getElementById(target).dispatchEvent(evt);
   }
} 


function filter(query) { 
    var text = "";
    $(query).contents().each(function(i) {
        if(this.nodeName == "#text") text = this.textContent;
    });
    return text;
} 
