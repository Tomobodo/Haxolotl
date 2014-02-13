package haxolotl.utils;
import lime.utils.Float32Array;

/**
 * ...
 * @author Thomas BAUDON
 */
class Color
{
	
	public var r : Float;
	public var g : Float;
	public var b : Float;
	public var a : Float;
	public var hex : Int;
	
	public var array : Float32Array;
	
	public function new(color : Int, alpha : Float = 1) 
	{
		hex = color;
		
		var rMask : Int = (0xff0000 & color) >> 16;
		var gMask : Int = (0xff00 & color) >> 8;
		var bMask : Int = 0xff & color;
		
		r = cast(rMask) / 255.0;
		g = cast(gMask) / 255.0;
		b = cast(bMask) / 255.0;
		a = alpha;
		
		array = new Float32Array([r, g, b, a]);
	}
}