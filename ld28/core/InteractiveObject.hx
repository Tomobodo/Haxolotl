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
	
	public var enabled(default, set_enabled) : Bool;
	
	public var x : Float;
	public var y : Float;
	
	public var rotation : Float;
	
	public var width : Float;
	public var height : Float;
	
	public var TOUCH_DOWN : Signal0;
	public var TOUCH_UP : Signal0;
	public var TOUCH_MOVE : Signal0;
	
	public var localTouchX : Int;
	public var localTouchY : Int;
	
	public var stageTouchX : Int;
	public var stageTouchY : Int;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		width = 0;
		height = 0;
		
		enabled = false;
	}
	
	public function addedToStage(_stage : Stage) : Void
	{
		stage = _stage;
	}
	
	public function removedFromStage(_stage : Stage) : Void
	{
		stage = null;
	}
	
	function set_enabled(value : Bool) : Bool
	{
		if (value = true && TOUCH_DOWN == null)
		{
			TOUCH_DOWN = new Signal0();
			TOUCH_UP = new Signal0();
			TOUCH_MOVE = new Signal0();
		}
		return enabled = value;
	}
}