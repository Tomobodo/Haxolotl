package com.pixodrome.ld28;

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
	
	public function new(color : UInt, alpha : Float) 
	{
		var rMask : UInt = (0xff0000 & color) >> 16;
		var gMask : UInt = (0xff00 & color) >> 8;
		var bMask : UInt = 0xff & color;
		
		r = cast(rMask) / 255.0;
		g = cast(gMask) / 255.0;
		b = cast(bMask) / 255.0;
		a = alpha;
	}
	
}