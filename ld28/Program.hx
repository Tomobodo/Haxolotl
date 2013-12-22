package ld28;

import openfl.Assets;
import openfl.gl.GL;
import openfl.gl.GLProgram;
import openfl.gl.GLShader;

/**
 * ...
 * @author Thomas BAUDON
 */
class Program
{
	public var program : GLProgram;
	
	var vertexShaderSource : String;
	var fragmentShaderSource : String;
	
	var vertexShader : GLShader;
	var fragmentShader : GLShader;
	
	var compiled : Bool;
	
	var name : String;
	
	static var cache : Map<String, Program> = new Map<String, Program>();
	
	static var inUse : Program;
	
	public static function get(name : String) : Program
	{
		if (cache[name] == null)
			cache[name] = new Program(name);
		return cache[name];
	}
	
	function new(name : String) 
	{
		inUse = null;
		var vertexShaderPath = "shaders/" + name + "/" + name + ".vert";
		var fragmentShaderPath = "shaders/" + name + "/" + name + ".frag";
		
		this.vertexShaderSource = Assets.getText(vertexShaderPath);
		this.fragmentShaderSource = Assets.getText(fragmentShaderPath);
		
		compiled = false;
		
		compile();
	}
	
	function compile() 
	{
		createVertexShader();
		createFragmentShader();
		
		program = GL.createProgram();
		
		GL.attachShader(program, vertexShader);
		GL.attachShader(program, fragmentShader);
		GL.linkProgram(program);
	}
	
	function createVertexShader() 
	{
		vertexShader = GL.createShader(GL.VERTEX_SHADER);
		GL.shaderSource(vertexShader, vertexShaderSource);
		GL.compileShader(vertexShader);
		
		if (GL.getShaderParameter (vertexShader, GL.COMPILE_STATUS) == 0)
		{
			var error = GL.getShaderInfoLog(vertexShader);
			throw "Error compiling " + name + " vertex shader : " + error;
		}else {
			compiled = true;
		}
	}
	
	function createFragmentShader()
	{
		fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);
		GL.shaderSource(fragmentShader, fragmentShaderSource);
		GL.compileShader(fragmentShader);
		
		if (GL.getShaderParameter (fragmentShader, GL.COMPILE_STATUS) == 0)
		{
			var error = GL.getShaderInfoLog(vertexShader);
			throw "Error compiling " + name + " fragment shader : " + error;
		}
	}
	
	public function dispose() : Void
	{
		GL.deleteProgram(program);
	}
	
	public function use() : Void
	{
		GL.useProgram(program);
		if (inUse != this)
			inUse = this;
	}
	
}