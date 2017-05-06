requirejs.config({
	baseUrl: './script',
	paths: {
		crafty: '../resources/library/crafty',
		jquery: '../resources/library/jquery',
		jqueryui: '../resources/library/jquery-ui/jquery-ui'
	}
});
	//testeronivar s
require([
	"isometric",
	"crafty",
	"jquery"
	],
function ($, isometric, crafty, jquery, jqueryui){
	$(function(){
		$(window).resize(function(){
			$('#cube-render').width($(".main-code").width()-$(".text-render").width());
			$('.text-render').height($(".main-code").height());
		});
		isoRun();
	});
});