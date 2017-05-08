requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty',
		jquery: '../resources/library/jquery',
		jqueryresizable: '../resources/library/jquery-resizable',
		domReady: '../resources/library/domReady'
	}
});
require([
	'running',
	'domReady',
	'isoGrid',
	'interface',
	'crafty',
	'jquery',
	'jqueryresizable'
	],
function (running, domReady){
	domReady(function(){
		window.run = new running();
	});
});