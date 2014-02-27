package haxolotl.shaders;
import haxolotl.core.Program;

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
		
		varying vec2 vColor;
		varying vec2 vTexCoord;
		
		uniform vec2 viewport;
		
		void main(void) 
		{
			vec2 vp = viewport / 2.0;
			gl_Position = vec4((aVertPos.x/vp.x)-1.0,(aVertPos.y/-vp.y)+1.0, 0.0, 1.0);
			vColor = aColor;
			vTexCoord = aTexCoord;
		}";

		fragmentShaderSource =
        #if !desktop
		"precision lowp float;" +
        #end
		"
		varying vec2 vTexCoord;
		varying vec2 vColor;
		
		uniform sampler2D uImage0;
					
		void main(void)
		{
			vec3 col = mod(vec3(vColor.y / 65536.0, vColor.y / 256.0, vColor.y), 256.0) / 256.0;
			vec4 finalColor = vec4(col, vColor.x);
			vec4 textureColor = texture2D(uImage0, vTexCoord);"
			#if html5
			+"
			gl_FragColor = textureColor;// * finalColor; "+
			#else
			+"
			gl_FragColor = (textureColor * finalColor.argb).gbar;"+
			#end
		"
		}";
		
		super();
		
	}
	
}