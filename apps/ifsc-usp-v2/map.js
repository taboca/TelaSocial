/* Grids On The Fly */

$(document).ready(function() {
   register("#main #topright", "clock", "./tempo/index.html", iframeTemplate);
   register("#main #middle", "abas-meio", "./abas/barraAbas.html", iframeTemplate);
   register("#main #middle-tabs", "abas", "./abas/barraAbasTop.html", iframeTemplate);
   register("#main #topmiddle", "mid", "./destaques/index.html", iframeTemplate);
   register("#main #bottom", "typing", "./typing/index.html", iframeTemplate);
   register("#main #bottomright", "tempo", "./weather-inpe/index.html", iframeTemplate);

   compile();  // this can be based in events in time too or scoped rules events.  So, when something happens 
 		// in the live store, it happens. one use case is that insertion of a IFRAME mutation 
		// should generate a residual event in the store DOM, so you know, via selection rules
		// when the store event ( iframe ) was loaded. So, for example is let's you start animation
		// when all the iframes are in the DOM  

   // case "#main #topright[loaded=true] & #main #middle & #mai bottom { event -> clockstart } 
   // clockstart is reality in the live DOM. So #engine #clockstart and this will start ticking inside of it 
   // where ticking is a tag #tick 

});

function startEngine() { 

   s1();
   setTimeout("cicleMidia()",TEMPO_INICIO_MIDIA);

} 

function cicleMidia() { 
   setTimeout( function () { 
	var doc = $("#main #middle #abas").get();
	doc = document.getElementById("abas-meio").contentDocument;
	cc.send( doc.getElementById("midia").contentDocument, "container", "rotate");
	cicleMidia();
   }, TEMPO_REFRESH_MIDIA);
} 

function s1() { 
	if(document.location.toString().indexOf("mode")>-1) { 
		var param = document.location.toString().split("mode=");
		if(param[1]=="tv") { 
			document.getElementById("viewport").style.width="1080";
			document.getElementById("viewport").style.height="1920";
               		tv.add($('#animation li'));
			animate();
		} 
	} 
} 
function animate() { 
        tv.play();
	setTimeout("animate()",TEMPO_REFRESH_ABAS);
 } 


