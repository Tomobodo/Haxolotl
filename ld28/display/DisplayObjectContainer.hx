package ld28.display;

import ld28.core.Program;
import ld28.display.DisplayObject;
import ld28.core.Scene;

/**
 * ...
 * @author Thomas B
 */
class DisplayObjectContainer extends DisplayObject
{
	var children : List<DisplayObject>;
	
	/*
	 * on added to scene, addChildrenToScene
	 */
	
	public function new() 
	{
		super(null);
		
		children = new List<DisplayObject>();
	}
	
	public function add(child : DisplayObject)
	{
		children.push(child);
		child.added(this);
	}
	
	public function remove(child : DisplayObject)
	{
		children.remove(child);
		child.removed(this);
	}
	
	override public function addedToScene(_scene : Scene) : Void
	{
		scene = _scene;
		for (child in children)
			scene.add(child);
		// dispatch addedToScene
	}
}