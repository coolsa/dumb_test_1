define([
	'codemirror',
	'crafty',
	'jquery',
	'jqueryresizable',
	'codemirror/mode/javascript/javascript'
],function(CodeMirror, Crafty, $){
	function interface(){
		//this.$render-area = $(".main-code");
		this.isoSize=0;
		this.slider();
		this.editor = CodeMirror($(".code-replace")[0],{
			mode: 'javascript',
			lineNumbers: true,
			value: "document.documentElement.innerHTML",
			theme: 'pastel-on-dark'
		});
		this.editor.setSize('100%','100%');
	}
	interface.prototype = {
		slider: function(){
			var that = this;
			$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			$(".text-render").resizable({
				handleSelector: ".splitter",
				resizeHeight:false,
				onDrag: function(){
					that.resizeIso();
				},
				onDragEnd: function(){
					that.resizeIso();
				}
			});
			$(window).resize(function(){
				$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
				$(".center")[0].style.maxHeight = $(window).height()-100 + "px";
				that.resizeIso();
			});				
			this.resizeIso();
		},
		resizeIso: function(){
				$('.cube-render').width($(".main-code").width()-$(".text-render").width());
				Crafty.viewport.width=$(".main-code").width()-$(".text-render").width();
				Crafty.viewport.height=$(".main-code").height();
				Crafty.viewport.reload();
				Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-8*this.isoSize;
				Crafty.viewport.y = $(".main-code").height()/2;
		}
	}
	return interface;
})

