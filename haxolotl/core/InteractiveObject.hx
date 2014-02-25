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
	public var scene : Scene;
	
	public var interactive(default, set) : Bool;
	
	public var x : Float;
	public var y : Float;
	
	public var parent : DisplayObjectContainer;
	
	public var scaleX : Float;
	public var scaleY : Float;
	
	public var pivotX : Float;
	public var pivotY : Float;
	
	public var rotation : Float;
	
	public var width(get_width, set_width) : Float;
	public var height(get_height, set_height) : Float;
	
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
	
	var _transform : Matrix;
	var hover : Bool;

	public function new() 
	{
		PRESSED = new Signal1<InteractiveObject>();
		RELEASED = new Signal1<InteractiveObject>();
		HOVERED = new Signal1<InteractiveObject>();
		LEAVED = new Signal1<InteractiveObject>();
			
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
		
		interactive = false;
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
		if (scaleX != 1 || scaleY != 1 || rotation != 0)
		{
			_transform.translate( -pivotX, -pivotY);
			_transform.scale(scaleX, scaleY);
			_transform.rotate(rotation);
			_transform.translate(x, y);
		}
		else
		{
			_transform.tx = x - pivotX;
			_transform.ty = y - pivotY;
		}
		
		if (parent != null && parent != scene)
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
	
	public function set_width(value : Float) : Float
	{
		scaleX = value / baseWidth;
		return width;
	}
	public function set_height(value : Float) : Float 
	{
		scaleY = value / baseHeight;
		return height;
	}
	
	public function set_interactive(value : Bool) : Bool
	{
		if (scene != null)
			if(value == true)
				scene.addInterractiv(this);
			else	
				scene.removeInterractiv(this);
		return interactive = value;
	}
}