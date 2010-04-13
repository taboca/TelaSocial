function video_live_mogulus_Widget() {

	this.start = function () { 

		this.element = document.createElement('iframe');

		this.element.src="http://www.telasocial.com/labs/widgets/video_mogulus_live/";

		this.element.setAttribute("style","width:440px;border:0px;height:345px;overflow:hidden");

                document.getElementById(this._getId()).appendChild(this.element);

	} 

	this.init = function () {


	}

	return this;

}

