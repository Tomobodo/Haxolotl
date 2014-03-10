package haxolotl.display;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Primitive;
import haxolotl.core.TextureRegion;
import haxolotl.utils.Color;
import haxolotl.core.Scene;
import haxolotl.core.InteractiveObject;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

/**
 * ...
 * @author Thomas BAUDON
 */
@:allow(haxolotl.display.DisplayObjectContainer)
class DisplayObject extends InteractiveObject
{
	public var color : UInt;
	public var alpha(get_alpha, set_alpha) : Float;
	
	public var prim : Primitive;
	public var texture : TextureRegion;
	
	public var ADDED : Signal0;
	public var REMOVED : Signal0;
	
	// not proud of it
	public var children : Array<DisplayObject>;
	
	var _alpha : Float;
	
	public function new() 
	{
		super();
		
		_alpha = 1;
		color = 0xffffff;
		
		ADDED = new Signal0();
		REMOVED = new Signal0();
	}
	
	function __onAddedToStage()
	{
		ADDED_TO_STAGE.dispatch();
	}
	
	function __onRemovedFromStage()
	{
		REMOVE_FROM_STAGE.dispatch();
	}
	
	public function get_alpha() : Float
	{
		if (parent != null)
			return _alpha * parent.alpha;
		return  _alpha;
	}
	
	public function set_alpha(alpha : Float) : Float
	{
		return _alpha = alpha;
	}
}