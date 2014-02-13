package haxolotl.core;

import haxolotl.core.IDrawable;
import haxolotl.display.DisplayObject;
import haxolotl.display.DisplayObjectContainer;
import haxolotl.geom.Rectangle;
import lime.utils.Matrix3D;

/**
 * ...
 * @author Thomas BAUDON
 */
class Stage extends DisplayObjectContainer implements IDrawable
{
	var drawableChildren : List<IDrawable>;
	
	var interractiveChildren : List<InteractiveObject>;
	
	var viewport : Rectangle;
	
	var batchMap : Map<String, MultipleSpriteBatch>;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		super();
		interactive = true;
		stage = this;
		batchMap = new Map<String, MultipleSpriteBatch>();
		drawableChildren = new List<IDrawable>();
		interractiveChildren = new List<InteractiveObject>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
		baseWidth = _viewport.width;
		baseHeight = _viewport.height;
	}
	
	public function draw():Void 
	{
		for (object in drawableChildren)
		{
			object.setProjectionMatrix(projectionMatrix);
			object.draw();
		}
	}
	
	override public function update()
	{
		for (child in children)
			child.update();
		super.update();
	}
	
	override public function add(_child : DisplayObject)
	{
		_child.stage = this;
		_child.__onAddedToStage();
		
		if (_child.parent == null)
		{
			_child.parent = this;
			_child.ADDED.dispatch();
		}
		
		children.push(_child);
		
		if (_child.interactive)
			interractiveChildren.push(_child);
		
		if (_child.prim != null)
		{
			var batch = getBatch(_child);
			batch.add(_child);
		}
	}
	
	override public function remove(_child : DisplayObject)
	{
		_child.stage = null;
		_child.__onRemovedFromStage();
		
		if (_child.parent == this)
		{
			_child.parent = null;
			_child.REMOVED.dispatch();
		}
		
		children.remove(_child);
		
		interractiveChildren.remove(_child);
		
		if (_child.prim != null)
		{
			var batch = getBatch(_child);
			batch.remove(_child);
		}
	}
	
	public function setProjectionMatrix(projection : Matrix3D) : Void
	{
		
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
	
	function getBatch(object : DisplayObject) : MultipleSpriteBatch
	{
		var textureName = "null";
		if (object.texture != null)
			textureName = object.texture.texture.path;
			
		var batch = batchMap[textureName];
		if (batch == null)
		{
			batch = new MultipleSpriteBatch(object.texture.texture);
			batchMap[textureName] = batch;
			drawableChildren.add(batch);
		}
		
		return batch;
	}
}