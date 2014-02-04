package ld28.shaders;
import ld28.core.Program;

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
		uniform mat3 texCoordMatrix;
	
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
	
		void main(void) {
			
			vec3 tmp = vec3(aTexCoord, 1) * texCoordMatrix;
			vTexCoord = vec2(tmp.x, tmp.y);
			gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition, 1.0);
			
		}";
		
		fragmentShaderSource = "
		precision mediump float;
	
		varying vec2 vTexCoord;
			
		uniform sampler2D uImage0;
					
		void main(void)
		{"
			#if html5
			+"gl_FragColor = texture2D(uImage0, vTexCoord);"+
			#else
			+"gl_FragColor = texture2D(uImage0, vTexCoord).gbar;"+
			#end
		"}";
		
		super(vertexShaderSource, fragmentShaderSource);
	}
	
}