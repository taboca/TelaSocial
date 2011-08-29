
/* Check data-time attribute in index2.html and also ./abas/barraAbas.html 
   to change animation timing */
 
function register(rule, id, src, template) { 
	pending.push({rule:rule, id:id, src:src, template:template});
}

function compile(){ 
	loadWidget();
} 

var pending = new Array(); 

function loadWidget() { 
	var curr = pending.pop();
	var rule = curr.rule;
	var id = curr.id;
	var src = curr.src;
	var template = curr.template;

	$(rule).html(iframeTemplate.data);
 	$(rule+" iframe").attr("id",id);
	$(rule+" iframe#"+id).load(function () { 
		$('#debug').append("<li>iframe"+id+" loaded</li>");
		if(pending.length>0) { 
			loadWidget();
		} else { 
			startEngine(); 
		} 
	});
 	$(rule+" iframe").attr("src",src);
} 

var iframeTemplate = { 
   data: '<iframe frameborder="no" style="height:100%;width:100%;overflow:hidden;" class="gv6"   src="" id="" ></iframe>'
} 

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
