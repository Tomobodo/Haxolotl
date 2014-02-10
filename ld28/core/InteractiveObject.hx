package ld28.core;
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
	
	public var PRESSED : Signal0;
	public var RELEASED : Signal0;
	public var HOVERED : Signal0;
	
	public var ADDED_TO_STAGE : Signal0;
	public var REMOVE_FROM_STAGE : Signal0;
	
	public var localTouchX : Int;
	public var localTouchY : Int;
	
	public var stageTouchX : Int;
	public var stageTouchY : Int;
	
	var _interactive : Bool;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		width = 0;
		height = 0;
		
		ADDED_TO_STAGE = new Signal0();
		REMOVE_FROM_STAGE = new Signal0();
		
		_interactive = false;
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
			return false;
	}
	
	public function pressed(_x : Float, _y : Float)
	{
		PRESSED.dispatch();
	}
	
	public function released(_x : Float, _y : Float)
	{
		RELEASED.dispatch();
	}
	
	public function hovered(_x : Float, _y : Float)
	{
		HOVERED.dispatch();
	}
	
	function get_interactive() : Bool
	{
		return _interactive;
	}
	
	function set_interactive(value : Bool) : Bool
	{
		if (value = true && PRESSED == null)
		{
			PRESSED = new Signal0();
			RELEASED = new Signal0();
			HOVERED = new Signal0();
		}
		return _interactive = value;
	}
}