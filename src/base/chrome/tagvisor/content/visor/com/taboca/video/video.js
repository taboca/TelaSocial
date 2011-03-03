function video_Widget() {

	this.start = function () { 

		this.element = document.createElement('iframe');
		this.element.setAttribute('style', 'border:0;width:340px;height:245px;overflow:hidden');
		this.element.setAttribute('src', 'http://www.telasocial.com/labs/widgets/video/player.html');
                document.getElementById(this._getId()).appendChild(this.element);

	} 

	this.init = function () {


	}

	return this;

}
