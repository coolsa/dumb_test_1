define(['crafty','jquery','jqueryresizable'], function(Crafty){
	return function isoRun(){
		//startup Crafty
		Crafty.init($(".main-code").width()-$(".text-render").width(),$(".main-code").height(),document.getElementById("cube-render"));
		Crafty.pixelart(true);
		Crafty.sprite(32,"resources/images/sprite.png", {
			pos_x_norm: [0,0],
			neg_x_norm: [1,0],
			pos_y_norm: [0,2],
			neg_y_norm: [1,2],
			pos_z_norm: [0,1],
			neg_z_norm: [1,1],
			pos_x_cond: [2,0],
			neg_x_cond: [3,0],
			pos_y_cond: [2,2],
			neg_y_cond: [3,2],
			pos_z_cond: [2,1],
			neg_z_cond: [3,1],
			impulse: [0,3],
			repeating: [1,3],
			chain: [2,3],
			select: [3,3],
			empty: [1,-1]
		});
		//allow dragging and stuff for rendering
		Crafty.addEvent(this, Crafty.stage.elem, "mousedown", function(e) {
			if(e.button > 1) return;
			var base = {x: e.clientX, y: e.clientY};
			function scroll(e) {
				var dx = base.x - e.clientX,
					dy = base.y - e.clientY;
					base = {x: e.clientX, y: e.clientY};
				Crafty.viewport.x -= dx;
				Crafty.viewport.y -= dy;
			};

			Crafty.addEvent(this, Crafty.stage.elem, "mousemove", scroll);
			Crafty.addEvent(this, Crafty.stage.elem, "mouseup", function() {
				Crafty.removeEvent(this, Crafty.stage.elem, "mousemove", scroll);
			});
		});
		iso = Crafty.isometric.size(32);
		isoRender(iso);
		$(".text-render").resizable({
			handleSelector: ".splitter",
			resizeHeight:false,
			onDrag: function(){
				resizeIso();
				document.getElementById("text-render").style.maxWidth = $(".main-code").width()-$(".splitter").width() +"px";
			},
			onDragEnd: function(){
				resizeIso();
			}
		});
		$(window).resize(function(){
			resizeIso();
		});
		resizeIso();
	}
	function isoRender(iso){
		Crafty.viewport.x = 0;
		Crafty.viewport.y = 0;
		for(var x=0;x<5;x++){
			for(var y=0;y<3;y++){
				for(var z=0;z<5;z++){
					var tile = newCube(iso,y*32-z);
					drawAt(x,y,z,tile,iso);
					if(y==0)tile.sprite("chain").trigger("drawFace","pos_z_norm");
					if(y==1)tile.sprite("impulse").trigger("drawFace","pos_x_norm");
					if(y==2)tile.sprite("repeating").trigger("drawFace","neg_y_cond");
				}
			}
		}
		//do something with arrays for the rendering, 3d ones are neat
		//something like xyz[x][y][z] in a loop
		//ex setup would be: xyz[][][]=[] actualy it might not work. commit and push and sleep rip
		// var tile = newCube(iso,0);
		// drawAt(0,0,0,tile,iso);
		// tile.sprite("impulse").trigger("drawFace","pos_x_norm");
		// var tile = newCube(iso,1);
		// drawAt(1,0,0,tile,iso);
		// tile.sprite("chain").trigger("drawFace","pos_y_norm");
		// var tile = newCube(iso,2);
		// drawAt(1,1,0,tile,iso);
		// tile.sprite("chain").trigger("drawFace","pos_y_norm");
		// var tile = newCube(iso,3);
		// drawAt(1,2,0,tile,iso);
		// tile.sprite("chain").trigger("drawFace","pos_z_norm");
		// var tile = newCube(iso,2);
		// drawAt(1,2,1,tile,iso);
		// tile.sprite("chain").trigger("drawFace","pos_z_norm");
		//center better
	}
	function newCube(iso,layer){//create a new cube with clickable uses! made to modify
		return Crafty.e("2D", "Canvas", "Mouse", "empty")
		.attr('z',layer)//
		.areaMap(16,0, 0,8, 0,24, 16,32, 32,24, 32,8) //series of points defining area
		.bind("drawFace",function(dir){
			drawOver(this._x,this._y,this._z,iso,this,dir);
			drawOver(this._x,this._y,this._z,iso,this,"empty");
		})
		.bind("Click",function(e){
			this.destroy();
		}).bind("MouseOver",function(e){
			this._children[2].sprite("select");
		}).bind("MouseOut",function(e){
			this._children[2].sprite("empty");
		});
	}
	function drawAt(x,z,y,tile,iso){//puts the x,y,z into something a bit more logical
		/*the math behind this is simple. x1,y1 is part of the normal isometric grid.
		that is an issue when drawing in 3d space in a normal fashion, so it needs
		converting to x2,y2 which are in a 3d space similar to a cube game.
		The formulas to convert between them are as follows:
		x1=x2-Math.ceil(y1/2) = y2+math.floor(y1/2)
		y1=x2-y2
		x2=x1+math.ceil(y1/2)
		y2=x1-math.floor(y1/2)
		*/
		yPos=x-y;
		iso.place(x-Math.ceil(yPos/2),yPos,z*2,tile);
	}
	function drawOver(x,y,z,iso,parent,sprite){
		px = iso.px2pos(x,y);
		child=parent._children.length;
		parent.attach(Crafty.e("2D","Canvas",sprite).attr('z',z));
		iso.place(px.x,px.y,0,parent._children[child]);
	}
	function resizeIso(){
			$('#cube-render').width($(".main-code").width()-$(".text-render").width());
			Crafty.viewport.width=$(".main-code").width()-$(".text-render").width();
			Crafty.viewport.reload();
			Crafty.viewport.x = ($(".main-code").width()-$(".text-render").width())/2-32*2.5;
			Crafty.viewport.y = $(".main-code").height()/2;
	}
		//the below allows movement with the thingy. copy paste from example, #plagerism
});