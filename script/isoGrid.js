define([
	'crafty',
	'jquery',
	'jqueryresizable'
], function(Crafty, $){
	function isoGrid(){
		Crafty.init($(".main-code").width()-$(".text-render").width(),$(".main-code").height(),$(".cube-render")[0]);
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
		this.isoGrid = Crafty.isometric.size(32);
	}
	isoGrid.prototype = {
		render: function(grid){
			Crafty.viewport.x = 0;
			Crafty.viewport.y = 0;
			for(var x=0;x<grid.length;x++){
				if(grid[x]!=undefined)for(var y=0;y<grid[x].length;y++){
					if(grid[x][y]!=undefined)for(var z=0;z<grid[x][y].length;z++){
						this.drawAt(x,y,z,this.newCube(y*32-z,x*5+y*25+z),grid[x][y][z]);
					}
				}
			}
		},
		newCube: function(layer,line){//create a new cube with clickable uses! made to modify
			var that = this
			return Crafty.e("2D", "Canvas", "Mouse", "empty")
			.attr('z',layer)//
			.areaMap(16,0, 0,8, 0,24, 16,32, 32,24, 32,8) //series of points defining area
			.bind("drawFace",function(face){
				that.drawOver(this._x,this._y,this._z,this,face);
				that.drawOver(this._x,this._y,this._z,this,"empty");
			})
			.bind("Click",function(e){
				window.run.interface.jumpTo(line);
				console.log(line);
				this.destroy();
			}).bind("MouseOver",function(e){
				this._children[2].sprite("select");
			}).bind("MouseOut",function(e){
				this._children[2].sprite("empty");
			});
		},
		//puts the x,y,z into something a bit more logical
		drawAt: function(x,z,y,tile,sprite){
			/*the math behind this is interesting.
			x1,y1 is part of the normal isometric grid which zig-zags.
			That is an issue when drawing in 3d space in a normal fashion, so it needs
			converting to x2,y2 which are in a 3d space similar to a cube game.
			The formulas to convert between them are as follows:
			x1=x2-Math.ceil(y1/2) = y2+math.floor(y1/2)
			y1=x2-y2
			x2=x1+math.ceil(y1/2)
			y2=x1-math.floor(y1/2)
			*/
			yPos=x-y;
			this.isoGrid.place(x-Math.ceil(yPos/2),yPos,z*2,tile);
			tile.sprite(sprite.type).trigger("drawFace",sprite.face);
		},
		drawOver: function(x,y,z,parent,sprite){
			px = this.isoGrid.px2pos(x,y);
			child=parent._children.length;
			parent.attach(Crafty.e("2D","Canvas",sprite).attr('z',z));
			this.isoGrid.place(px.x,px.y,0,parent._children[child]);
		}
	}
	return isoGrid;
})