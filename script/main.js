requirejs.config({
	baseUrl: 'resources/library'
})
	//testeronivar s
requirejs(['crafty'],
function ($){
	//window.onload = function() {
	Crafty.init();
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
	iso = Crafty.isometric.size(32);
	var z=0;
	for(var x=0;x<16;x++){
		for(var y=0;y<32;y++){
			for(var z=0;z<3;z++){
				var tile = Crafty.e("2D", "Canvas", "Mouse", "impulse")
				.attr('z',y+z*32)//
				.areaMap(16,0, 0,8, 0,24, 16,32, 32,24, 32,8) //series of points defining area
				.bind("drawFace",function(dir){
					drawWith(this._x,this._y,this._z,iso,this,dir);
					drawWith(this._x,this._y,this._z,iso,this,"empty");
				})
				.bind("Click",function(e){
					console.log(e.button);
					this.destroy();
				}).bind("MouseOver",function(e){
					this._children[2].sprite("select");
				}).bind("MouseOut",function(e){
					this._children[2].sprite("empty");
				});
				iso.place(x,y,z*2,tile);
				if(z==0)tile.sprite("chain").trigger("drawFace","pos_z_norm");
				if(z==1)tile.trigger("drawFace","pos_x_norm");
				if(z==2)tile.sprite("repeating").trigger("drawFace","neg_y_cond");
			}
		}
	}
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
	function drawWith(x,y,z,iso,parent,sprite){
		px = iso.px2pos(x,y);
		child=parent._children.length;
		parent.attach(Crafty.e("2D","Canvas",sprite).attr('z',z));
		iso.place(px.x,px.y,0,parent._children[child]);
	}
	// function placeAt(x,y,z,obj,iso){
	// 	px = iso.px2pos(x,y);
	// 	iso.place(px.x,px.y,z,obj);
	// }
});