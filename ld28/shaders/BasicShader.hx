package ld28.shaders;
import ld28.shaders.Program;

/**
 * ...
 * @author Thomas BAUDON
 */
class BasicShader extends Program
{

	public function new() 
	{
		vertexShaderSource = "
			attribute vec3 vertexPosition;
			attribute vec4 vertexColor;

			attribute vec2 aTexCoord;

			varying vec2 vTexCoord;
        
			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;
        
			void main(void) {
				vTexCoord = aTexCoord;
				gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
			}
		";
		
		fragmentShaderSource = "
			precision mediump float;
        
			varying vec2 vTexCoord;
                
			uniform sampler2D uImage0;
                        
			void main(void)
			{
				gl_FragColor = texture2D(uImage0, vTexCoord);
			}
		";
		
		super();
	}
	
}