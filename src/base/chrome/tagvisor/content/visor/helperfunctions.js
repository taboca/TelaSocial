function pickRandom(array) {
	return array[Math.floor(Math.random() * array.length)];
}

Function.prototype.bind = function(obj) { // from prototype.js
  var method = this,
   temp = function() {
	return method.apply(obj, arguments);
   };
 
  return temp;
} 
