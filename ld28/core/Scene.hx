package ld28.core;
import flash.display.Stage;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import openfl.gl.GL;
import ld28.core.IDrawable;
import ld28.core.Engine;


/**
 * ...
 * @author Thomas BAUDON
 */
class Scene implements IDrawable
{
	var objects : List<IDrawable>;
	
	var viewport : Rectangle;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		objects = new List<IDrawable>();
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
	}
	
	public function draw():Void 
	{
		for (object in objects)
			object.draw();
	}
	
	public function add(_model : IDrawable)
	{
		objects.push(_model);
	}
	
	public function remove(_model : IDrawable)
	{
		objects.remove(_model);
	}
}