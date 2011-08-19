try { 
var barra =  {

        tabsColors: ['background-color:rgb(253,181,37);','background-color:rgb(100,197,210);','background-color:rgb(14,148,171)','background-color:rgb(253,181,37);'],
        tabsTitles: ['Acontece','Defesas'],
        movepos : 0,
        moveWidth: 1080, 
        pass: new Array(), 
        kick: function () {
		this.movepos+=2;
                document.getElementById("pointer").style.left=this.movepos+"px";
		var currIndex = Math.floor(this.movepos/this.tabsWidth); 

		if(currIndex<this.tabsTitles.length) { 
 		   if(!this.pass[currIndex]) { 
			this.pass[currIndex]=true;		

			alert('kick');
 		   } 
		} 
		if(this.movepos > 1080 ) { 
			this.movepos = 0;
			this.pass= new Array();
		} 
		
	 	setTimeout(function () { barra.kick() }, 100); 	
        }
}


} catch (i) { alert(i) } 
