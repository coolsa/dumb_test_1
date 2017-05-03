requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty'
	}
});
	//testeronivar s
require([
	"isometric",
	"crafty"
	],
function ($, isometric, crafty){
	$(function(){
		isoRun();
	});
});