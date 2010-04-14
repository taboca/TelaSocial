


function grid_Widget() {

	this.start = function () { 
		

		this.element = document.createElement('table');

		this.element.setAttribute("width","100%");
		this.element.setAttribute("height","100%");
		this.element.setAttribute("cellpadding","0");
		this.element.setAttribute("cellspacing","0");
		//this.element.setAttribute("style","border:10px solid rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")");

		var tdElement = document.createElement("td");

		var tdElement2 = document.createElement("td");
		var tdElement3 = document.createElement("td");
 		var trElement = document.createElement("tr");
		tdElement.setAttribute("valign","top");
		tdElement2.setAttribute("valign","top");
		tdElement3.setAttribute("valign","top");

		trElement.appendChild(tdElement);
		trElement.appendChild(tdElement2);
		trElement.appendChild(tdElement3);
		this.element.appendChild(trElement);

		var backgroundElement= document.createElement("div");
		backgroundElement.setAttribute("style","width:100%;height:100%;border:0;margin:0;paddin:0;position:absolute;z-index:0");
		document.getElementById(this._getId()).appendChild(backgroundElement);

		var backgroundElement2= document.createElement("div");
		backgroundElement2.setAttribute("style","width:100%;height:100%;border:0;margin:0;paddin:0;position:absolute;z-index:1000");
		document.getElementById(this._getId()).appendChild(backgroundElement2);


		//d.getElementById(this._getId()).appendChild(this.element);
		backgroundElement2.appendChild(this.element);

		/* Define my childs ... */

 	 	backgroundElement.id = Math.random();
 	 	tdElement.id = Math.random();
 	 	tdElement2.id = Math.random();
 	 	tdElement3.id = Math.random();

		var cc = 0;
		for ( key in this._childList ) { 
			if (cc==0) { 
				this._childList[key] = backgroundElement.id; 
			} 
			if (cc==1) { 
				this._childList[key] = tdElement.id; 
			} 
			if (cc==2) { 
				this._childList[key] = tdElement2.id; 
			} 
			if (cc==3) { 
				this._childList[key] = tdElement3.id; 
			} 
			cc++;
		} 



	} 

	this.init = function () {
		

	}

	return this;

}

