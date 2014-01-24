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
	
}