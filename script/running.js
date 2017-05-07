define(['isometric', 'interface'],function(isometric, interface){
	function running(){
		this.test = "test";
		this.iso = new isometric();
		this.interface = new interface();
	}
	return running;
})