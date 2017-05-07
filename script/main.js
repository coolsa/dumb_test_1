requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty',
		jquery: '../resources/library/jquery',
		jqueryresizable: '../resources/library/jquery-resizable',
		domReady: '../resources/library/domReady'
	}
});
	//testeronivar s
require([
	"running",
	'domReady',
	"isometric",
	"rendering",
	"crafty",
	"jquery",
	"jqueryresizable"
	],
function (running, domReady){//, rendering, crafty, jquery, jqueryresizable){
	domReady(function(){
		window.running = new running();
	});
});