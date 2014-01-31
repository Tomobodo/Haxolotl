package ld28.display;
import ld28.utils.Color;
import ld28.core.Scene;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject
{
	public var x : Float;
	public var y : Float;
	
	public var rotation : Float;
	
	public var scaleX : Float;
	public var scaleY : Float;
	
	public var pivotX : Float;
	public var pivotY : Float;
	
	public var width : Float;
	public var height : Float;
	
	public var interractive : Bool;
	
	public var color : Color;
	
	public var alpha : Float;
	
	public var parent : DisplayObjectContainer;
	
	public var scene : Scene;
	
	// signal addedToScene;
	// signal removedFromScene;
	
	// signal added;
	// signal remoced;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		scaleX = 1;
		scaleY = 1;
		
		pivotX = 0;
		pivotY = 0;
		
		alpha = 1;
		
		interractive = false;
		
		color = new Color(0xffffff);
	}
	
	public function addedToScene(_scene : Scene) : Void
	{
		scene = _scene;
		// dispatch signal addedToScene(scene);
	}
	
	public function removedFromScene(_scene : Scene) : Void
	{
		scene = null;
		// dispatch signal removedFromScene(scene);
	}
	
	public function added(_parent : DisplayObjectContainer) : Void
	{
		parent = _parent;
		// dispatch signal added(parent);
	}
	
	public function removed(_parent : DisplayObjectContainer) : Void
	{
		parent = null;
		// dispatch signal removed(parent);
	}
}