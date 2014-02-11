package haxolotl.shaders;
import haxolotl.core.Program;

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
	
		uniform mat4 texCoordMatrix;
		
		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;
		
		varying vec2 vTexCoord;
		
		void main(void) {
			vec4 tempCoord = vec4(aTexCoord, 0, 1) * texCoordMatrix;
			vTexCoord = vec2(tempCoord.x, tempCoord.y);
			
			gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition,0,1);
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