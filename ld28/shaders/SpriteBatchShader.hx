package ld28.shaders;
import ld28.core.Program;

/**
 * ...
 * @author Thomas B
 */
class SpriteBatchShader extends Program
{

	public function new() 
	{
		vertexShaderSource = "
		attribute vec2 aVertPos;
		attribute vec2 aTexCoord;
		attribute vec2 aColor;
		
		varying vec2 vTexCoord;
		varying vec4 vColor;
		
		uniform mat4 projectionMatrix;
		
		void main(void) {
			gl_Position = projectionMatrix * vec4(aVertPos, 0.0, 1.0);
			vTexCoord = aTexCoord;
			vec3 color = mod(vec3(vColor.x / 65536.0, vColor.x / 256.0, vColor.x), 256.0) / 256.0;
			vColor = vec4(color, aColor.y);
		}";
		
		fragmentShaderSource = "
		precision mediump float;
	
		varying vec2 vTexCoord;
		varying vec4 vColor;
			
		uniform sampler2D uImage0;
					
		void main(void)
		{
			vec4 textureColor = texture2D(uImage0, vTexCoord) * vColor;"
			#if html5
			+"gl_FragColor = vec4(textureColor);"+
			#else
			+"gl_FragColor = vec4(textureColor).gbar;"+
			#end
		"}";
		
		super();
		
	}
	
}