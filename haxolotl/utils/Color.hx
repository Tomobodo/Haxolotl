package haxolotl.utils;
import openfl.utils.Float32Array;

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
	public var hex : UInt;
	
	public var array : Float32Array;
	
	public function new(color : UInt, alpha : Float = 1) 
	{
		array = new Float32Array([1.0, 1.0, 1.0, 1.0]);
		
		set(color, alpha);
	}
	
	public function set(color : UInt, alpha : Float = 1)
	{
		hex = color;
		
		var rMask : UInt = (0xff0000 & color) >> 16;
		var gMask : UInt = (0xff00 & color) >> 8;
		var bMask : UInt = 0xff & color;
		
		r = cast(rMask) / 256.0;
		g = cast(gMask) / 256.0;
		b = cast(bMask) / 256.0;
		a = alpha;
		
		array[0] = r;
		array[1] = g;
		array[2] = b;
		array[3] = a;
	}
}