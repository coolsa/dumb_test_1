define(['crafty','jquery','jqueryresizable'], function(){
	return function rendering(){
		document.getElementById("text-render").style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
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
			document.getElementById("text-render").style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
		});
		resizeIso();
	}
	function resizeIso(){
			$('#cube-render').width($(".main-code").width()-$(".text-render").width());
			Crafty.viewport.width=$(".main-code").width()-$(".text-render").width();
			Crafty.viewport.reload();
			Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-32*2.5;
			Crafty.viewport.y = $(".main-code").height()/2;
	}
});
