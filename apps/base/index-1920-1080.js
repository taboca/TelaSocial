$(document).ready(function() {
   register("/main/header", "cabecalho", "./cabecalho/index.html", iframeTemplate);
   register("/main/ladoesquerdo", "meio", "./abas-1920/index.html", iframeTemplate);
   register("/main/esquerdoemcima", "mid", "./destaques/index.html", iframeTemplate);
   register("/main/fundo", "clima", "./clima/index.html", iframeTemplate);
   register("/main/paineldireita", "grade", "./grade-ical/index.html", iframeTemplate);
   register("/main/rodape", "rodape", "./rodape/index.html", iframeTemplate);
   register("/main/baixodireita", "patro", "./patrocinadores/index.html", iframeTemplate);
   compile();   
   setTimeout('startEngine()',5000);
});

function startEngine() { 
//   s1();
   setTimeout("cicleMidia()",TEMPO_INICIO_MIDIA);
} 

function cicleMidia() { 
   setTimeout( function () { 
	var doc = document.getElementById("meio").contentDocument;
	cc.send( doc.getElementById("galeria").contentDocument, "container", "rotate");
	cicleMidia();
   }, TEMPO_REFRESH_MIDIA);
} 

function s1() { 
  if(document.location.toString().indexOf("mode")>-1) { 
    var param = document.location.toString().split("mode=");
    if(param[1]=="tv") { 
      document.getElementById("viewport").style.width="1920";
      document.getElementById("viewport").style.height="1080";
      animate();
    } 
  } 
} 

function animate() { 
  tv.add($('#animation li'));
  tv.play(document.getElementById('meio').contentDocument);
  setTimeout("animate()",TEMPO_REFRESH);
} 


