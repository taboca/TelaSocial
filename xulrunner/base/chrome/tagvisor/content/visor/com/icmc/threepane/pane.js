<html>
<head>
<style>


  body { margin:0; padding:0; background: black; } 

  table.main {
	width:100%;
	height:500px;
   } 


   .basepanel { 
	height:100%;
	padding:0 1em 0 1em;
	
   }

	.panel { 
		-moz-border-radius: 45px;
		background-color:rgb(253,181,37);
		height:100%;
	}
	.tab { 
		font-size:30px;
		padding:.2em;
		font-weight:bold;
		text-align:center;
	}

	.tab1 { background-color:rgb(253,181,37); -moz-border-radius:40px 20px 0 0 ; } 
	.tab2 { background-color:rgb(100,197,210); -moz-border-radius:40px 20px 0 0 ; } 
	.tab3 { background-color:rgb(14,148,171); -moz-border-radius:40px 20px 0 0 ; } 

	.transp { background-color:transparent; } 

	#pointer { 
		width:40px;
		-moz-border-radius:20px;
		height:40px;
		background-color:tab3;
		z-index:-1001;
		position:absolute;
		top:0px;
		left:0px;
	}

	.fixedpanel { 
		-moz-border-radius:45px 45px 0 0 ;	
		background-color:white;
		height:200px;
		-moz-box-shadow: white 0 -40px 60px;
		z-index:1000;
		position:absolute;
		width:100%;
		top:300px;
	} 
	
</style>

<script>
	var pX=0;
	function movePointer () { 
	 	pX++;
		document.getElementById("pointer").style.left=pX+"px";
		setTimeout("movePointer()",100);
	} 
</script>

</head>
<body onload="movePointer()" >
<div id='pointer'>
</div>
<table cellpadding="0" cellspacing="0" class="main">
<tr>
<td align='center' >
<table cellspacing='0' cellpadding='0' style='width:900px;margin-top:1em;'>
<tr>
<td >
<div class='tab tab1'>
Eventos
</div>
</td>
<td >
<div class='tab tab2'>
Eventos
</div>
</td>
<td >
<div class='tab tab3'>
Eventos
</div>
</td>
</tr>
</table>

</td>
</tr>
<tr>
<td height="100%">
<div class="basepanel">
<div class="panel">
</div>
</div>
</td>
</tr>
</table>

<div class="fixedpanel">
	testing
</div>
</body>
</html>
