package ld28.display;

import ld28.core.Program;
import ld28.display.DisplayObject;

/**
 * ...
 * @author Thomas B
 */
class DisplayObjectContainer extends DisplayObject
{
	var children : Array<DisplayObject>;
	
	/*
	 * on added to scene, addChildrenToScene
	 */
	
	function new() 
	{
		super();
		
		children = new Array<DisplayObject>();
	}
	
	public function add(child : DisplayObject)
	{
		children.push(child);
		child.added(this);
		if (stage != null && stage != this)
			stage.add(child);
	}
	
	public function remove(child : DisplayObject)
	{
		children.remove(child);
		child.removed(this);
		if (stage != null && stage != this)
			stage.remove(child);
	}
	
	override public function testInput(iX:Float, iY:Float):Bool 
	{
		var nbChild = children.length;
		for (i in (nbChild - 1) ... 0)
		{
			var current : DisplayObject = children[i];
			if (current.testInput(iX, iY)) return true;
		}
		return false;
	}
	
}