package haxolotl.core;
import flash.events.FocusEvent;
import msignal.Signal;

/**
 * ...
 * @author Thomas B
 */
class InteractiveObject
{
	private var stage : Stage;
	
	public var interactive(get_interactive, set_interactive) : Bool;
	
	public var x : Float;
	public var y : Float;
	
	public var rotation : Float;
	
	public var width : Float;
	public var height : Float;
	
	public var PRESSED : Signal1<InteractiveObject>;
	public var RELEASED : Signal1<InteractiveObject>;
	public var HOVERED : Signal1<InteractiveObject>;
	public var LEAVED : Signal1<InteractiveObject>;
	
	public var ADDED_TO_STAGE : Signal0;
	public var REMOVE_FROM_STAGE : Signal0;
	
	public var localTouchX : Int;
	public var localTouchY : Int;
	
	public var stageTouchX : Int;
	public var stageTouchY : Int;
	
	var _interactive : Bool;
	
	var hover : Bool;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		width = 0;
		height = 0;
		
		hover = false;
		
		ADDED_TO_STAGE = new Signal0();
		REMOVE_FROM_STAGE = new Signal0();
		
		interactive = true;
	}
	
	public function addedToStage(_stage : Stage) : Void
	{
		stage = _stage;
		ADDED_TO_STAGE.dispatch();
	}
	
	public function removedFromStage(_stage : Stage) : Void
	{
		REMOVE_FROM_STAGE.dispatch();
		stage = null;
	}
	
	public function testInput(iX : Float, iY : Float) : Bool
	{
		iX -= x;
		iY -= y;
		
		var inWidth = iX > 0 && iX < width;
		var inHeight = iY > 0 && iY < height;
		
		if (inWidth && inHeight)
			return true;
		else
		{
			if (hover)
				leaved(iX, iY);
			return false;
		}
	}
	
	public function pressed(_x : Float, _y : Float)
	{
		PRESSED.dispatch(this);
	}
	
	public function released(_x : Float, _y : Float)
	{
		RELEASED.dispatch(this);
	}
	
	public function hovered(_x : Float, _y : Float)
	{
		hover = true;
		HOVERED.dispatch(this);
	}
	
	public function leaved(_x : Float, _y : Float)
	{
		hover = false;
		LEAVED.dispatch(this);
	}
	
	function get_interactive() : Bool
	{
		return _interactive;
	}
	
	function set_interactive(value : Bool) : Bool
	{
		if (value = true && PRESSED == null)
		{
			PRESSED = new Signal1<InteractiveObject>();
			RELEASED = new Signal1<InteractiveObject>();
			HOVERED = new Signal1<InteractiveObject>();
			LEAVED = new Signal1<InteractiveObject>();
		}
		return _interactive = value;
	}
}