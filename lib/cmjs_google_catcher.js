/* global module */

module.exports = function(req, res, next){
	var fs = require('fs')
	,	base = '/private/var/projects/langnames/names/';
	
	req.site.translator.availableLangs(function(err, r){
		if(err)
			return next(err);
		
		var codes = Object.keys(r);
		
		codes.sort();
		
		var sorted = {};
					
		codes.forEach(function(code){
			sorted[code] = r[code];
		});
		
		fs.writeFile(base + 'available.json', JSON.stringify(sorted, null, '\t'));
		
		codes.forEach(function(code){
			(function(c){
				req.site.translator.langNames(c, function(err, names){
					if(err)
						return;
					
					codes.forEach(function(code){
						sorted[code] = names[code];
					});
					
					fs.writeFile(base + c + '.json', JSON.stringify(sorted, null, '\t'));
				});
			})(code);
		});
		
		res.send('done! ' + codes.length);
	});
};