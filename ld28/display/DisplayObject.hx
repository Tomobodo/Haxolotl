package ld28.display;
import ld28.core.InteractiveObject;
import ld28.core.Primitive;
import ld28.core.TextureRegion;
import ld28.utils.Color;
import ld28.core.Stage;
import ld28.core.InteractiveObject;
import msignal.Signal.Signal0;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject extends InteractiveObject
{
	public var scaleX : Float;
	public var scaleY : Float;
	
	public var pivotX : Float;
	public var pivotY : Float;
	
	public var color : Color;
	public var alpha : Float;
	
	public var parent : DisplayObjectContainer;
	
	public var prim : Primitive;
	public var texture : TextureRegion;
	
	public var next : DisplayObject;
	public var prev : DisplayObject;
	
	public var ENTER_FRAME : Signal0;
	
	public var ADDED : Signal0;
	public var REMOVED : Signal0;
	
	function new() 
	{
		super();
		
		scaleX = 1;
		scaleY = 1;
		
		pivotX = 0;
		pivotY = 0;
		
		alpha = 1;
		
		color = new Color(0xffffff);
		
		ENTER_FRAME = new Signal0();
		ADDED = new Signal0();
		REMOVED = new Signal0();
	}
	
	public function added(_parent : DisplayObjectContainer) : Void
	{
		parent = _parent;
		ADDED.dispatch();
	}
	
	public function removed(_parent : DisplayObjectContainer) : Void
	{
		parent = null;
		REMOVED.dispatch();
	}
	
	public function update()
	{
		ENTER_FRAME.dispatch();
	}
}