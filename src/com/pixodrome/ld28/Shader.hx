package com.pixodrome.ld28;
import openfl.gl.GL;
import openfl.gl.GLProgram;
import openfl.gl.GLShader;

/**
 * ...
 * @author Thomas BAUDON
 */
class Shader
{
	
	var program : GLProgram;
	
	var vertexShaderSource : String;
	var fragmentShaderSource : String;
	
	var vertexShader : GLShader;
	var fragmentShader : GLShader;

	public function new(vertexShaderSource : String, fragmentShaderSource : String) 
	{
		this.vertexShaderSource = vertexShaderSource;
		this.fragmentShaderSource = fragmentShaderSource;
		
		compile();
	}
	
	function compile() 
	{
		createVertexShader();
		createFragmentShader();
		
		program = GL.createProgram();
	}
	
	function createVertexShader() 
	{
		vertexShader = GL.createShader(GL.VERTEX_SHADER);
		GL.shaderSource(vertexShader, vertexShaderSource);
		GL.compileShader (vertexShader);
		
		if (GL.getShaderParameter (vertexShader, GL.COMPILE_STATUS) == 0)
		{
			var error = GL.getShaderInfoLog(vertexShader);
			throw "Vertex shader error : " + error;
		}
	}
	
	function createFragmentShader()
	{
		fragmentShader = GL.createShader(GL.FRAGMENT_SHADER);
		GL.shaderSource(fragmentShader, fragmentShaderSource);
		GL.compileShader (shaderSource);
		
		if (GL.getShaderParameter (fragmentShader, GL.COMPILE_STATUS) == 0)
		{
			var error = GL.getShaderInfoLog(vertexShader);
			throw "Fragment shader error : " + error;
		}
	}
	
}