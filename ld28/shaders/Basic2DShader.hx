package ld28.shaders;
import ld28.core.Program;

/**
 * ...
 * @author Thomas BAUDON
 */
class Basic2DShader extends Program
{

	public function new() 
	{
		vertexShaderSource = "
		attribute vec2 vertexPosition;
	
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
		
		void main(void) {
			gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition,0,1);
		}";
		
		fragmentShaderSource = "
		precision mediump float;
		uniform vec4 vertexColor;
		
		void main(void)
		{
			gl_FragColor = vec4(vertexColor);
		}";
		
		super();
	}
	
}