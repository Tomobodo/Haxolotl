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
	
	var viewport : Rectangle;
	
	var batchMap : Map<String, MultipleSpriteBatch>;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		super();
		stage = this;
		batchMap = new Map<String, MultipleSpriteBatch>();
		drawableChildren = new List<IDrawable>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
	}
	
	public function update() : Void
	{
		for (object in drawableChildren)
			object.update();
		this.enteredFrame();
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
		
		if (_child.prim != null)
		{
			var batch = getBatch(_child);
			batch.remove(_child);
		}
	}
	
	public function setProjectionMatrix(projection : Matrix3D) : Void
	{
		
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