package ld28.core;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import ld28.display.DisplayObject;
import openfl.gl.GL;
import ld28.core.IDrawable;
import ld28.core.Engine;
import ld28.display.DisplayObjectContainer;
import openfl.utils.Float32Array;

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
		width = _viewport.width;
		height = _viewport.height;
	}
	
	public function draw():Void 
	{
		for (object in drawableChildren)
		{
			object.setProjectionMatrix(projectionMatrix);
			object.draw();
		}
	}
	
	override public function add(_child : DisplayObject)
	{
		_child.addedToStage(this);
		super.add(_child);
		
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
		_child.removedFromStage(this);
		super.remove(_child);
		
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
		for (a in interractiveChildren)
		{
			if (!a.interactive)
			{
				interractiveChildren.remove(a);
				continue;
			}
			
			if (a.testInput(_x, _y))
			{
				a.hovered(_x, _y);
				break;
			}
		}
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