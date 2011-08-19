
/* Check data-time attribute in index2.html and also ./abas/barraAbas.html 
   to change animation timing */
 
function widget(rule, id, src, template) { 
	$(rule).html(iframeTemplate.data);
 	$(rule+" iframe").attr("id",id);
 	$(rule+" iframe").attr("src",src);
} 

var iframeTemplate = { 
   data: '<iframe frameborder="no" style="height:100%;width:100%;overflow:hidden;" class="gv6"   src="" id="" ></iframe>'
} 

/* Grids On The Fly */

$(document).ready(function() {
   widget("#main #topright", "clock", "./tempo/index.html", iframeTemplate);
   widget("#main #middle", "abas-meio", "./abas/barraAbas.html?mode=tv", iframeTemplate);
   widget("#main #middle-tabs", "abas", "./abas/barraAbasTop.html", iframeTemplate);
   widget("#main #topmiddle", "mid", "./destaques/index.html", iframeTemplate);
   widget("#main #bottom", "typing", "./typing/index.html", iframeTemplate);
   widget("#main #bottomright", "tempo", "./weather-inpe/index.html", iframeTemplate);

   setTimeout("cicleMidia()",TEMPO_INICIO_MIDIA);
});

function cicleMidia() { 
   setTimeout( function () { 
	var doc = $("#main #middle #abas").get();
	doc = document.getElementById("abas-meio").contentDocument;
	cc.send( doc.getElementById("midia").contentDocument, "container", "rotate");
	cicleMidia();
   }, TEMPO_REFRESH_MIDIA);
} 
