package haxolotl.utils;
import haxolotl.geom.Rectangle;

/**
 * ...
 * @author Thomas B
 */
class BoundingBox
{
	
	public var x : Float;
	public var y : Float;
	public var z : Float;
	
	public var width : Float;
	public var height : Float;
	public var depth : Float;

	public function new(_x : Float = 0, _y : Float = 0, _z: Float  = 0, _w : Float = 0, _h : Float = 0, _d : Float = 0) 
	{
		x = _x;
		y = _y;
		z = _z;
		
		width = _w;
		height = _h;
		depth = _d;
	}
	
	public function get2D() : Rectangle
	{
		return new Rectangle(x, y, width, height);
	}
	
}