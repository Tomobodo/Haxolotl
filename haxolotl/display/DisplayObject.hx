package haxolotl.display;
import haxolotl.core.InteractiveObject;
import haxolotl.core.Primitive;
import haxolotl.core.TextureRegion;
import haxolotl.utils.Color;
import haxolotl.core.Stage;
import haxolotl.core.InteractiveObject;
import msignal.Signal.Signal0;
import msignal.Signal.Signal1;

/**
 * ...
 * @author Thomas BAUDON
 */
class DisplayObject extends InteractiveObject
{
	public var color : Int;
	public var alpha(get_alpha, set_alpha) : Float;
	
	public var prim : Primitive;
	public var texture : TextureRegion;
	
	public var next : DisplayObject;
	public var prev : DisplayObject;
	
	public var ADDED : Signal0;
	public var REMOVED : Signal0;
	
	public var UPDATED : Signal1<Float>;
	
	// not proud of it
	public var children : Array<DisplayObject>;
	
	var _alpha : Float;
	
	function new() 
	{
		super();
		
		_alpha = 1;
		
		color = 0xffffff;
		
		ADDED = new Signal0();
		REMOVED = new Signal0();
		
		UPDATED = new Signal1<Float>();
	}
	
	public function update(deltaTime : Float)
	{
		UPDATED.dispatch(deltaTime);
	}
	
	public function __onAddedToStage()
	{
		ADDED_TO_STAGE.dispatch();
	}
	
	public function __onRemovedFromStage()
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