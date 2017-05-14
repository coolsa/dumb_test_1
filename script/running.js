define(['interface','isoGrid','codemirror','editor',
	'codemirror/mode/htmlmixed/htmlmixed'],function(interface, isoGrid, CodeMirror, editor){
	function running(){
		$(".center")[0].style.maxHeight = $(window).height()-100 + "px";
		this.grid = [];
		for(var x=0;x<5;x++){
			this.grid[x]=[];
			for(var y=0;y<3;y++){
				this.grid[x][y]=[];
				for(var z=0;z<5;z++){
					this.grid[x][y][z]={
						type:"repeating",
						dir:"empty"
					}
					if(y==0){
						this.grid[x][y][z].type="chain";
						this.grid[x][y][z].face="neg_z_cond";
					}
					if(y==1){
						this.grid[x][y][z].type="impulse";
						this.grid[x][y][z].face="pos_x_norm";
					}
					if(y==2){
						this.grid[x][y][z].type="repeating";
						this.grid[x][y][z].face="pos_y_cond";
					}
				}
			}
		}
		this.iso = new isoGrid();
		this.interface = new interface();
		this.interface.isoSize=(this.grid.length+this.grid[0][0].length);
		this.iso.render(this.grid);
		this.interface.resizeIso();
	}
	return running;
})