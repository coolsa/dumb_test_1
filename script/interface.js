define([
	'crafty',
	'jquery',
	'jqueryresizable',
	'isometric'
],function(Crafty, $){
	function interface(){
		//this.$render-area = $(".main-code");
		this.slider();
	}
	interface.prototype = {
		slider: function(){
			$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			$(".text-render").resizable({
				handleSelector: ".splitter",
				resizeHeight:false,
				onDrag: function(){
					resizeIso()
				},
				onDragEnd: function(){
					resizeIso()
				}
			});
			$(window).resize(function(){
				resizeIso();
				$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			});				
			resizeIso();
		}
	}
	function resizeIso(){
			$('.cube-render').width($(".main-code").width()-$(".text-render").width());
			Crafty.viewport.width=$(".main-code").width()-$(".text-render").width();
			Crafty.viewport.reload();
			Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-32*2.5;
			Crafty.viewport.y = $(".main-code").height()/2;
	}
	return interface;
})