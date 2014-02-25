package haxolotl.display;

import haxolotl.core.Program;
import haxolotl.display.DisplayObject;
import haxolotl.core.Scene;

/**
 * ...
 * @author Thomas B
 */
class DisplayObjectContainer extends DisplayObject
{
	public var numChildren : Int;
	
	public function new() 
	{
		super();
		
		children = new Array<DisplayObject>();
		numChildren = 0;
	}
	
	public function add(child : DisplayObject)
	{
		children.push(child);
		if (child.parent != null)
		{
			child.parent.remove(child);
		}
		child.parent = this;
		
		numChildren ++;
		
		if (scene != null)
		{
			child.scene = scene;
			child.__onAddedToStage();
		}
		
		child.ADDED.dispatch();
	}
	
	public function remove(child : DisplayObject)
	{
		child.parent = null;
		child.scene = null;
		children.remove(child);
		child.REMOVED.dispatch(); 
		
		numChildren --;
		
		if (scene != null)
			child.__onRemovedFromStage();
	}
	
	public function removeAll()
	{
		while(numChildren > 0) removeChildAt(0);
	}
	
	public function childAt(index : Int) : DisplayObject
	{
		return children[index];
	}
	
	public function removeChildAt(index : Int)
	{
		remove(children[index]);
	}
	
	override function __onAddedToStage()
	{
		super.__onAddedToStage();
		
		for (child in children)
		{
			child.scene = this.scene;
			child.__onAddedToStage();
		}
	}
	
	override function __onRemovedFromStage()
	{
		super.__onRemovedFromStage();
		
		for (child in children)
		{
			child.scene = null;
			child.__onRemovedFromStage();
		}
	}
	
	override public function testInput(iX:Float, iY:Float):Bool 
	{
		var nbChild = children.length;
		for (i in 0 ... (nbChild - 1))
		{
			var current = children[i];
			if (current.testInput(iX, iY)) 
				return true;
		}
		
		return false;
	}
	
	override public function get_width() : Float
	{
		var max : Float = 0;
		for (child in children)
			if (child.x + child.width > max)
				max = child.x + child.width;
		return max;
	}
	
	override public function get_height() : Float
	{
		var max : Float = 0;
		for (child in children)
			if (child.y + child.height > max)
				max = child.y + child.height;
		return max;
	}
}