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
	var children : Array<DisplayObject>;
	
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
	
	override public function addedToStage(_stage : Stage) : Void
	{
		super.addedToStage(_stage);
		for (child in children)
			stage.add(child);
	}
	
	override public function removedFromStage(_stage : Stage) : Void
	{
		super.removedFromStage(_stage);
		for (child in children)
			stage.remove(child);
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
}