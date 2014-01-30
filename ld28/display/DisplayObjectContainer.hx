package ld28.display;

import ld28.core.Program;
import ld28.display.DisplayObject;
import ld28.Scene;

/**
 * ...
 * @author Thomas B
 */
class DisplayObjectContainer extends DisplayObject
{
	
	var children : List<DisplayObject>;

	public function new() 
	{
		super(null);
		
		children = new List<DisplayObject>();
	}
	
	public function add(child : DisplayObject)
	{
		children.push(child);
		child.parent = this;
	}
	
	public function remove(child : DisplayObject)
	{
		children.remove(child);
		child.parent = null;
	}
	
	override public function draw(scene : Scene)
	{
		updateMatrix();
		
		for (child in children)
			child.draw(scene);
	}
	
	override function get_width() : Float
	{
		var minX : Float = 100000;
		var maxX : Float = -100000;
		
		for (child in children)
		{
			if (child.x < minX)
				minX = child.x;
			if (child.x + child.width > maxX)
				maxX = child.x + child.width;
		}
		
		return (maxX - minX) * scaleX;
	}
	
	override function get_height() : Float
	{
		var minY : Float = 100000;
		var maxY : Float = -100000;
		
		for (child in children)
		{
			if (child.y < minY)
				minY = child.y;
			if (child.y + child.height > maxY)
				maxY = child.y + child.height;
		}
		
		return (maxY - minY) * scaleY;
	}
	
}