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
		this.isoSize=0;
		this.editor = CodeMirror($(".code-replace")[0],{
			mode: 'javascript',
			lineNumbers: true,
			value: document.documentElement.innerHTML+" "+document.documentElement.innerHTML+" "+document.documentElement.innerHTML,
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
					that.editor.refresh();
				}
			});
			$(window).resize(function(){
				$(".text-render")[0].style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
				$(".center")[0].style.maxHeight = $(window).height()-100 + "px";
				that.resizeIso();
				that.editor.refresh();
			});
			this.resizeIso();
		},
		resizeIso: function(){
				$('.cube-render').width($(".main-code").width()-$(".text-render").width()-$(".splitter").width());
				Crafty.viewport.width=$(".main-code").width()-$(".text-render").width()-$(".splitter").width();
				Crafty.viewport.height=$(".main-code").height();
				Crafty.viewport.reload();
				Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-8*this.isoSize;
				Crafty.viewport.y = $(".main-code").height()/2;
		},
		jumpTo: function(line){
			var t = this.editor.charCoords({line: line, ch: 0}, "local").top;
			var middleHeight = this.editor.getScrollerElement().offsetHeight / 2;
			this.editor.scrollTo(null, t - middleHeight - 5);
			this.editor.setSelection({line:line,ch:0},{line:line+1,ch:0})
		}
	}
	return interface;
});
