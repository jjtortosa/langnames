module.exports = function(code){
	if(!code)
		return require('./lib/available');
	
	return require('./lib/names/' + code);
};