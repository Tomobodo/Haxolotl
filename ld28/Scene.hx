package ld28;
import flash.geom.Matrix3D;
import flash.geom.Rectangle;
import openfl.gl.GL;
import ld28.core.IDrawable;


/**
 * ...
 * @author Thomas BAUDON
 */
class Scene
{
	var displayObjects : List<IDrawable>;
	
	var viewport : Rectangle;
	
	public var projectionMatrix : Matrix3D;

	public function new() 
	{
		displayObjects = new List<IDrawable>();
		//setViewport(new Rectangle(0, 0, 800, 480));
	}
	
	public function setViewport(_viewport : Rectangle)
	{
		projectionMatrix = Matrix3D.createOrtho(_viewport.x, _viewport.width, _viewport.height, _viewport.y, 1000, -1000);
	}
	
	public function draw():Void 
	{
		for (model in displayObjects)
			model.draw(this);
	}
	
	public function add(_model : IDrawable)
	{
		displayObjects.push(_model);
	}
	
	public function remove(_model : IDrawable)
	{
		displayObjects.remove(_model);
	}
}