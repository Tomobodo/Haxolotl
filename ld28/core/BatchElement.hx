package ld28.core;

import flash.display.Bitmap;
import ld28.display.DisplayObject;
import ld28.utils.Color;

/**
 * ...
 * @author Thomas B
 */
class BatchElement
{
	public var previous : BatchElement;
	public var next : BatchElement;
	
	public var object : DisplayObject;
	
	public var x1 : Float;
	public var x2 : Float;
	
	public var y1 : Float;
	public var y2 : Float;
	
	public var u1 : Float;
	public var u2 : Float;
	
	public var v1 : Float;
	public var v2 : Float;
	
	public var color : Color;
	public var alpha : Float;

	public function new(_object : DisplayObject) 
	{
		object = _object;
		update();
	}
	
	public function update()
	{
		x1 = object.x;
		x2 = object.x + object.width;
		
		y1 = object.y;
		y2 = object.y + object.height;
		
		u1 = object.texture.region.x;
		u2 = object.texture.region.x + object.texture.region.width;
		
		v1 = object.texture.region.y;
		v2 = object.texture.region.y + object.texture.region.height;
		
		color = object.color;
		alpha = object.alpha * object.color.a;
	}
}