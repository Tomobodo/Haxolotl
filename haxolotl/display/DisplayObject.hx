package haxolotl.display;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Primitive;
import haxolotl.core.TextureRegion;
import haxolotl.utils.Color;
import haxolotl.core.Stage;
import haxolotl.core.InteractiveObject;
import msignal.Signal.Signal0;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject extends InteractiveObject
{
	public var color : Int;
	public var alpha : Float;
	
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
		
		alpha = 1;
		
		color = 0xffffff;
		
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