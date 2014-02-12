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
	
	public var scaleX : Float;
	public var scaleY : Float;
	
	public var pivotX : Float;
	public var pivotY : Float;
	
	public var rotation : Float;
	
	public var width(get_width, null) : Float;
	public var height(get_height, null) : Float;
	
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
	
	var _width : Float;
	var _height : Float;
	
	var hover : Bool;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		_width = 0;
		_height = 0;
		
		pivotX = 0;
		pivotY = 0;
		
		scaleX = 1;
		scaleY = 1;
		
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
		iX -= x + pivotX;
		iY -= y + pivotY;
		
		//iX *= scaleX;
		//iY *= scaleY;
		
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
	
	public function get_width() : Float
	{
		return _width * scaleX;
	}
	
	public function get_height() : Float
	{
		return _height * scaleY;
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