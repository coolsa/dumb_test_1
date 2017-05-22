define([],function(){
  function compiler(compiled,editor){
    this.compiled = compiled;
    this.editor = editor;
    this.compiled.text("testeroni");
  }
  compiler.prototype = {
    fancy: function(){
      this.compiled.text(this.editor.getValue());
    }
  }
  return compiler;
});
