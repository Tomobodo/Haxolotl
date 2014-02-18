package haxolotl.utils;
import haxolotl.core.Font;
import haxolotl.display.TextField;

/**
 * ...
 * @author Thomas B
 */
class FPS extends TextField
{
	
	var sampleSize : UInt;
	var sampleSum : Float;
	var frameCounter : UInt;
	
	public var fps : UInt;
	
	public function new(font : Font, size : UInt = 12, color : UInt = 0x000000, _sampleSize : UInt = 60) 
	{
		super(font, "FPS : ", color);
		sampleSize = _sampleSize;
		sampleSum = 0;
		UPDATED.add(onUpdated);
		frameCounter = 0;
		fps = 0;
	}
	
	function onUpdated(deltaTime : Float) 
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