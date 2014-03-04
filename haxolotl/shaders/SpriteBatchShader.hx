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
		attribute vec4 aColor;
		
		varying vec4 vCol;
		varying vec2 vTexCoord;
		
		uniform vec2 viewport;
		
		void main(void) 
		{
			vec2 vp = viewport / 2.0;
			gl_Position = vec4((aVertPos.x/vp.x)-1.0,(aVertPos.y/-vp.y)+1.0, 0.0, 1.0);
			vCol = aColor;
			vTexCoord = aTexCoord;
		}";

		fragmentShaderSource =
        #if !desktop
		"precision lowp float;" +
        #end
		"
		varying vec2 vTexCoord;
		varying vec4 vCol;
		
		uniform sampler2D uImage0;
					
		void main(void)
		{
			vec4 tCol = texture2D(uImage0, vTexCoord);
			"
			#if !html5
			+"
			tCol = tCol.gbar;
			"
			#end
			+"
			gl_FragColor = tCol * vCol;// vec4(tCol.x * vCol.x, tCol.y * vCol.y, tCol.z * vCol.z, tCol.w) * vCol.w;
		}";
		
		super();
		
	}
	
}