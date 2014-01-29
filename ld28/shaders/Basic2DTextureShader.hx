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
		attribute vec2 aTexCoord;
	
		uniform mat3 modelViewMatrix;
		uniform mat3 texCoordMatrix;
		uniform mat4 projectionMatrix;
		
		varying vec2 vTexCoord;
		
		void main(void) {
			vec3 tempCoord = vec3(aTexCoord, 1) * texCoordMatrix;
			vTexCoord = vec2(tempCoord.x, tempCoord.y);
			
			vec3 temp = vec3(vertexPosition,1.0) * modelViewMatrix;
			gl_Position = projectionMatrix * vec4(temp, 1.0);
		}";
		
		fragmentShaderSource = "
		precision mediump float;
		
		varying vec2 vTexCoord;

		uniform vec4 vertexColor;
		uniform sampler2D uImage0;
		
		void main(void)
		{
			vec4 textureColor = texture2D(uImage0, vTexCoord); "+
			#if html5
			"gl_FragColor = vec4(textureColor * vertexColor);" +
			#else
			"gl_FragColor = vec4(textureColor * vertexColor).gbar;" +
			#end
		"}";
		
		super();
	}
	
}