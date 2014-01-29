package ld28.shaders;
import ld28.core.Program;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatch2DShader extends Program
{

	public function new() 
	{
		vertexShaderSource = "
		attribute vec2 vertexPosition;
		attribute vec4 vertexColor;
		attribute vec2 aTexCoord;
		
		varying vec2 vTexCoord;
		uniform mat3 texCoordMatrix;
		
		uniform mat4 projectionMatrix;
		
		void main(void) {
			vec3 tmp = vec3(aTexCoord, 1) * texCoordMatrix;
			vTexCoord = vec2(tmp.x, tmp.y);
			gl_Position = projectionMatrix * vec4(vertexPosition, 0.0, 1.0);
		}";
		
		fragmentShaderSource = "
		precision mediump float;
	
		varying vec2 vTexCoord;
			
		uniform sampler2D uImage0;
					
		void main(void)
		{
			vec4 textureColor = texture2D(uImage0, vTexCoord);"
			#if html5
			+"gl_FragColor = vec4(textureColor);"+
			#else
			+"gl_FragColor = vec4(textureColor).gbar;"+
			#end
		"}";
		
		super();
		
	}
	
}