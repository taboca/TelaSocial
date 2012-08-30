/* Check data-time attribute in index2.html and also ./abas/barraAbas.html 
   to change animation timing */
 
function register(rule, id, src, template) { 
	var obj = {rule:rule, id:id, src:src, template:template};
	pending[rule] = obj;
	byId[id] = obj;
}

var pending = new Array(); 
var byId    = new Array();
var current = '/main';
var sets=new Array();

function compile(){ 
	pending.sort();
	prepareSets(); 
} 
function prepareSets() { 
	for(var k in pending) { 
		var curr = pending[k];
		var keys = k.split("/");
		var last = '/'+keys[keys.length-1];
		var ancestorKey = k.split(last)[0];
		/* We keep the key as the full path /a/b/c example */
		if(typeof sets[ancestorKey] == 'undefined') { 
			sets[ancestorKey] = new Array();
		} 
		sets[ancestorKey].push(curr);
		//alert("adding " + last + " to " + k.split(last)[0]);
	} 
	for(var k in sets[current]) { 
		//alert("will create iframe for.. " + sets[current][k].rule);
		createChilds(sets[current][k]);
	}
} 

function createChilds(item) { 

	var rule = item.rule; 
	var id = item.id;
	var keys = rule.split("/");
	var last = keys[keys.length-2];
	var curr = byId[id];
//	delete pending[item.rule];

	var pathToRules = rule.split("/");
	var sum = "";
	for(var i in pathToRules) { 
		if(i!=0) { 
			sum+= "#"+pathToRules[i]+" ";
		} 
        } 
	var rule = sum;
	//alert(rule);
	
	var id = curr.id;
	var src = curr.src;
	var template = curr.template;

	$(rule).html(iframeTemplate.data);
 	$(rule+" iframe").attr("id",id);
	$(rule+" iframe#"+id).load(function () { 
		$('#debug').append("<li>iframe"+id+" loaded</li>");

		for(var k in sets[item.rule]) { 
			alert("..will create iframe for.. " + sets[item.rule][k].id);
		//	alert(1);
			createChilds("/"+sets[item.rule][k]);
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
