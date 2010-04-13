c = require("choreographer");

var myBasicWidget = { 
	name   : __appName,
	target : __targetName,

  	init: function () { 
		console.log('initialized with id =' + this._getId() ); 
	}, 

	test: function () { 
		console.log('testing');
	} 
} 

//console.log(c.getWindow()); 
c.register(myBasicWidget);
