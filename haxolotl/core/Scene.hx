package haxolotl.core;
import flash.geom.Matrix3D;
import haxolotl.core.IDrawable;
import haxolotl.display.DisplayObject;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.geom.Rectangle;

/**
 * ...
 * @author Thomas BAUDON
 */
class Scene extends DisplayObjectContainer
{
	var interractiveChildren : List<InteractiveObject>;
	
	var viewport : Rectangle;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		super();
		interactive = true;
		scene = this;
		
		interractiveChildren = new List<InteractiveObject>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
		baseWidth = _viewport.width;
		baseHeight = _viewport.height;
	}
	
	override public function add(_child : DisplayObject)
	{
		super.add(_child);
		if (_child.interactive) addInterractiv(_child);
	}
	
	public function addInterractiv(_child : InteractiveObject)
	{
		interractiveChildren.push(_child);
	}
	
	public function removeInterractiv(_child : InteractiveObject)
	{
		interractiveChildren.remove(_child);
	}
	
	override public function remove(_child : DisplayObject)
	{
		super.remove(_child);
		removeInterractiv(_child);
	}
	
	override public function pressed(_x : Float, _y : Float)
	{
		super.pressed(_x, _y);
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				a.pressed(_x, _y);
				break;
			}
		}
	}
	
	override public function released(_x : Float, _y : Float)
	{
		super.released(_x, _y);
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				a.released(_x, _y);
				break;
			}
		}
	}
	
	override public function hovered(_x : Float, _y : Float)
	{
		super.hovered(_x, _y);
		var firstHovered : Bool = false;
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				if(!firstHovered)
					a.hovered(_x, _y);
				else
					a.leaved(_x, _y);
			}
		}
	}
	
	override public function get_width() : Float
	{
		return baseWidth;
	}
	
	override public function get_height() : Float
	{
		return baseHeight;
	}
}