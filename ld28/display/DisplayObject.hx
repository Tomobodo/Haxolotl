package ld28.display;
import ld28.core.InteractiveObject;
import ld28.core.Primitive;
import ld28.core.TextureRegion;
import ld28.utils.Color;
import ld28.core.Stage;
import ld28.core.InteractiveObject;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject extends InteractiveObject
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
	
	public var color : Color;
	public var alpha : Float;
	
	public var parent : DisplayObjectContainer;
	
	public var prim : Primitive;
	public var texture : TextureRegion;
	
	public var next : DisplayObject;
	public var prev : DisplayObject;
	
	// signal added;
	// signal remoced;

	function new() 
	{
		super();
		
		x = 0;
		y = 0;
		
		rotation = 0;
		
		scaleX = 1;
		scaleY = 1;
		
		pivotX = 0;
		pivotY = 0;
		
		alpha = 1;
		
		color = new Color(0xffffff);
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
	
	public function update()
	{
		
	}
}