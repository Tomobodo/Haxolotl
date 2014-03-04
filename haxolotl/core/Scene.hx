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
	var interactiveChildren : List<InteractiveObject>;
	
	public var viewport : Rectangle;
	
	public function new() 
	{
		super();
		interactive = true;
		scene = this;
		
		interactiveChildren = new List<InteractiveObject>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		viewport = _viewport;
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
		interactiveChildren.push(_child);
	}
	
	public function removeInterractiv(_child : InteractiveObject)
	{
		interactiveChildren.remove(_child);
	}
	
	override public function remove(_child : DisplayObject)
	{
		super.remove(_child);
		removeInterractiv(_child);
	}
	
	override public function pressed(_x : Float, _y : Float)
	{
		super.pressed(_x, _y);
		for (a in interactiveChildren)
		{
			if (!a.interactive)
			{
				interactiveChildren.remove(a);
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
		for (a in interactiveChildren)
		{
			if (!a.interactive)
			{
				interactiveChildren.remove(a);
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
		for (a in interactiveChildren)
		{
			if (!a.interactive)
			{
				interactiveChildren.remove(a);
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