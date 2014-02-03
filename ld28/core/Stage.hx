package ld28.core;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import ld28.display.DisplayObject;
import openfl.gl.GL;
import ld28.core.IDrawable;
import ld28.core.Engine;
import ld28.display.DisplayObjectContainer;


/**
 * ...
 * @author Thomas BAUDON
 */
class Stage extends DisplayObjectContainer implements IDrawable
{
	var objects : List<IDrawable>;
	
	var viewport : Rectangle;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		super();
		objects = new List<IDrawable>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
	}
	
	public function enterFrame() : Void
	{
		
	}
	
	public function draw():Void 
	{
		for (object in objects)
			object.draw();
	}
	
	override public function add(_child : DisplayObject)
	{
		_child.addedToStage(this);
		super.add(_child);
	}
	
	override public function remove(_child : DisplayObject)
	{
		_child.removedFromStage(this);
		super.remove(_child);
	}
}