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
		projectionMatrix = Matrix3D.createOrtho(0, 800, 480, 0, 1000, -1000);
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