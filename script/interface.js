define([
	'crafty',
	'jquery',
	'jqueryresizable'
],function(Crafty, $){
	function interface(){
		//this.$render-area = $(".main-code");
		this.isoSize=0;
		this.slider();
	}
	interface.prototype = {
		slider: function(){
			var that = this;
			$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			$(".text-render").resizable({
				handleSelector: ".splitter",
				resizeHeight:false,
				onDrag: function(){
					that.resizeIso()
				},
				onDragEnd: function(){
					that.resizeIso()
				}
			});
			$(window).resize(function(){
				resizeIso();
				$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			});				
			this.resizeIso();
		},
		resizeIso: function(){
				$('.cube-render').width($(".main-code").width()-$(".text-render").width());
				Crafty.viewport.width=$(".main-code").width()-$(".text-render").width();
				Crafty.viewport.reload();
				Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-8*this.isoSize;
				Crafty.viewport.y = $(".main-code").height()/2;
		}
	}
	return interface;
})