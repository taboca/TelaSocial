function svgbackground_Widget() {

	this.start = function () { 

		this.element = document.createElement('iframe');
		this.element.setAttribute('style', 'border:0;width:100%;height:1180px; overflow: hidden');
		this.element.setAttribute('src', 'com/taboca/svgwave/header.svg');
                document.getElementById(this._getId()).appendChild(this.element);

	} 

	this.init = function () {


	}

	return this;

}
