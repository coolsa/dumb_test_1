requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty',
		jquery: '../resources/library/jquery'
	}
});
	//testeronivar s
require([
	"isometric",
	"crafty",
	"jquery"
	],
function ($, isometric, crafty, jquery){
	$(function(){
		isoRun();
	});
});