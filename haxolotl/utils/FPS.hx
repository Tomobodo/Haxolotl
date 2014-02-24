package haxolotl.utils;
import haxolotl.text.Font;
import haxolotl.text.Text;
import haxolotl.text.TextFormat;

/**
 * ...
 * @author Thomas B
 */
class FPS extends Text
{
	
	var sampleSize : UInt;
	var sampleSum : Float;
	var frameCounter : UInt;
	
	public var fps : UInt;
	
	public function new(format : TextFormat, _sampleSize : UInt = 30) 
	{
		super( "FPS : ", format);
		sampleSize = _sampleSize;
		sampleSum = 0;
		frameCounter = 0;
		fps = 0;
	}
	
	public function update(deltaTime : Float) 
	{
		sampleSum += deltaTime;
		if (frameCounter == sampleSize)
		{
			var sampleMoy : Float = sampleSum  / sampleSize;
			fps = Std.int(1 / sampleMoy);
			frameCounter = 0;
			sampleSum = 0;
			text = "FPS : " + fps;
		}
		frameCounter++;
	}
}