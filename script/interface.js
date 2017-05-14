define([
	'codemirror',
	'crafty',
	'jquery',
	'jqueryresizable',
	'codemirror/mode/javascript/javascript',
	'codemirror/addon/scroll/simplescrollbars'
],function(CodeMirror, Crafty, $){
	function interface(){
		//this.$render-area = $(".main-code");
		this.editor = CodeMirror($(".code-replace")[0],{
			mode: 'javascript',
			lineNumbers: true,
			value: "document.documentElement.innerHTML",
			theme: 'pastel-on-dark',
			scrollbarStyle: 'simple'
		});
		this.editor.setSize('100%','100%');
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
				$('.cube-render').width($(".main-code").width()-$(".text-render").width()-$(".splitter").width());
				Crafty.viewport.width=$(".main-code").width()-$(".text-render").width()-$(".splitter").width();
				Crafty.viewport.height=$(".main-code").height();
				Crafty.viewport.reload();
				Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2;
				Crafty.viewport.y = $(".main-code").height()/2;
				this.editor.refresh();
		},
		jumpTo: function(line){
			this.editor.setSelection({line:line,ch:0},{line:line,ch:19191919})
		}
	}
	return interface;
})

