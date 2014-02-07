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
		attribute vec4 aColor;
		
		varying vec4 vColor;
		varying vec2 vTexCoord;
		
		uniform mat4 projectionMatrix;
		
		void main(void) 
		{
			gl_Position = projectionMatrix * vec4(aVertPos, 0.0, 1.0);
			vColor = aColor;
			vTexCoord = aTexCoord;
		}";

		fragmentShaderSource =
        #if !desktop
		"precision mediump float;" +
        #end
		"
		varying vec2 vTexCoord;
		varying vec4 vColor;
		
		uniform sampler2D uImage0;
					
		void main(void)
		{
			vec4 textureColor = texture2D(uImage0, vTexCoord);"
			#if html5
			+"
			gl_FragColor = textureColor * vColor;"+
			#else
			+"
			gl_FragColor = (textureColor * vColor.argb).gbar;"+
			#end
		"
		}";
		
		super();
		
	}
	
}