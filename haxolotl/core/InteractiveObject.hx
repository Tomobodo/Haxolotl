package haxolotl.core;
import flash.events.FocusEvent;
import flash.geom.Matrix;
import flash.geom.Point;
import msignal.Signal;
import haxolotl.display.DisplayObjectContainer;

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
	
	public var parent : DisplayObjectContainer;
	
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
	
	public var transform(get_transform, null) : Matrix;
	
	
	public var baseWidth : Float;
	public var baseHeight : Float;
	
	var _interactive : Bool;
	var _transform : Matrix;
	var hover : Bool;

	public function new() 
	{
		x = 0;
		y = 0;
		
		rotation = 0;
		
		baseWidth = 0;
		baseHeight = 0;
		
		pivotX = 0;
		pivotY = 0;
		
		scaleX = 1;
		scaleY = 1;
		
		hover = false;
		
		_transform = new Matrix();
		
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
		var point = new Point(iX, iY);
		
		var transformInvert = transform.clone();
		transformInvert.invert();
		point = transformInvert.transformPoint(point);
		
		var inWidth = point.x > 0 && point.x < width;
		var inHeight = point.y > 0 && point.y < height;
		
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
	
	public function get_transform() : Matrix
	{
		_transform.identity();
		
		_transform.translate( -pivotX, -pivotY);
		_transform.scale(scaleX, scaleY);
		_transform.rotate(rotation);
		_transform.translate(x, y);
		
		if (parent != null)
			_transform.concat(parent.transform);
		
		return _transform;
	}
	
	public function get_width() : Float
	{
		return Math.abs(baseWidth * scaleX);
	}
	
	public function get_height() : Float
	{
		return Math.abs(baseHeight * scaleY);
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