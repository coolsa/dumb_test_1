requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty',
		jquery: '../resources/library/jquery',
		jqueryresizable: '../resources/library/jquery-resizable'
	}
});
	//testeronivar s
require([
	"isometric",
	"crafty",
	"jquery",
	"jqueryresizable"
	],
function ($, isometric, crafty, jquery, jqueryresizable){
	$(function(){
		isoRun();
	});
});