package haxolotl.display;

import haxolotl.core.Program;
import haxolotl.display.DisplayObject;
import haxolotl.core.Stage;

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
		child.parent = this;
		child.ADDED.dispatch();
		
		numChildren ++;
		
		if (stage != null)
		{
			child.stage = stage;
			child.__onAddedToStage();
		}
	}
	
	override public function update()
	{
		super.update();
		for (child in children)
			child.update();
	}
	
	public function remove(child : DisplayObject)
	{
		child.parent = null;
		child.stage = null;
		children.remove(child);
		child.REMOVED.dispatch(); 
		
		numChildren --;
		
		if (stage != null)
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
	
	override public function __onAddedToStage()
	{
		super.__onAddedToStage();
		
		for (child in children)
		{
			child.stage = this.stage;
			child.__onAddedToStage();
		}
	}
	
	override public function __onRemovedFromStage()
	{
		super.__onRemovedFromStage();
		
		for (child in children)
		{
			child.stage = null;
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