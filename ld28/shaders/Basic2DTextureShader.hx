package ld28.shaders;
import ld28.core.Program;

/**
 * ...
 * @author Thomas BAUDON
 */
class Basic2DTextureShader extends Program
{

	public function new() 
	{
		vertexShaderSource = "
		attribute vec2 vertexPosition;
	
		uniform mat3 modelViewMatrix;
		uniform mat4 projectionMatrix;
		
		void main(void) {
			vec3 temp = vec3(vertexPosition,1.0) * modelViewMatrix;
			gl_Position = projectionMatrix * vec4(temp, 1.0);
		}";
		
		fragmentShaderSource = "
		precision mediump float;
		uniform vec4 vertexColor;
		
		void main(void)
		{
			
			gl_FragColor = vertexColor;
		}";
		
		super();
	}
	
}