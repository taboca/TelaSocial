
function container_Widget() {

	this.start = function () { 
		
		this.element = document.createElement('table');

		this.element.setAttribute("width","100%");
		this.element.setAttribute("height","100%");
		this.element.setAttribute("cellpadding","0");
		this.element.setAttribute("cellspacing","0");
	//	this.element.setAttribute("style","border:10px solid rgb("+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+","+parseInt(Math.random()*255)+")");

		var tdElement = document.createElement("td");
 		var trElement = document.createElement("tr");


		tdElement.innerHTML="<h1>hi</h1>";

		trElement.appendChild(tdElement);
		this.element.appendChild(trElement);

		document.getElementById(this._getId()).appendChild(this.element);


		/* Define my childs ... */

 	 	tdElement.id = Math.random();

		for ( key in this._childList ) { 
			this._childList[key] = tdElement.id; 
		} 


	} 

	this.init = function () {
		

	}

	return this;

}

